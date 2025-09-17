// pages/leaderboard.jsx - Updated with API integration
import { useState, useEffect } from "react";
import ApiService from "../services/api";
import "../components/leaderboard.css";

export default function Leaderboard() {
  const [topHelpers, setTopHelpers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await ApiService.getLeaderboard();
      setTopHelpers(response);
    } catch (err) {
      setError('Failed to load leaderboard. Please try again.');
      console.error('Error fetching leaderboard:', err);
      
      // Fallback to mock data if API fails
      setTopHelpers([
        {
          _id: 1,
          name: "Dr. Sarah Wilson",
          helps: 156,
          rating: 4.9,
          type: "Medical Responder",
          badge: "🥇"
        },
        {
          _id: 2,
          name: "Dr. Priya Fernando",
          helps: 203,
          rating: 4.8,
          type: "Medical Responder",
          badge: "🥈"
        },
        {
          _id: 3,
          name: "Kasun Perera",
          helps: 89,
          rating: 4.7,
          type: "First Aid Volunteer",
          badge: "🥉"
        },
        {
          _id: 4,
          name: "Dr. Amara Silva",
          helps: 134,
          rating: 4.6,
          type: "Medical Responder",
          badge: "🏅"
        },
        {
          _id: 5,
          name: "Nimal Rodrigo",
          helps: 76,
          rating: 4.5,
          type: "Community Volunteer",
          badge: "🏅"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchLeaderboard();
  };

  if (loading) {
    return (
      <div className="leaderboard-page">
        <header className="topbar">
          <h1>Top Helpers Leaderboard</h1>
          <p>Recognizing our community heroes</p>
        </header>
        <div className="loading-container">
          <p>Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="leaderboard-page">
      <header className="topbar">
        <h1>Top Helpers Leaderboard</h1>
        <p>Recognizing our community heroes</p>
        <button onClick={handleRefresh} className="refresh-btn">
          🔄 Refresh
        </button>
      </header>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <h2>🏆 Top Helpers This Month</h2>
        </div>

        <div className="leaderboard-list">
          {topHelpers.map((helper, index) => (
            <div key={helper._id || helper.id} className="helper-card">
              <div className="rank">
                <span className="badge">{helper.badge}</span>
                <span className="position">#{index + 1}</span>
              </div>
              
              <div className="helper-info">
                <h3>{helper.name}</h3>
                <p className="helper-type">{helper.type}</p>
                
                <div className="helper-stats">
                  <div className="stat">
                    <span className="stat-value">{helper.helps}</span>
                    <span className="stat-label">Helps</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">⭐ {helper.rating}</span>
                    <span className="stat-label">Rating</span>
                  </div>
                </div>
              </div>

              <div className="helper-actions">
                <button className="view-profile-btn">View Profile</button>
              </div>
            </div>
          ))}
        </div>

        <div className="leaderboard-footer">
          <p>Want to be featured? Start helping your community today!</p>
          <button className="become-volunteer-btn">Become a Volunteer</button>
        </div>
      </div>
    </div>
  );
}