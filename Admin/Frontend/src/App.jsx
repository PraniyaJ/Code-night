import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./pages/sidebar";
import Dashboard from "./pages/dashboard";
import Notifications from "./pages/notification";
import Guides from "./pages/guide";
import Leaderboard from "./pages/leaderboard";
import "./components/sidebar.css";
import "./components/dashboard.css"; // Ensure dashboard styles are loaded

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
