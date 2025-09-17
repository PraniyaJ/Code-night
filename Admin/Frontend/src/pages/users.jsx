import { useState } from "react";
import "../components/user.css";

export default function Users() {
  // Simulate admin access
  const [isAdmin] = useState(true); // Change to false to simulate non-admin

  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", contact: "0712345678", address: "123 Main St", insurance: "INS12345" },
    { id: 2, name: "Jane Smith", contact: "0779876543", address: "456 Oak Ave", insurance: "INS67890" },
  ]);

  // Delete user function
  const deleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== userId));
    }
  };

  return (
    <div className="users-page">
      <header className="topbar">
        <h1>Users Management</h1>
      </header>

      {/* Users Table (Admin Only) */}
      {isAdmin ? (
        <section className="table-section">
          <h2>Stored Users</h2>
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Emergency Contact</th>
                <th>Address</th>
                <th>Insurance ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((u, index) => (
                  <tr key={index}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.contact}</td>
                    <td>{u.address}</td>
                    <td>{u.insurance}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => deleteUser(u.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No users available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      ) : (
        <p style={{ textAlign: "center", marginTop: "20px", color: "#555" }}>
          You do not have permission to view user data.
        </p>
      )}
    </div>
  );
}
