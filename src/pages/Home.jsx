import React, { useState, useEffect } from "react";
import "./Home.css";
import Winch from "../components/winch";
import NewParts from "../components/newParts";
import UsedParts from "../components/usedParts";
import Form from "../components/Form";
import BMW from "../components/BMW";
import VW from "../components/VW";


const cars = [
  {
    name: "BMW",
    featured: "bmw-side",
    showcase: "bmw-front",
    specs: {
      model: "2024",
      quality: "100%",
      service: "24/7"
    }
  },
  {
    name: "Volkswagen",
    featured: "volks-side",
    showcase: "volks-front",
    specs: {
      model: "2024",
      quality: "100%",
      service: "24/7"
    }
  },
  {
    name: "Audi",
    featured: "audi-side",
    showcase: "audi-front",
    specs: {
      model: "2024",
      quality: "100%",
      service: "24/7"
    }
  },
  {
    name: "Bentley",
    featured: "bently-side",
    showcase: "bently-front",
    specs: {
      model: "2024",
      quality: "100%",
      service: "24/7"
    }
  },
  {
    name: "Rolls-Royce",
    featured: "rolls-side",
    showcase: "rolls-front",
    specs: {
      model: "2024",
      quality: "100%",
      service: "24/7"
    }
  },
  {
    name: "Lamborghini",
    featured: "lambo-side",
    showcase: "hero",
    specs: {
      model: "2024",
      quality: "100%",
      service: "24/7"
    }
  },
  {
    name: "Mini Cooper",
    featured: "mini-side",
    showcase: "mini-front",
    specs: {
      model: "2024",
      quality: "100%",
      service: "24/7"
    }
  },
  {
    name: "Porsche",
    featured: "porsche-side",
    showcase: "porsche-front",
    specs: {
      model: "2024",
      quality: "100%",
      service: "24/7"
    }
  },
  {
    name: "Skoda",
    featured: "skoda-side",
    showcase: "skoda-front",
    specs: {
      model: "2024",
      quality: "100%",
      service: "24/7"
    }
  },
  {
    name: "Seat",
    featured: "seat-side",
    showcase: "seat-front",
    specs: {
      model: "2024",
      quality: "100%",
      service: "24/7"
    }
  },
]

const Home = () => {
  const [currentCarIndex, setCurrentCarIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const currentCar = cars[currentCarIndex];

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentCarIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          return nextIndex >= cars.length ? 0 : nextIndex;
        });
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      <div className="car-showcase">
        <div className="lower-showcase">
          <div className="main-title">
            <img src={require('../logo-tr.png')} alt="TNT Garage Logo" className="brand-logo" />
          </div>
          <div className="interactive-bar">
            <div className="gradient-circle"></div>
            <div className="gradient-fill"></div>
            <button className="order-btn" onClick={() => window.location.href = '#form'}>احجز الآن</button>
          </div>
          <div className="featured-car">
            <img
              src={require(`../${currentCar.featured}.png`)}
              alt={`${currentCar.name} - Featured German Car`}
              className={`featured-car-image ${isAnimating ? 'car-fade-out' : 'car-fade-in'}`}
            />
            <div className="car-name-display">
              <h3
                className={`car-name ${isAnimating ? 'name-fade-out' : 'name-fade-in'}`}
                key={currentCar.name}
              >
                {currentCar.name}
              </h3>
            </div>
            <div className="specs-box">
              <div className="spec-item">
                <span className="spec-label">Model</span>
                <span className="spec-value">{"2025"}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Quality</span>
                <span className="spec-value">{currentCar.specs?.quality || "100%"}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Service</span>
                <span className="spec-value">{currentCar.specs?.service || "24/7"}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="upper-showcase">
          <div className="car-image-container">
            <img
              src={require(`../${currentCar.showcase}.png`)}
              alt={`${currentCar.name} - Premium German Car`}
              className={`showcase-car ${isAnimating ? 'showcase-fade-out' : 'showcase-fade-in'}`}
            />
          </div>
          <div className="separator"></div>
          <p className="car-description">
            Experience the pinnacle of German engineering with our premium selection of BMW and Volkswagen vehicles.
            Each car represents the perfect blend of luxury, performance, and cutting-edge technology.
          </p>
        </div>
      </div>
      <BMW />
      <VW />
      <div className="brands-section">
        <div className="container">
          <h2 className="brands-title">German Automotive Excellence</h2>
          <div className="brands-grid">
            <div className="brand-card" onClick={() => window.location.href = '/bmw-group'}>
              <div className="brand-icon">🔧</div>
              <h3>BMW Group</h3>
              <p>Premium performance and luxury engineering</p>
            </div>
            <div className="brand-card" onClick={() => window.location.href = '/vw-group'}>
              <div className="brand-icon">⚡</div>
              <h3>Volkswagen Group</h3>
              <p>Reliability and advanced technology</p>
            </div>
          </div>
          <div className="stats-section">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Parts Delivered</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support Available</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5+</div>
              <div className="stat-label">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2>Services</h2>
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