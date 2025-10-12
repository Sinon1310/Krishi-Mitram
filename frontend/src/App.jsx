import React, { useState } from 'react';
import './App.css';
import ChatInterface from './components/ChatInterface';
import LandingPage from './components/LandingPage';

function App() {
  const [showChat, setShowChat] = useState(false);

  const handleGetStarted = () => {
    setShowChat(true);
  };

  return (
    <div className="App">
      {showChat ? (
        <ChatInterface />
      ) : (
        <LandingPage onGetStarted={handleGetStarted} />
      )}
    </div>
  );
}

export default App;