import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Camera, User, Bot, Sparkles } from 'lucide-react';
import { aiService } from '../services/aiService';
import ImageUpload from './ImageUpload';
import VoiceRecorder from './VoiceRecorder';
import WeatherWidget from './WeatherWidget';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm KrishiMitram AI. Ask me anything about farming in Malayalam or English! 🌾",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // REAL AI INTEGRATION
      const aiResponse = await aiService.sendMessage(inputMessage);
      
      const botMessage = {
        id: Date.now() + 1,
        text: aiResponse.response,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      // Fallback response if AI fails
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm here to help with farming questions! Try asking about:\n\n• Banana leaf spot disease\n• Rice planting season\n• Weather advice\n• Government subsidies\n\nYou can ask in Malayalam or English! �",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWeatherQuestion = (weatherQuery) => {
    setInputMessage(weatherQuery);
    // Optionally auto-send the weather query
    setTimeout(() => handleSend(), 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Weather Sidebar */}
      <div className="w-80 bg-white border-r border-green-200 p-4 overflow-y-auto">
        <WeatherWidget onWeatherClick={handleWeatherQuestion} />
      </div>
      
      {/* Main Chat Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="bg-white border-b border-green-200 px-6 py-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-800">KrishiMitram AI</h1>
              <p className="text-sm text-green-600">Your digital farming assistant</p>
            </div>
          </div>
        </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user' 
                    ? 'bg-green-500' 
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-green-500 text-white rounded-br-none'
                    : 'bg-white border border-green-200 rounded-bl-none shadow-sm'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <p className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading Indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-start space-x-3 max-w-xs lg:max-w-md">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-green-200 rounded-2xl rounded-bl-none px-4 py-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-green-200 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-2 mb-3">
            <button 
              onClick={() => setShowVoiceRecorder(true)}
              className="flex items-center space-x-2 px-4 py-2 border border-green-300 rounded-full text-green-700 hover:bg-green-50 transition-colors"
            >
              <Mic className="w-4 h-4" />
              <span className="text-sm">Voice</span>
            </button>
            <button 
              onClick={() => setShowImageUpload(true)}
              className="flex items-center space-x-2 px-4 py-2 border border-green-300 rounded-full text-green-700 hover:bg-green-50 transition-colors"
            >
              <Camera className="w-4 h-4" />
              <span className="text-sm">Image</span>
            </button>
          </div>
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about crop diseases, weather, pesticides, subsidies... (Type in Malayalam or English)"
                className="w-full border border-green-300 rounded-2xl px-4 py-3 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows="2"
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!inputMessage.trim() || isLoading}
              className={`self-end rounded-2xl p-3 transition-all duration-200 ${
                !inputMessage.trim() || isLoading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 transform hover:scale-105'
              }`}
            >
              <Send className={`w-5 h-5 ${!inputMessage.trim() || isLoading ? 'text-gray-500' : 'text-white'}`} />
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            Ask in മലയാളം or English • Powered by AI • Always free for farmers
          </p>
        </div>
        
        {/* Quick Action Buttons */}
        <div className="max-w-4xl mx-auto mb-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              "വാഴയില പുള്ളി രോഗം",
              "Rice planting season",
              "Weather forecast",
              "Subsidy schemes",
              "Banana fertilizer"
            ].map((quickQuestion) => (
              <button
                key={quickQuestion}
                onClick={() => setInputMessage(quickQuestion)}
                className="px-3 py-2 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors border border-green-300"
              >
                {quickQuestion}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {showImageUpload && (
        <ImageUpload
          onAnalysisComplete={(analysis, imagePreview) => {
            // Add analysis result to chat
            const botMessage = {
              id: Date.now(),
              text: `🌿 **Plant Disease Analysis**\n\n**Detected**: ${analysis.disease}\n**Confidence**: ${analysis.confidence}%\n\n**Treatment**: ${analysis.treatment}\n\n**Organic Option**: ${analysis.organicTreatment}\n\n**Prevention**: ${analysis.prevention}`,
              sender: 'bot',
              timestamp: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
            setShowImageUpload(false);
          }}
          onClose={() => setShowImageUpload(false)}
        />
      )}
      
      {showVoiceRecorder && (
        <VoiceRecorder
          onTranscriptComplete={(transcript) => {
            // Set the voice transcript as input message
            setInputMessage(transcript);
            setShowVoiceRecorder(false);
          }}
          onClose={() => setShowVoiceRecorder(false)}
        />
      )}
      </div>
    </div>
  );
};

export default ChatInterface;