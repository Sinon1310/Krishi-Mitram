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
    <div className="flex h-screen bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100">
      {/* Enhanced Weather Sidebar */}
      <div className="w-80 bg-gradient-to-b from-white to-gray-50 border-r border-emerald-200 shadow-2xl overflow-y-auto flex-shrink-0">
        <div className="p-4">
          <WeatherWidget onWeatherClick={handleWeatherQuestion} />
        </div>
      </div>
      
      {/* Main Chat Area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 border-b border-emerald-300 px-6 py-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-xs text-white font-bold">AI</span>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <span>🌾 KrishiMitram</span>
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-green-800 px-2 py-1 rounded-full text-sm font-semibold shadow-lg">AI</span>
                </h1>
                <p className="text-emerald-100 text-sm font-medium">Kerala Department of Agriculture • AI-Powered Farming Assistant</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-3">
              <div className="bg-white bg-opacity-20 rounded-lg px-3 py-2 backdrop-blur-sm border border-white border-opacity-30">
                <div className="text-white text-xs font-semibold">LIVE STATUS</div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
                  <span className="text-emerald-100 text-xs">AI Online</span>
                </div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-3 py-2 backdrop-blur-sm border border-white border-opacity-30">
                <div className="text-white text-xs font-semibold">WEATHER</div>
                <div className="text-emerald-100 text-xs">Live Data</div>
              </div>
            </div>
          </div>
        </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
                <Bot className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Sparkles className="w-4 h-4 text-green-800" />
              </div>
            </div>
            
            <div className="max-w-2xl mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                Welcome to KrishiMitram AI
              </h2>
              <p className="text-lg text-gray-600 mb-2 leading-relaxed">
                🌾 Your intelligent farming companion for Kerala Agriculture
              </p>
              <p className="text-green-600 font-semibold text-base">
                Government of Kerala • Department of Agriculture • AI-Powered Advisory System
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                <div className="text-2xl mb-2">🌧️</div>
                <h3 className="font-bold text-blue-800 mb-1">Live Weather</h3>
                <p className="text-blue-600 text-sm">Real-time weather data for all Kerala districts</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                <div className="text-2xl mb-2">🔬</div>
                <h3 className="font-bold text-green-800 mb-1">Disease Detection</h3>
                <p className="text-green-600 text-sm">Upload plant images for AI-powered diagnosis</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                <div className="text-2xl mb-2">🎤</div>
                <h3 className="font-bold text-purple-800 mb-1">Voice Support</h3>
                <p className="text-purple-600 text-sm">Ask questions in Malayalam or English</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Quick Start - Try These Questions:</h3>
              <div className="flex flex-wrap gap-3 justify-center max-w-4xl">
                {[
                  { text: "Today's weather for farming", emoji: "🌤️", color: "bg-blue-100 text-blue-700 border-blue-200" },
                  { text: "വാഴയില പുള്ളി രോഗം", emoji: "🍌", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
                  { text: "Rice cultivation tips", emoji: "🌾", color: "bg-green-100 text-green-700 border-green-200" },
                  { text: "കുരുമുളക് കൃഷി", emoji: "🌶️", color: "bg-red-100 text-red-700 border-red-200" },
                  { text: "Organic pest control", emoji: "🐛", color: "bg-purple-100 text-purple-700 border-purple-200" },
                  { text: "Government subsidies", emoji: "💰", color: "bg-orange-100 text-orange-700 border-orange-200" },
                  { text: "Monsoon farming advice", emoji: "☔", color: "bg-indigo-100 text-indigo-700 border-indigo-200" }
                ].map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(question.text)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-md border ${question.color} flex items-center space-x-2`}
                  >
                    <span>{question.emoji}</span>
                    <span>{question.text}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 max-w-2xl">
              <p className="text-green-700 text-sm">
                💡 <strong>Pro Tip:</strong> Upload crop images, record voice messages in Malayalam, or ask about weather conditions for personalized farming advice!
              </p>
            </div>
          </div>
        ) : (
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-2xl ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                        : 'bg-gradient-to-br from-blue-500 to-cyan-600'
                    }`}
                  >
                    {message.sender === 'user' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </motion.div>
                  <div className={`rounded-2xl px-5 py-4 shadow-lg border ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-br-none border-green-400'
                      : 'bg-white border-gray-200 rounded-bl-none shadow-md'
                  }`}>
                    <div className={`flex items-center space-x-2 mb-2 ${message.sender === 'user' ? 'text-green-100' : 'text-gray-500'}`}>
                      <span className="text-xs font-semibold">
                        {message.sender === 'user' ? 'You' : '🌾 KrishiMitram AI'}
                      </span>
                      <span className={`text-xs ${message.sender === 'user' ? 'text-green-200' : 'text-gray-400'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className={`text-sm whitespace-pre-wrap leading-relaxed ${message.sender === 'user' ? 'text-white' : 'text-gray-800'}`}>
                      {message.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {/* Premium Loading Indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-start space-x-3 max-w-2xl">
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg"
              >
                <Bot className="w-5 h-5 text-white" />
              </motion.div>
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-5 py-4 shadow-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs font-semibold text-gray-500">🌾 KrishiMitram AI</span>
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <motion.div 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                  ></motion.div>
                  <motion.div 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                  ></motion.div>
                  <motion.div 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                  ></motion.div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Analyzing your query with AI...</p>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-gradient-to-r from-white via-gray-50 to-emerald-50 border-t border-emerald-200 px-6 py-5 shadow-2xl">
        <div className="max-w-6xl mx-auto">
          {/* Quick Action Buttons */}
          <div className="flex space-x-3 mb-4 justify-center">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(147, 51, 234, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowVoiceRecorder(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <Mic className="w-5 h-5" />
              <span>Voice (മലയാളം)</span>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowImageUpload(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <Camera className="w-5 h-5" />
              <span>Scan Plant</span>
            </motion.button>
          </div>

          {/* Main Input */}
          <div className="relative">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about crop diseases, weather conditions, farming techniques, government schemes... (Type in Malayalam or English) 🌾🌧️"
                  className="w-full border-2 border-emerald-300 rounded-2xl px-6 py-4 pr-16 resize-none focus:outline-none focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-30 focus:border-emerald-500 text-gray-700 placeholder-gray-500 shadow-xl bg-white"
                  rows="3"
                />
                <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                  <div className="bg-gradient-to-r from-emerald-100 to-green-100 rounded-full px-3 py-1 border border-emerald-300">
                    <span className="text-xs text-emerald-700 font-medium flex items-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span>AI Ready</span>
                    </span>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(16, 185, 129, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={!inputMessage.trim() || isLoading}
                className={`self-end rounded-2xl p-4 transition-all duration-300 shadow-xl ${
                  !inputMessage.trim() || isLoading
                    ? 'bg-gray-300 cursor-not-allowed shadow-none'
                    : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:shadow-2xl transform hover:scale-105'
                }`}
              >
                <Send className={`w-6 h-6 ${!inputMessage.trim() || isLoading ? 'text-gray-500' : 'text-white'}`} />
              </motion.button>
            </div>
          </div>

          {/* Footer Info */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-700 font-medium">
              🌾 <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent font-bold">KrishiMitram AI</span> • 
              Live Weather Data • Government of Kerala • Always Free for Farmers
            </p>
            <div className="flex items-center justify-center space-x-6 mt-2 text-xs text-gray-600">
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span>AI Online</span>
              </span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Weather Live</span>
              </span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span>Voice Ready</span>
              </span>
            </div>
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