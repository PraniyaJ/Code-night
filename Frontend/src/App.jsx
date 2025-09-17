import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./pages/sidebar";
import Dashboard from "./pages/dashboard";
import Messages from "./pages/messages";
import Leaderboard from "./pages/leaderboard";
import Profile from "./pages/profile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./components/sidebar.css";
import "./components/dashboard.css";
import "./components/messages.css";
import "./components/leaderboard.css";

function AppContent() {
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [showMessages, setShowMessages] = useState(false);
  const location = useLocation();

  // Paths where sidebar should be hidden
  const hideSidebar = ["/", "/login", "/signup"].includes(location.pathname);

  return (
    <div className="app-container">
      {!hideSidebar && <Sidebar />}
      <div className="content">
        <Routes>
          <Route 
            path="/dashboard" 
            element={
              <Dashboard 
                onVolunteerSelect={setSelectedVolunteer}
                onShowMessages={setShowMessages}
              />
            } 
          />
          <Route 
            path="/messages" 
            element={
              <Messages 
                selectedVolunteer={selectedVolunteer}
                showMessages={showMessages}
              />
            } 
          />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} /> {/* Default home page */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
