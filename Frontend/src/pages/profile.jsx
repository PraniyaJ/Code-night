// pages/profile.jsx - Updated with API integration
import { useState, useEffect } from "react";
import ApiService from "../services/api";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await ApiService.getUserProfile();
      setProfile(response);
    } catch (err) {
      setError('Failed to load profile. Please try again.');
      console.error('Error fetching profile:', err);
      
      // Fallback to mock profile if API fails
      setProfile({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+94771234567",
        emergencyRequests: 3,
        avgResponseTime: 2.5
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        <header className="topbar">
          <h1>My Profile</h1>
        </header>
        <div className="loading-container">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <header className="topbar">
        <h1>My Profile</h1>
      </header>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-avatar">👤</div>
          <h2>{profile?.name || "John Doe"}</h2>
          <p>Email: {profile?.email || "john.doe@example.com"}</p>
          <p>Emergency Contact: {profile?.phone || "+94771234567"}</p>
          
          <div className="profile-stats">
            <div className="stat">
              <span className="label">Emergency Requests:</span>
              <span className="value">{profile?.emergencyRequests || 0}</span>
            </div>
            <div className="stat">
              <span className="label">Response Time Avg:</span>
              <span className="value">{profile?.avgResponseTime || 0} min</span>
            </div>
          </div>

          <div className="profile-actions">
            <button onClick={fetchProfile} className="refresh-btn">
              🔄 Refresh Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}