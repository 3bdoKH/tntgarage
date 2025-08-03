import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faFacebook, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <img src={require('../logo-tr.png')} alt="TNT Garage Logo" className="footer-logo" />
          <p>Your trusted source for quality car spare parts and automotive solutions.</p>
          <div className="social-links">
            <a href="https://wa.me/+201111132621" target="_blank" rel="noopener noreferrer" className="social-link">
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
            <a href="https://www.facebook.com/Tntgarage.maadi/" className="social-link">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://www.instagram.com/tntgarage.maadi/" className="social-link">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://www.tiktok.com/@tntgarage.maadi" className="social-link">
              <FontAwesomeIcon icon={faTiktok} />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>الروابط السريعة</h4>
          <ul className="footer-links">
            <li><Link to="/">الرئيسية</Link></li>
            <li><Link to="/new-parts">قطع جديدة</Link></li>
            <li><Link to="/used-parts">قطع استيراد</Link></li>
            <li><Link to="/winch">ونش انقاذ</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>الخدمات</h4>
          <ul className="footer-links">
            <li>قطع جديدة</li>
            <li>قطع استيراد</li>
            <li>ونش انقاذ</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>معلومات الاتصال</h4>
          <div className="contact-info">
            <p>📍طريق الأوتوستراد – بجوار بنزينة أدنوك – أمام كمبوند أبراج المستقبل – مدخل رقم 2 – دجلة المعادي </p>
            <p>📞 01111132621</p>
            <p>📧 info@tntgarage.com</p>
            <p>🕒 كل ايام الاسبوع </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; 2024 TNT Garage. All rights reserved. Powered By <a href="https://emereld-marketing.online" target="_blank" rel="noopener noreferrer" style={{ color: "white", textDecoration: "none" }}>EMERELD</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 