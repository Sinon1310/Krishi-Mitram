import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mic, 
  Camera, 
  MessageCircle, 
  MapPin, 
  Shield, 
  Globe,
  Sparkles,
  Star,
  Bot
} from 'lucide-react';
import ChatInterface from './components/ChatInterface';

const App = () => {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' or 'chat'

  const features = [
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Voice Queries",
      description: "Ask questions in Malayalam naturally",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Image Analysis", 
      description: "Upload crop photos for disease detection",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Multilingual Support",
      description: "Full Malayalam language understanding", 
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Location Aware",
      description: "Personalized advice for your region",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Expert Verified",
      description: "All recommendations from agricultural experts",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "24/7 Available", 
      description: "Always ready to help, anytime anywhere",
      color: "from-teal-500 to-green-500"
    }
  ];

  if (currentView === 'chat') {
    return <ChatInterface />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-green-800">KrishiMitram</span>
            </motion.div>
            
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentView('chat')}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
            >
              <Bot className="w-4 h-4" />
              <span>Start Chat</span>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Rest of your landing page code remains exactly the same */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-800 bg-clip-text text-transparent">
                KrishiMitram
              </span>
            </h1>
            <p className="text-2xl sm:text-3xl text-gray-700 mb-4 font-light">
              Your 24/7 Digital Krishi Officer
            </p>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              AI-powered farming assistance in Malayalam. Get instant expert advice for 
              pest control, weather alerts, crop management, and government schemes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentView('chat')}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
              >
                <Mic className="w-5 h-5" />
                <span>Start Speaking</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentView('chat')}
                className="border-2 border-green-500 text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-50 transition-all duration-300 flex items-center space-x-2"
              >
                <Camera className="w-5 h-5" />
                <span>Upload Image</span>
              </motion.button>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
            >
              {[
                { number: "10K+", label: "Farmers Helped" },
                { number: "50K+", label: "Queries Answered" },
                { number: "100+", label: "Crop Diseases" },
                { number: "24/7", label: "Availability" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-green-600">{stat.number}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Farmers Love <span className="text-green-600">KrishiMitram</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built specifically for Kerala farmers with cutting-edge AI technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-white to-green-50 rounded-2xl p-6 shadow-lg hover:shadow-xl border border-green-100 transition-all duration-300"
              >
                <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Farming?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of Kerala farmers who are getting expert advice instantly in their own language.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentView('chat')}
              className="bg-white text-green-600 px-10 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 inline-flex items-center space-x-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>Start Free Today</span>
            </motion.button>
            
            <div className="mt-8 flex justify-center items-center space-x-1 text-green-200">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
              <span className="ml-2">Rated 4.9/5 by 2,000+ Farmers</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default App;