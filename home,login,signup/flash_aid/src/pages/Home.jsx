import { useNavigate } from 'react-router-dom';
import './Home.css'; // we'll create this CSS file

export default function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login'); // Navigate to login page
  };

  return (
    <div className="home-container">
      <h1>Welcome to FlashAid</h1>
      <p>Your emergency medical help app.</p>
      <button onClick={handleGetStarted}>Get Started</button>
    </div>
  );
}
