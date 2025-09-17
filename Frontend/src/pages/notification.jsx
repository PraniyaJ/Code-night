import { useEffect, useState } from "react";
import "../components/notification.css";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Mock data for testing
    setNotifications([
      {
        id: 1,
        user_id: "U101",
        volunteer_id: "V501",
        volunteer_name: "A. Perera",
        timestamp: new Date().toISOString(),
      },
      {
        id: 2,
        user_id: "U102",
        volunteer_id: "V502",
        volunteer_name: "B. Silva",
        timestamp: new Date().toISOString(),
      },
      {
        id: 3,
        user_id: "U103",
        volunteer_id: "V503",
        volunteer_name: "C. Fernando",
        timestamp: new Date().toISOString(),
      },
    ]);
  }, []);

  return (
    <div className="notifications-page">
      <header className="topbar">
        <h1>Notifications</h1>
      </header>

      <section className="table-section">
        <h2>Recent Notifications</h2>
        <table className="notifications-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Volunteer ID</th>
              <th>Volunteer Name</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <tr key={n.id}>
                  <td>{n.id}</td>
                  <td>{n.user_id}</td>
                  <td>{n.volunteer_id}</td>
                  <td>{n.volunteer_name}</td>
                  <td>{new Date(n.timestamp).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No notifications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
