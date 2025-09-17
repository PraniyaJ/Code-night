import { NavLink } from "react-router-dom";
import "../components/Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">FlashAid Admin</h2>
      <nav>
        <ul>
          <li>
            <NavLink to="/" end className="nav-link">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/notifications" className="nav-link">
              Notifications
            </NavLink>
          </li>
          <li>
            <NavLink to="/guides" className="nav-link">
              Guides
            </NavLink>
          </li>
          <li>
            <NavLink to="/leaderboard" className="nav-link">
              Leaderboard
            </NavLink>
          </li>
        </ul>
      </nav>
      <button
        className="logout-btn"
        onClick={() => {
          localStorage.removeItem("authToken");
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </aside>
  );
}
