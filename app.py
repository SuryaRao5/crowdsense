import os
import torch
import cv2
import numpy as np
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from PIL import Image
from torchvision import transforms as T
from model import CSRNet
from img_inference import img_inference
from glob import glob
from flask_cors import CORS

# --- CONFIGURATION ---
app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'mp4', 'avi', 'mov', 'heic'}
device = "cuda" if torch.cuda.is_available() else "cpu"

# --- LOAD MODEL ---
def load_model():
    print("[INFO] Looking for model weights...")
    possible_files = glob("*.pth") + glob("files/*.pth") + glob("saved_weights/*.pth")

    if not possible_files:
        raise FileNotFoundError("Could not find a .pth file! Please check your directory.")

    model_path = possible_files[0]
    print(f"[INFO] Loading model from: {model_path}")

    model = CSRNet(load_weights=True).to(device)
    model.load_state_dict(torch.load(model_path, map_location=device), strict=False)
    model.eval()
    return model

model = load_model()

# --- HELPER FUNCTION ---
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def process_image(image_path):

    transform = T.Compose([
        T.ToTensor(),
        T.Normalize(mean=[0.485, 0.456, 0.406],
                    std=[0.229, 0.224, 0.225]),
    ])

    img = Image.open(image_path).convert("RGB")

    img_tensor = transform(img).unsqueeze(0).to(device)

    with torch.no_grad():
        output = model(img_tensor)
        count = int(output.detach().cpu().sum().numpy())

    raw_density = output.detach().cpu().numpy().squeeze()

    norm_density = (raw_density - raw_density.min()) / (
        raw_density.max() - raw_density.min() + 1e-5
    )

    heatmap_uint8 = np.uint8(255 * norm_density)
    heatmap_colored = cv2.applyColorMap(heatmap_uint8, cv2.COLORMAP_JET)

    img_np = np.array(img)
    heatmap_resized = cv2.resize(
        heatmap_colored,
        (img_np.shape[1], img_np.shape[0])
    )

    img_np_bgr = cv2.cvtColor(img_np, cv2.COLOR_RGB2BGR)

    overlay = cv2.addWeighted(img_np_bgr, 0.5,
                              heatmap_resized, 0.5, 0)

    filename = os.path.basename(image_path)
    result_filename = f"result_{filename}"
    result_path = os.path.join(app.config['UPLOAD_FOLDER'],
                               result_filename)

    cv2.imwrite(result_path, overlay)

    return count


# --- API ROUTE ---
@app.route('/', methods=['POST'])
def predict():

    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "Empty filename"}), 400

    if file and allowed_file(file.filename):

        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'],
                                filename)
        file.save(filepath)


        count, result_filename = img_inference(image_path=filepath)

        return jsonify({
            "count": count,
            "result_image": result_filename
        })

    return jsonify({"error": "Invalid file type"}), 400


if __name__ == "__main__":
    app.run(debug=True, port=5000)