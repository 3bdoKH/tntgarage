import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" className="brand-link" onClick={closeMenu}>
            <img src={require('../logo.png')} alt="TNT Garage Logo" className="brand-logo" />
          </Link>
        </div>

        <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <Link
            to="/"
            className={`nav-link ${isActive("/") ? "active" : ""}`}
            onClick={closeMenu}
          >
            الرئيسية
          </Link>
          <Link
            to="/new-parts"
            className={`nav-link ${isActive("/new-parts") ? "active" : ""}`}
            onClick={closeMenu}
          >
            قطع غيار جديدة
          </Link>
          <Link
            to="/used-parts"
            className={`nav-link ${isActive("/used-parts") ? "active" : ""}`}
            onClick={closeMenu}
          >
            قطع غيار استيراد
          </Link>
          <Link
            to="/winch"
            className={`nav-link ${isActive("/winch") ? "active" : ""}`}
            onClick={closeMenu}
          >
            ونش
          </Link>
          <Link
            to="/videos"
            className={`nav-link ${isActive("/videos") ? "active" : ""}`}
            onClick={closeMenu}
          >
            فيديوهات
          </Link>
        </div>

        <div className="nav-toggle" onClick={toggleMenu}>
          <span className={`hamburger ${isMenuOpen ? "active" : ""}`}></span>
          <span className={`hamburger ${isMenuOpen ? "active" : ""}`}></span>
          <span className={`hamburger ${isMenuOpen ? "active" : ""}`}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 