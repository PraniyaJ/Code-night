import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./pages/sidebar";
import Dashboard from "./pages/dashboard";
import Messages from "./pages/messages";
import Leaderboard from "./pages/leaderboard";
import Profile from "./pages/profile";
import "./components/sidebar.css";
import "./components/dashboard.css";
import "./components/messages.css";
import "./components/leaderboard.css";

function App() {
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [showMessages, setShowMessages] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route 
              path="/" 
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
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;