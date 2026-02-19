import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../css/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    setAnimate(true);
  }, []);

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
      setFileName(file.name);
    } else {
      alert("Please select a valid image file");
    }
  };

  return (
    <>
      <Navbar />
      <div className={`home-container ${animate ? "home-enter" : ""}`}>
        <div className="home-header">
          <div className="welcome-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span>Welcome Back</span>
          </div>
          <h1 className="home-title">Dashboard</h1>
          <p className="home-subtitle">View results, predictions</p>
          <div className="title-decoration"></div>
        </div>

        <div className="dashboard-grid">

          {/* Uploaded Picture Card */}
          <div className="dashboard-card slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="card-icon-wrapper exams">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
            </div>

            <div className="card-content" >
              <h2>Uploaded Picture</h2>
              <p>Upload and preview your image.</p>

              {/* Hidden File Input */}
              <input
                type="file"
                accept="image/*"
                id="imageUploadHome"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />

              <button
                className="dashboard-btn exams-btn"
                onClick={() =>
                  document.getElementById("imageUploadHome").click()
                }
              >
                <span style={{fontSize:"20px"}}>Upload File<p><FontAwesomeIcon icon={faFolderPlus} beat size="xl" style={{ color: "rgba(198, 210, 62, 1.00)" }}/></p></span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>

              {/* Show File Name */}
              {fileName && (
                <p style={{ marginTop: "10px", color: "#4CAF50" }}>
                  Selected: {fileName}
                </p>
              )}

              {/* Image Preview */}
              {selectedImage && (
                <div style={{ marginTop: "15px" }}>
                  <img
                    src={selectedImage}
                    alt="Preview"
                    style={{
                      width: "100%",
                      maxWidth: "300px",
                      borderRadius: "10px",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
                    }}
                  />
                </div>
              )}
            </div>

            <div className="card-decoration"></div>
          </div>

          

        </div>

        {/* Stats Section */}
        <div className="stats-section fade-in-delayed">
          <div className="stat-card">
            <div className="stat-number">12</div>
            <div className="stat-label">Total Predictions</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">85%</div>
            <div className="stat-label">Accuracy</div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Home;
