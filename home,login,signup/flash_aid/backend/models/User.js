const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  telephone: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  age: { type: Number, required: true },
  specialDiseases: [
    {
      disease: { type: String },
      type: { type: String }, // long-term / short-term / allergy
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
