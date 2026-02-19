import "../css/Scope.css";
import Navbar from "../components/Navbar";
import Footer from "./Footer";

function Scope() {
  return (
    <>
      <Navbar />

      <section className="section scope-section">
        <div className="scope-header">
          <h2 className="section-title">Project Scope & Future Enhancements</h2>
          <div className="title-decoration"></div>
        </div>

        <div className="intro-text fade-in">
          <p className="section-text">
            Crowd Sense is an AI-Powered Detection of People Flow with Interactive Visual Analytics is an intelligent real-time crowd monitoring system designed to accurately detect, track, and analyze human movement using advanced deep learning techniques.
          </p>
        </div>

        <div className="scope-grid">
          <div className="scope-card slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="image-container">
              <img src="/images/scope_image_1.png" alt="Multi face detection" />
              <div className="image-overlay"></div>
            </div>
            <div className="card-content">
              <h3>Real-Time People</h3>
              <div className="title-underline"></div>
              <p>Real-time people detection and multi-object tracking</p>
            </div>
          </div>

          <div className="scope-card slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="image-container">
              <img src="/images/scope_image_2.png" alt="Eye gaze tracking" />
              <div className="image-overlay"></div>
            </div>
            <div className="card-content">
              <h3>Accurate Crowd Counting</h3>
              <div className="title-underline"></div>
              <p>Accurate crowd counting with duplicate prevention</p>
            </div>
          </div>

          <div className="scope-card slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="image-container">
              <img src="/images/scope_image_3.png" alt="Audio anomaly detection" />
              <div className="image-overlay"></div>
            </div>
            <div className="card-content">
              <h3>Entry & Exit Flow Analysis</h3>
              <div className="title-underline"></div>
              <p>Entry and exit flow analysis
</p>
            </div>
          </div>

          <div className="scope-card slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="image-container">
              <img src="/images/scope_image_4.png" alt="Invigilation alerts" />
              <div className="image-overlay"></div>
            </div>
            <div className="card-content">
              <h3>Crowd Density</h3>
              <div className="title-underline"></div>
              <p>Crowd density and movement pattern visualization.</p>
            </div>
          </div>

          <div className="scope-card slide-up" style={{ animationDelay: '0.5s' }}>
            <div className="image-container">
              <img src="/images/scope_image_5.png" alt="LMS integration" />
              <div className="image-overlay"></div>
            </div>
            <div className="card-content">
              <h3>Interactive Dashboard</h3>
              <div className="title-underline"></div>
              <p>Interactive dashboard-based analytics.</p>
            </div>
          </div>

          <div className="scope-card slide-up" style={{ animationDelay: '0.6s' }}>
            <div className="image-container">
              <img src="/images/scope_image_6.png" alt="Cloud scalability" />
              <div className="image-overlay"></div>
            </div>
            <div className="card-content">
              <h3>Deployment On Standard Hardware</h3>
              <div className="title-underline"></div>
              <p>Deployment on standard hardware without specialized infrastructure.</p>
            </div>
          </div>
        </div>
      </section>
    
    </>
  );
}

export default Scope;