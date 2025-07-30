import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import BMW from "../components/BMW";
import VW from "../components/VW";
import Winch from "../components/winch";
import NewParts from "../components/newParts";
import UsedParts from "../components/usedParts";
import Form from "../components/Form";

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to TNT Garage</h1>
          <p>Your trusted source for quality car spare parts and automotive solutions</p>
          <div className="hero-buttons">
            <Link to="/new-parts" className="btn btn-primary">
              قطع جديدة
            </Link>
            <Link to="/used-parts" className="btn btn-secondary">
              قطع استيراد
            </Link>
          </div>
        </div>
      </div>
      <BMW />
      <VW />
      <div className="features-section">
        <div className="container">
          <h2>الخدمات</h2>
          <Winch />
          <div className="parts-container">
            <NewParts />
            <UsedParts />
          </div>
        </div>
      </div>
      <Form />
    </div>
  );
};

export default Home; 