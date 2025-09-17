// pages/messages.jsx - Updated with API integration
import { useState, useEffect } from "react";
import ApiService from "../services/api";
import "../components/messages.css";

export default function Messages({ selectedVolunteer, showMessages }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedVolunteer) {
      fetchMessages();
    }
  }, [selectedVolunteer]);

  const fetchMessages = async () => {
    if (!selectedVolunteer) return;
    
    setLoading(true);
    setError(null);

    try {
      const response = await ApiService.getMessages(selectedVolunteer._id || selectedVolunteer.id);
      setMessages(response);
    } catch (err) {
      setError('Failed to load messages. Please try again.');
      console.error('Error fetching messages:', err);
      
      // Fallback to mock messages if API fails
      setMessages([
        {
          _id: 1,
          senderId: selectedVolunteer._id || selectedVolunteer.id,
          senderType: "volunteer",
          message: "Hello! I received your emergency request. I'm on my way to your location.",
          timestamp: new Date(Date.now() - 300000)
        },
        {
          _id: 2,
          senderId: "user123",
          senderType: "user",
          message: "Thank you! I'm having chest pain and difficulty breathing.",
          timestamp: new Date(Date.now() - 240000)
        },
        {
          _id: 3,
          senderId: selectedVolunteer._id || selectedVolunteer.id,
          senderType: "volunteer",
          message: "I understand. Try to stay calm and breathe slowly. I'll be there in 3 minutes.",
          timestamp: new Date(Date.now() - 180000)
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedVolunteer) {
      const tempMessage = {
        _id: Date.now(),
        senderId: "user123",
        senderType: "user",
        message: newMessage,
        timestamp: new Date()
      };

      // Optimistically add message to UI
      setMessages(prev => [...prev, tempMessage]);
      setNewMessage("");

      try {
        const response = await ApiService.sendMessage({
          volunteerId: selectedVolunteer._id || selectedVolunteer.id,
          message: newMessage,
          senderType: "user"
        });

        // Update with server response
        setMessages(prev => 
          prev.map(msg => 
            msg._id === tempMessage._id ? response : msg
          )
        );
      } catch (err) {
        console.error('Error sending message:', err);
        setError('Failed to send message. Please try again.');
        
        // Remove optimistic message on error
        setMessages(prev => 
          prev.filter(msg => msg._id !== tempMessage._id)
        );
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="messages-page">
        <header className="messages-header">
          <h1>Messages</h1>
        </header>
        <div className="loading-container">
          <p>Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="messages-page">
      <header className="messages-header">
        <h1>
          {selectedVolunteer ? `Chat with ${selectedVolunteer.name}` : "Messages"}
        </h1>
        {selectedVolunteer && (
          <div className="volunteer-status">
            <span className="status-dot online"></span>
            <span>{selectedVolunteer.type}</span>
          </div>
        )}
      </header>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      {!selectedVolunteer ? (
        <div className="no-volunteer-selected">
          <p>Please select a volunteer from the dashboard to start messaging.</p>
        </div>
      ) : (
        <div className="messages-container">
          <div className="messages-list">
            {messages.map((message) => (
              <div 
                key={message._id}
                className={`message ${message.senderType === 'user' ? 'sent' : 'received'}`}
              >
                <div className="message-content">
                  <p>{message.message}</p>
                  <span className="timestamp">
                    {formatTimestamp(message.timestamp)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="message-input-container">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="message-input"
            />
            <button 
              onClick={handleSendMessage}
              className="send-button"
              disabled={!newMessage.trim()}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}