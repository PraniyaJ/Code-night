import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/auth.css';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [telephone, setTelephone] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [age, setAge] = useState('');
  const [specialDiseases, setSpecialDiseases] = useState([{ disease: '', type: '' }]);
  
  const navigate = useNavigate();

  const handleDiseaseChange = (index, field, value) => {
    const newDiseases = [...specialDiseases];
    newDiseases[index][field] = value;
    setSpecialDiseases(newDiseases);
  };

  const addDisease = () => {
    setSpecialDiseases([...specialDiseases, { disease: '', type: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', {
        name, email, password, address, telephone, emergencyContact, age, specialDiseases
      });
      alert('Signup successful');
      navigate('/login');
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <input type="text" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} required />
        <input type="text" placeholder="Telephone" value={telephone} onChange={e => setTelephone(e.target.value)} required />
        <input type="text" placeholder="Emergency Contact" value={emergencyContact} onChange={e => setEmergencyContact(e.target.value)} required />
        <input type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} required />

        <h4>Special Diseases / Allergies</h4>
        {specialDiseases.map((disease, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Disease Name"
              value={disease.disease}
              onChange={e => handleDiseaseChange(index, 'disease', e.target.value)}
              style={{ marginRight: '5px' }}
            />
            <input
              type="text"
              placeholder="Type (long-term / short-term / allergy)"
              value={disease.type}
              onChange={e => handleDiseaseChange(index, 'type', e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={addDisease} style={{ marginBottom: '15px' }}>Add More</button>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
