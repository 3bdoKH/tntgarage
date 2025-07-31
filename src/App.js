import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import pages
import Home from "./pages/Home";
import NewParts from "./pages/newParts/NewParts";
import UsedParts from "./pages/usedParts/UsedParts";
import Videos from "./pages/videos/Videos";
import Winch from "./pages/winch/Winch";
import BmwGroup from "./pages/bmwGroup/BmwGroup";
import VwGroup from "./pages/vwGroup/VwGroup";
import AdminDashboard from "./pages/admin/AdminDashboard";
// Import components
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-parts" element={<NewParts />} />
            <Route path="/used-parts" element={<UsedParts />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/winch" element={<Winch />} />
            <Route path="/bmw-group" element={<BmwGroup />} />
            <Route path="/vw-group" element={<VwGroup />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
