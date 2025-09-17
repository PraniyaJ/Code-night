// ...existing code...
import "../components/dashboard.css";

export default function Dashboard() {
  // No state or API calls, just hardcoded row

  return (
    <div className="dashboard-page">
      <header className="topbar">
        <h1>SOS Alerts Dashboard</h1>
      </header>

      <section className="table-section">
        <h2>All Alerts</h2>
        <table className="alerts-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Condition</th>
              <th>Location</th>
              <th>Timestamp</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>U123</td>
              <td>Severe Injury</td>
              <td>Colombo, Sri Lanka</td>
              <td>{new Date().toLocaleString()}</td>
              <td>
                <span className="status-badge pending">Pending</span>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
