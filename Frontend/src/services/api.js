// src/services/api.js
const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // User API methods
  async getUserProfile() {
    return this.request('/users/profile');
  }

  // Volunteer API methods
  async getNearbyVolunteers(lat, lng, radius = 10) {
    return this.request(`/volunteers/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
  }

  async getLeaderboard() {
    return this.request('/volunteers/leaderboard');
  }

  // Emergency API methods
  async createEmergencyRequest(data) {
    return this.request('/emergency/request', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Messages API methods
  async getMessages(volunteerId) {
    return this.request(`/messages/${volunteerId}`);
  }

  async sendMessage(data) {
    return this.request('/messages', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export default new ApiService();