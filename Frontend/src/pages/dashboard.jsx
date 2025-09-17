// pages/dashboard.jsx - Updated with API integration
import { useState, useEffect } from "react";
import ApiService from "../services/api";
import "../components/dashboard.css";

export default function Dashboard({ onVolunteerSelect, onShowMessages }) {
  const [sosActive, setSosActive] = useState(false);
  const [showVolunteers, setShowVolunteers] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [showVolunteerInfo, setShowVolunteerInfo] = useState(false);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Fallback to Colombo coordinates
          setUserLocation({
            lat: 7.2906,
            lng: 80.6337
          });
        }
      );
    } else {
      // Fallback if geolocation is not supported
      setUserLocation({
        lat: 7.2906,
        lng: 80.6337
      });
    }
  }, []);

  const fetchNearbyVolunteers = async () => {
    if (!userLocation) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await ApiService.getNearbyVolunteers(
        userLocation.lat, 
        userLocation.lng
      );
      setVolunteers(response);
    } catch (err) {
      setError('Failed to fetch volunteers. Please try again.');
      console.error('Error fetching volunteers:', err);
      
      // Fallback to mock data if API fails
      setVolunteers([
        {
          _id: 1,
          name: "Dr. Sarah Wilson",
          type: "Medical Responder",
          distance: "0.3 km",
          rating: 4.9,
          helps: 156,
          phone: "+94771234567",
          specialization: "Emergency Medicine",
          location: { lat: 7.2906, lng: 80.6337 }
        },
        {
          _id: 2,
          name: "Kasun Perera",
          type: "First Aid Volunteer",
          distance: "0.5 km",
          rating: 4.7,
          helps: 89,
          phone: "+94772345678",
          specialization: "CPR Certified",
          location: { lat: 7.2910, lng: 80.6340 }
        },
        {
          _id: 3,
          name: "Dr. Priya Fernando",
          type: "Medical Responder",
          distance: "0.8 km",
          rating: 4.8,
          helps: 203,
          phone: "+94773456789",
          specialization: "Trauma Care",
          location: { lat: 7.2915, lng: 80.6345 }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSosClick = async () => {
    setSosActive(true);
    setShowVolunteers(true);
    
    // Create emergency request
    try {
      await ApiService.createEmergencyRequest({
        location: userLocation,
        description: "Emergency assistance requested"
      });
      
      // Fetch nearby volunteers
      await fetchNearbyVolunteers();
    } catch (err) {
      console.error('Error creating emergency request:', err);
    }
    
    // Simulate finding volunteers
    setTimeout(() => {
      setSosActive(false);
    }, 3000);
  };

  const handleVolunteerSelect = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setShowVolunteerInfo(true);
    onVolunteerSelect(volunteer);
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleMessage = (volunteer) => {
    onShowMessages(true);
    window.location.href = '/messages';
  };

  return (
    <div className="dashboard-page">
      <header className="topbar">
        <h1>Emergency Dashboard</h1>
        <div className="location-info">
          📍 Current Location: Colombo, Sri Lanka
        </div>
      </header>

      <div className="sos-section">
        <div className="sos-container">
          <button 
            className={`sos-button ${sosActive ? 'active' : ''}`}
            onClick={handleSosClick}
            disabled={sosActive}
          >
            {sosActive ? 'FINDING HELP...' : 'SOS'}
          </button>
          <p className="sos-description">
            {sosActive ? 'Searching for nearby volunteers...' : 'Tap for emergency assistance'}
          </p>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      {showVolunteers && (
        <div className="volunteers-section">
          <h2>Nearby Volunteers & Medical Responders</h2>
          
          <div className="map-container">
            <div className="map-placeholder">
              <div className="map-header">📍 Live Location Map</div>
              <div className="location-pins">
                <div className="user-pin">You are here</div>
                {volunteers.map((volunteer) => (
                  <div 
                    key={volunteer._id || volunteer.id}
                    className="volunteer-pin"
                    style={{
                      top: `${20 + (volunteer._id || volunteer.id) * 15}%`,
                      left: `${30 + (volunteer._id || volunteer.id) * 20}%`
                    }}
                  >
                    📌 {volunteer.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="loading">
              <p>Loading volunteers...</p>
            </div>
          ) : (
            <div className="volunteers-list">
              {volunteers.map((volunteer) => (
                <div 
                  key={volunteer._id || volunteer.id}
                  className="volunteer-card"
                  onClick={() => handleVolunteerSelect(volunteer)}
                >
                  <div className="volunteer-info">
                    <h3>{volunteer.name}</h3>
                    <p className="volunteer-type">{volunteer.type}</p>
                    <p className="volunteer-specialization">{volunteer.specialization}</p>
                    <div className="volunteer-stats">
                      <span className="distance">📍 {volunteer.distance}</span>
                      <span className="rating">⭐ {volunteer.rating}</span>
                      <span className="helps">🤝 {volunteer.helps} helps</span>
                    </div>
                  </div>
                  <div className="select-arrow">→</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {showVolunteerInfo && selectedVolunteer && (
        <div className="volunteer-info-modal">
          <div className="modal-content">
            <button 
              className="close-btn"
              onClick={() => setShowVolunteerInfo(false)}
            >
              ×
            </button>
            
            <div className="volunteer-details">
              <h2>{selectedVolunteer.name}</h2>
              <p className="volunteer-type">{selectedVolunteer.type}</p>
              <p className="specialization">Specialization: {selectedVolunteer.specialization}</p>
              
              <div className="volunteer-stats-detailed">
                <div className="stat">
                  <span className="label">Distance:</span>
                  <span className="value">{selectedVolunteer.distance}</span>
                </div>
                <div className="stat">
                  <span className="label">Rating:</span>
                  <span className="value">⭐ {selectedVolunteer.rating}</span>
                </div>
                <div className="stat">
                  <span className="label">Total Helps:</span>
                  <span className="value">{selectedVolunteer.helps}</span>
                </div>
              </div>

              <div className="contact-actions">
                <button 
                  className="call-btn"
                  onClick={() => handleCall(selectedVolunteer.phone)}
                >
                  📞 Call
                </button>
                <button 
                  className="message-btn"
                  onClick={() => handleMessage(selectedVolunteer)}
                >
                  💬 Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}