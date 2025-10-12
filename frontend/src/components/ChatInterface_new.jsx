import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Camera, User, Bot, Sparkles, MessageCircle, Zap } from 'lucide-react';
import { aiService } from '../services/aiService';
import ImageUpload from './ImageUpload';
import VoiceRecorder from './VoiceRecorder';
import WeatherWidget from './WeatherWidget';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "🙏 Namaste! I'm KrishiMitram AI, your farming assistant. Ask me anything about Kerala agriculture in Malayalam or English! 🌾\n\nI can help with:\n• Crop diseases & pest control 🐛\n• Planting seasons & weather advice 🌧️\n• Government schemes & subsidies 💰\n• Organic farming techniques 🌿\n• Market prices & crop selection 📈",
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
      console.log('🤖 Sending message to AI:', inputMessage);
      const aiResponse = await aiService.sendMessage(inputMessage);
      console.log('✅ AI Response received:', aiResponse);
      
      const botMessage = {
        id: Date.now() + 1,
        text: aiResponse.response,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('❌ Chat Error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: `Sorry, I'm having trouble connecting to the AI service. Error: ${error.message}\n\nPlease try again or ask about:\n• Banana leaf spot disease\n• Rice planting season\n• Weather advice\n• Government subsidies`,
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
    setTimeout(() => handleSend(), 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    { text: "What crops should I plant this season in Kerala?", emoji: "🌱", color: "from-green-500 to-emerald-600" },
    { text: "What are the current weather conditions for farming?", emoji: "🌦️", color: "from-blue-500 to-cyan-600" },
    { text: "What government schemes are available for farmers?", emoji: "💰", color: "from-purple-500 to-violet-600" },
    { text: "How to identify and treat crop diseases organically?", emoji: "🐛", color: "from-orange-500 to-red-600" },
    { text: "What are the best organic farming practices?", emoji: "🌿", color: "from-teal-500 to-green-600" },
    { text: "What are the current market prices for crops?", emoji: "📈", color: "from-indigo-500 to-purple-600" }
  ];

  const malayalamQuestions = [
    "നെല്ല് കൃഷിയുടെ ഉത്തമ സമയം എന്നാണ്?",
    "വാഴയുടെ ഇല പുള്ളി രോഗം എങ്ങനെ നിയന്ത്രിക്കാം?",
    "കുരുമുളക് കൃഷിക്ക് എന്ത് വിത്ത് ഉപയോഗിക്കണം?",
    "ജൈവ കൃഷിയുടെ നേട്ടങ്ങൾ എന്തൊക്കെയാണ്?"
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-emerald-50 via-green-25 to-teal-50">
      {/* Enhanced Weather Sidebar */}
      <div className="w-80 bg-gradient-to-b from-white to-gray-50 border-r border-emerald-200 shadow-2xl overflow-y-auto flex-shrink-0">
        <div className="p-4">
          <WeatherWidget onWeatherClick={handleWeatherQuestion} />
        </div>
      </div>
      
      {/* Main Chat Area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Professional Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 border-b border-emerald-300 px-6 py-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <motion.div 
                  className="w-14 h-14 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-2xl"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-xs text-white font-bold">AI</span>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <span>🌾 KrishiMitram</span>
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-green-800 px-3 py-1 rounded-full text-sm font-semibold shadow-lg">AI</span>
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
        <div className="flex-1 overflow-y-auto px-6 py-6 bg-gradient-to-b from-white via-green-25 to-emerald-25">
          {messages.length === 1 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
              <motion.div 
                className="relative mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                <div className="w-32 h-32 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-2xl">
                  <Bot className="w-16 h-16 text-white" />
                </div>
                <motion.div 
                  className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-6 h-6 text-green-800" />
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="max-w-4xl mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">
                  Welcome to KrishiMitram AI
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Your intelligent farming companion for Kerala agriculture. Get expert advice, weather updates, and government scheme information.
                </p>
                
                {/* Quick Action Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {quickQuestions.map((question, index) => (
                    <motion.div 
                      key={index}
                      className={`bg-gradient-to-br ${question.color} p-6 rounded-2xl text-white shadow-xl cursor-pointer hover:shadow-2xl transition-all duration-300`}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setInputMessage(question.text)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <div className="text-3xl mb-3">{question.emoji}</div>
                      <h3 className="font-bold text-lg mb-2">{question.text.split(' ').slice(0, 3).join(' ')}</h3>
                      <p className="text-sm opacity-90">{question.text.split(' ').slice(3).join(' ')}</p>
                    </motion.div>
                  ))}
                </div>
                
                {/* Malayalam Questions */}
                <motion.div 
                  className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-2xl border border-green-200 mb-8"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <h3 className="text-green-800 font-bold text-lg mb-4 flex items-center space-x-2">
                    <span>🗣️</span>
                    <span>മലയാളത്തിൽ ചോദിക്കാം (Ask in Malayalam):</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    {malayalamQuestions.map((question, index) => (
                      <motion.button 
                        key={index}
                        className="text-left p-3 bg-white rounded-lg border border-green-200 hover:bg-green-50 transition-colors hover:shadow-md"
                        onClick={() => setInputMessage(question)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + index * 0.1 }}
                      >
                        "{question}"
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Feature Highlights */}
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                    <div className="text-2xl mb-2">🌧️</div>
                    <h3 className="font-bold text-blue-800 mb-1">Live Weather</h3>
                    <p className="text-blue-600 text-sm">Real-time weather data for all Kerala districts</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                    <div className="text-2xl mb-2">🔬</div>
                    <h3 className="font-bold text-green-800 mb-1">Disease Detection</h3>
                    <p className="text-green-600 text-sm">Upload plant images for AI diagnosis</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                    <div className="text-2xl mb-2">🎤</div>
                    <h3 className="font-bold text-purple-800 mb-1">Voice Support</h3>
                    <p className="text-purple-600 text-sm">Malayalam voice input/output</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          ) : (
            <div className="space-y-6">
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
                    <div className={`flex items-start space-x-3 max-w-4xl ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {/* Enhanced Avatar */}
                      <motion.div 
                        className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                          message.sender === 'user' 
                            ? 'bg-gradient-to-br from-blue-500 to-indigo-600' 
                            : 'bg-gradient-to-br from-green-500 to-emerald-600'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {message.sender === 'user' ? (
                          <User className="w-6 h-6 text-white" />
                        ) : (
                          <Bot className="w-6 h-6 text-white" />
                        )}
                      </motion.div>
                      
                      {/* Enhanced Message Bubble */}
                      <motion.div 
                        className={`relative px-6 py-4 rounded-2xl shadow-lg ${
                          message.sender === 'user' 
                            ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white' 
                            : 'bg-white border border-gray-200'
                        }`}
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {message.sender === 'bot' && (
                          <div className="flex items-center space-x-2 mb-3">
                            <Sparkles className="w-4 h-4 text-green-600" />
                            <span className="text-green-600 font-semibold text-sm">KrishiMitram AI</span>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          </div>
                        )}
                        <p className={`whitespace-pre-wrap leading-relaxed ${
                          message.sender === 'user' ? 'text-white' : 'text-gray-800'
                        }`}>
                          {message.text}
                        </p>
                        <div className={`text-xs mt-3 flex items-center space-x-1 ${
                          message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          <MessageCircle className="w-3 h-3" />
                          <span>{message.timestamp.toLocaleTimeString()}</span>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-3 max-w-4xl">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div className="bg-white border border-gray-200 px-6 py-4 rounded-2xl shadow-lg">
                      <div className="flex items-center space-x-2 mb-3">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="w-4 h-4 text-green-600" />
                        </motion.div>
                        <span className="text-green-600 font-semibold text-sm">KrishiMitram AI is thinking...</span>
                      </div>
                      <div className="flex space-x-1">
                        <motion.div 
                          className="w-2 h-2 bg-green-500 rounded-full"
                          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        <motion.div 
                          className="w-2 h-2 bg-green-500 rounded-full"
                          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div 
                          className="w-2 h-2 bg-green-500 rounded-full"
                          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Enhanced Input Area */}
        <div className="bg-gradient-to-r from-white via-gray-50 to-emerald-50 border-t border-emerald-200 px-6 py-5 shadow-2xl">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-4 bg-white rounded-2xl border border-emerald-200 shadow-lg p-3">
              <div className="flex space-x-2">
                <motion.button
                  onClick={() => setShowImageUpload(!showImageUpload)}
                  className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 text-white hover:shadow-lg transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Camera className="w-5 h-5" />
                </motion.button>
                <motion.button
                  onClick={() => setShowVoiceRecorder(!showVoiceRecorder)}
                  className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white hover:shadow-lg transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mic className="w-5 h-5" />
                </motion.button>
              </div>
              
              <div className="flex-1 relative">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about farming, weather, diseases, government schemes... (Malayalam/English)"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-800 placeholder-gray-500"
                  rows={1}
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>
              
              <motion.button
                onClick={handleSend}
                disabled={!inputMessage.trim() || isLoading}
                className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </motion.button>
            </div>
            
            <div className="text-center mt-3">
              <p className="text-xs text-gray-500">
                🌾 KrishiMitram AI • Live Weather Data • Government of Kerala • Always Free for Farmers
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showImageUpload && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <ImageUpload onClose={() => setShowImageUpload(false)} />
          </motion.div>
        </motion.div>
      )}

      {showVoiceRecorder && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <VoiceRecorder onClose={() => setShowVoiceRecorder(false)} />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ChatInterface;
