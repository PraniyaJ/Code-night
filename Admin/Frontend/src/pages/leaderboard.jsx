import { useState } from "react";
import "../components/leaderboard.css";

export default function Leaderboard() {
  const [volunteers, setVolunteers] = useState([
    { id: 1, name: "Alice Johnson", accepted: 15 },
    { id: 2, name: "Bob Smith", accepted: 12 },
    { id: 3, name: "Charlie Brown", accepted: 10 },
    { id: 4, name: "Diana Prince", accepted: 8 },
    { id: 5, name: "Evan Lee", accepted: 6 },
  ]);

  const giveAward = (volunteerId) => {
    const top3 = volunteers
      .sort((a, b) => b.accepted - a.accepted)
      .slice(0, 3)
      .map((v) => v.id);

    if (top3.includes(volunteerId)) {
      alert(`Award given to volunteer ID: ${volunteerId}`);
    } else {
      alert("Only top 3 volunteers can receive awards!");
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="leaderboard-page">
      <header className="topbar">
        <h1>Top Volunteers Leaderboard</h1>
      </header>

      <section className="table-section">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Initials</th>
              <th>SOS Accepted</th>
              <th>Award</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.length > 0 ? (
              volunteers.map((v, index) => (
                <tr key={index}>
                  <td>{v.id}</td>
                  <td>{v.name}</td>
                  <td>{getInitials(v.name)}</td>
                  <td>{v.accepted}</td>
                  <td>
                    <button
                      className="award-btn"
                      onClick={() => giveAward(v.id)}
                    >
                      Give Award
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No volunteers available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
