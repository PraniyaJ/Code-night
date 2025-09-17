import { NavLink } from "react-router-dom";
import "../components/sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">FlashAid User</h2>
      <nav>
        <ul>
          <li>
            <NavLink to="/" end className="nav-link">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/messages" className="nav-link">
              Messages
            </NavLink>
          </li>
          <li>
            <NavLink to="/leaderboard" className="nav-link">
              Leaderboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className="nav-link">
              Profile
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="user-info">
        <div className="user-avatar">👤</div>
        <span className="user-name">John Doe</span>
      </div>
    </aside>
  );
}