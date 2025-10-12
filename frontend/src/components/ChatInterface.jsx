import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Camera, User, Bot, Sparkles, MessageCircle, Zap, Menu } from 'lucide-react';
import { aiService } from '../services/aiService';
import ImageUpload from './ImageUpload';
import VoiceRecorder from './VoiceRecorder';
import WeatherWidget from './WeatherWidget';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "🙏 Namaste! I'm KrishiMitram AI, your dedicated farming assistant for Kerala. Ask me anything about agriculture in Malayalam or English!\n\nI can help you with crop diseases, weather advice, government schemes, and organic farming techniques.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
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
    "What crops should I plant this season?",
    "How to treat banana leaf spot disease?",
    "Current weather conditions for farming",
    "Available government subsidies",
    "Organic farming best practices",
    "Market prices for major crops"
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Clean Weather Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-72 bg-white border-r border-gray-200 shadow-sm flex-shrink-0"
          >
            <div className="p-6">
              <WeatherWidget onWeatherClick={handleWeatherQuestion} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Chat Container */}
      <div className="flex flex-col flex-1 min-w-0 bg-white">
        {/* Clean Professional Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
                    <span>KrishiMitram AI</span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">Live</span>
                  </h1>
                  <p className="text-sm text-gray-600">Kerala Department of Agriculture</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>AI Online</span>
              </div>
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Weather Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {messages.length === 1 ? (
              /* Clean Welcome Screen */
              <div className="text-center space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Welcome to KrishiMitram AI
                  </h2>
                  <p className="text-gray-600 max-w-lg mx-auto">
                    Your intelligent farming companion for Kerala agriculture. Get expert advice on crops, weather, diseases, and government schemes.
                  </p>
                </motion.div>

                {/* Clean Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-medium text-gray-700">Quick Questions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                    {quickQuestions.map((question, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setInputMessage(question)}
                        className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-gray-700">{question}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Malayalam Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-green-50 rounded-lg p-6 max-w-2xl mx-auto"
                >
                  <h3 className="text-lg font-medium text-green-800 mb-4">മലയാളത്തിൽ ചോദിക്കാം</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "നെല്ല് കൃഷിയുടെ ഉത്തമ സമയം എന്നാണ്?",
                      "വാഴയുടെ ഇല പുള്ളി രോഗം എങ്ങനെ നിയന്ത്രിക്കാം?"
                    ].map((question, index) => (
                      <button
                        key={index}
                        onClick={() => setInputMessage(question)}
                        className="p-3 text-left bg-white rounded-lg border border-green-200 hover:bg-green-50 transition-colors text-sm"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            ) : (
              /* Clean Messages */
              <div className="space-y-6">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-3 max-w-3xl ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.sender === 'user' 
                            ? 'bg-blue-500' 
                            : 'bg-green-500'
                        }`}>
                          {message.sender === 'user' ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-white" />
                          )}
                        </div>
                        
                        <div className={`px-4 py-3 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {message.sender === 'bot' && (
                            <div className="flex items-center space-x-2 mb-2 text-xs text-gray-600">
                              <Sparkles className="w-3 h-3" />
                              <span>KrishiMitram AI</span>
                            </div>
                          )}
                          <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
                          <div className={`text-xs mt-2 ${
                            message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
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
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                        <div className="flex items-center space-x-2 mb-2 text-xs text-gray-600">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            <Sparkles className="w-3 h-3" />
                          </motion.div>
                          <span>KrishiMitram AI is thinking...</span>
                        </div>
                        <div className="flex space-x-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Clean Input Area */}
        <div className="border-t border-gray-200 bg-white">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-end space-x-3">
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowImageUpload(true)}
                  className="p-2 rounded-lg bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
                >
                  <Camera className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowVoiceRecorder(true)}
                  className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                >
                  <Mic className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about farming, weather, diseases, government schemes... (Malayalam/English)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={1}
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>
              
              <button
                onClick={handleSend}
                disabled={!inputMessage.trim() || isLoading}
                className="p-3 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Zap className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
            
            <div className="text-center mt-3">
              <p className="text-xs text-gray-500">
                KrishiMitram AI • Live Weather Data • Government of Kerala • Free for Farmers
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Modals */}
      <AnimatePresence>
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
      </AnimatePresence>
    </div>
  );
};

export default ChatInterface;
