import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./pages/sidebar";
import Dashboard from "./pages/dashboard";
import Notifications from "./pages/notification";
import Guides from "./pages/guide";
import Leaderboard from "./pages/leaderboard";
import Users from "./pages/users";
import "./components/sidebar.css";
import "./components/dashboard.css"; 
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Wrapper to conditionally render sidebar
function Layout() {
  const location = useLocation();

  // Paths where sidebar should NOT appear
  const hideSidebarPaths = ["/", "/login", "/signup"];
  const shouldShowSidebar = !hideSidebarPaths.includes(location.pathname);

  return (
    <div className="app-container">
      {shouldShowSidebar && <Sidebar />}
      <div className="content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/users" element={<Users />} />
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
      <Layout />
    </Router>
  );
}

export default App;
