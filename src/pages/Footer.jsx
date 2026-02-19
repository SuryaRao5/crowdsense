// Footer.jsx
import "../css/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons/faShieldHalved";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <a href="/"><FontAwesomeIcon
          icon={faEnvelope}
          style={{ color: "rgba(255, 212, 59, 1)" }}
        /></a>
        <span>For mail</span>
      </div>

      <div className="footer-right">
        <span className="powered-text">Secured By</span>
        <a href="/"><FontAwesomeIcon
          icon={faShieldHalved}
          flip
          style={{ color: "rgba(208, 87, 87, 1.00)" }}
        /></a>
      </div>
    </footer>
  );
}


export default Footer;
