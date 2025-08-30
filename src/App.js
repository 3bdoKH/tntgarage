import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import pages
import Home from "./pages/Home";
import NewParts from "./pages/newParts/NewParts";
import UsedParts from "./pages/usedParts/UsedParts";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Videos from "./pages/videos/Videos";
import Winch from "./pages/winch/Winch";
import BmwGroup from "./pages/bmwGroup/BmwGroup";
import VwGroup from "./pages/vwGroup/VwGroup";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Login from "./pages/admin/Login";

// Import components
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

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
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/winch" element={<Winch />} />
            <Route path="/bmw-group" element={<BmwGroup />} />
            <Route path="/vw-group" element={<VwGroup />} />
            <Route path="/admin-login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
