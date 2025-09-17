// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use('/api/auth', authRoutes);

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  location: {
    lat: { type: Number, default: 7.2906 },
    lng: { type: Number, default: 80.6337 }
  },
  emergencyRequests: { type: Number, default: 0 },
  avgResponseTime: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

// Volunteer Schema
const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  specialization: { type: String, required: true },
  phone: { type: String, required: true },
  rating: { type: Number, default: 4.5 },
  helps: { type: Number, default: 0 },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  isAvailable: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// Emergency Request Schema
const emergencyRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  description: { type: String },
  status: { 
    type: String, 
    enum: ['active', 'assigned', 'resolved'], 
    default: 'active' 
  },
  assignedVolunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'Volunteer' },
  createdAt: { type: Date, default: Date.now },
  resolvedAt: { type: Date }
});

// Message Schema
const messageSchema = new mongoose.Schema({
  emergencyRequestId: { type: mongoose.Schema.Types.ObjectId, ref: 'EmergencyRequest' },
  senderId: { type: mongoose.Schema.Types.ObjectId, required: true },
  senderType: { type: String, enum: ['user', 'volunteer'], required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

// Models
const User = mongoose.model('User', userSchema);
const Volunteer = mongoose.model('Volunteer', volunteerSchema);
const EmergencyRequest = mongoose.model('EmergencyRequest', emergencyRequestSchema);
const Message = mongoose.model('Message', messageSchema);

// Routes

// User routes
app.get('/api/users/profile', async (req, res) => {
  try {
    // For demo purposes, return a default user
    // In production, you'd get this from authentication
    const user = await User.findOne({ email: 'john.doe@example.com' }) || 
                 await User.create({
                   name: 'John Doe',
                   email: 'john.doe@example.com',
                   phone: '+94771234567'
                 });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get nearby volunteers
app.get('/api/volunteers/nearby', async (req, res) => {
  try {
    const { lat, lng, radius = 10 } = req.query;
    
    // For demo purposes, return mock data
    // In production, you'd calculate distance based on coordinates
    const volunteers = await Volunteer.find({ isAvailable: true }).limit(10);
    
    if (volunteers.length === 0) {
      // Create mock volunteers if none exist
      const mockVolunteers = [
        {
          name: "Dr. Sarah Wilson",
          type: "Medical Responder",
          specialization: "Emergency Medicine",
          phone: "+94771234567",
          rating: 4.9,
          helps: 156,
          location: { lat: 7.2906, lng: 80.6337 }
        },
        {
          name: "Kasun Perera",
          type: "First Aid Volunteer",
          specialization: "CPR Certified",
          phone: "+94772345678",
          rating: 4.7,
          helps: 89,
          location: { lat: 7.2910, lng: 80.6340 }
        },
        {
          name: "Dr. Priya Fernando",
          type: "Medical Responder",
          specialization: "Trauma Care",
          phone: "+94773456789",
          rating: 4.8,
          helps: 203,
          location: { lat: 7.2915, lng: 80.6345 }
        }
      ];
      
      const createdVolunteers = await Volunteer.insertMany(mockVolunteers);
      return res.json(createdVolunteers.map(v => ({
        ...v.toObject(),
        distance: `${(Math.random() * 2).toFixed(1)} km`
      })));
    }
    
    res.json(volunteers.map(v => ({
      ...v.toObject(),
      distance: `${(Math.random() * 2).toFixed(1)} km`
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create emergency request
app.post('/api/emergency/request', async (req, res) => {
  try {
    const { userId, location, description } = req.body;
    
    const emergencyRequest = new EmergencyRequest({
      userId: userId || new mongoose.Types.ObjectId(),
      location: location || { lat: 7.2906, lng: 80.6337 },
      description
    });
    
    await emergencyRequest.save();
    
    // Find and assign nearest volunteer
    const nearestVolunteer = await Volunteer.findOne({ isAvailable: true });
    if (nearestVolunteer) {
      emergencyRequest.assignedVolunteer = nearestVolunteer._id;
      emergencyRequest.status = 'assigned';
      await emergencyRequest.save();
    }
    
    res.json(emergencyRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get leaderboard
app.get('/api/volunteers/leaderboard', async (req, res) => {
  try {
    const topVolunteers = await Volunteer.find()
      .sort({ helps: -1, rating: -1 })
      .limit(10);
    
    if (topVolunteers.length === 0) {
      // Return mock data if no volunteers exist
      return res.json([
        {
          _id: "1",
          name: "Dr. Sarah Wilson",
          helps: 156,
          rating: 4.9,
          type: "Medical Responder",
          badge: "🥇"
        },
        {
          _id: "2",
          name: "Dr. Priya Fernando",
          helps: 203,
          rating: 4.8,
          type: "Medical Responder",
          badge: "🥈"
        },
        {
          _id: "3",
          name: "Kasun Perera",
          helps: 89,
          rating: 4.7,
          type: "First Aid Volunteer",
          badge: "🥉"
        }
      ]);
    }
    
    const leaderboard = topVolunteers.map((volunteer, index) => ({
      ...volunteer.toObject(),
      badge: index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "🏅"
    }));
    
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Messages routes
app.get('/api/messages/:volunteerId', async (req, res) => {
  try {
    const { volunteerId } = req.params;
    
    // For demo purposes, return mock messages
    const mockMessages = [
      {
        _id: "1",
        senderId: volunteerId,
        senderType: "volunteer",
        message: "Hello! I received your emergency request. I'm on my way to your location.",
        timestamp: new Date(Date.now() - 300000)
      },
      {
        _id: "2",
        senderId: "user123",
        senderType: "user",
        message: "Thank you! I'm having chest pain and difficulty breathing.",
        timestamp: new Date(Date.now() - 240000)
      },
      {
        _id: "3",
        senderId: volunteerId,
        senderType: "volunteer",
        message: "I understand. Try to stay calm and breathe slowly. I'll be there in 3 minutes.",
        timestamp: new Date(Date.now() - 180000)
      }
    ];
    
    res.json(mockMessages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/messages', async (req, res) => {
  try {
    const { volunteerId, message, senderType } = req.body;
    
    const newMessage = {
      _id: new mongoose.Types.ObjectId(),
      senderId: senderType === 'user' ? 'user123' : volunteerId,
      senderType,
      message,
      timestamp: new Date()
    };
    
    // In a real app, you'd save this to the database
    res.json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});