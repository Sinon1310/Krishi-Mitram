import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Bot, 
  Camera, 
  Mic, 
  Cloud, 
  Leaf, 
  Users, 
  Award, 
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';

const LandingPage = ({ onGetStarted }) => {
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI-Powered Expert Advice",
      description: "Get instant answers to farming questions with advanced AI technology",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Plant Disease Detection",
      description: "Upload crop images for instant disease diagnosis and treatment",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Malayalam Voice Support",
      description: "Ask questions in your native language with voice recognition",
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Live Weather Data",
      description: "Real-time weather updates for all Kerala districts",
      color: "from-orange-500 to-red-600"
    }
  ];

  const stats = [
    { number: "14", label: "Kerala Districts", icon: "🗺️" },
    { number: "24/7", label: "AI Support", icon: "🤖" },
    { number: "100%", label: "Free Service", icon: "💰" },
    { number: "2", label: "Languages", icon: "🗣️" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full"></div>
          <div className="absolute top-32 right-20 w-16 h-16 border border-white rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 border border-white rounded-full"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-16">
          {/* Header */}
          <motion.header 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-16"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-2xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">🌾 KrishiMitram AI</h1>
                <p className="text-emerald-200">Government of Kerala</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-4 py-2 backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">AI System Online</span>
            </div>
          </motion.header>

          {/* Main Hero Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="mb-6">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-green-900 px-4 py-2 rounded-full font-bold text-sm mb-4"
                >
                  <Award className="w-4 h-4" />
                  <span>Department of Agriculture Initiative</span>
                </motion.div>
                
                <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                    Your AI-Powered
                  </span>
                  <br />
                  <span className="text-yellow-400">Farming Assistant</span>
                </h1>
                
                <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
                  Get expert agricultural advice, weather updates, and crop disease detection - all powered by advanced AI technology. Designed specifically for Kerala farmers.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-green-900 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Start Farming with AI</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    // Scroll to features section
                    document.querySelector('#features-section')?.scrollIntoView({ 
                      behavior: 'smooth' 
                    });
                  }}
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-green-900 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Star className="w-5 h-5" />
                  <span>Explore Features</span>
                </motion.button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="text-2xl font-bold text-yellow-400">{stat.number}</div>
                    <div className="text-xs text-emerald-200">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Feature Showcase */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-4">Key Features</h3>
                  
                  {/* Feature Cards */}
                  <div className="space-y-4">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0.6 }}
                        animate={{ 
                          opacity: currentFeature === index ? 1 : 0.6,
                          scale: currentFeature === index ? 1.02 : 1
                        }}
                        className={`p-4 rounded-xl border transition-all duration-500 ${
                          currentFeature === index 
                            ? 'bg-white bg-opacity-20 border-yellow-400' 
                            : 'bg-white bg-opacity-5 border-white border-opacity-20'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center text-white`}>
                            {feature.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-lg mb-1">{feature.title}</h4>
                            <p className="text-emerald-200 text-sm">{feature.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Feature Dots */}
                <div className="flex justify-center space-x-2">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentFeature(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentFeature === index ? 'bg-yellow-400 w-6' : 'bg-white bg-opacity-40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <motion.div 
        id="features-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-green-600 to-emerald-600 py-16"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose KrishiMitram?</h2>
            <p className="text-green-100 text-lg">Trusted by Kerala farmers for modern agricultural solutions</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "100% Free Service",
                description: "Completely free for all Kerala farmers - no hidden charges or subscriptions"
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Expert AI Technology",
                description: "Powered by advanced AI trained specifically for Kerala agricultural conditions"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Government Backed",
                description: "Official initiative by Kerala Department of Agriculture for farmer welfare"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.2 }}
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white border-opacity-20"
              >
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 text-green-900">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-green-100">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 }}
          >
            <h2 className="text-4xl font-bold text-green-900 mb-4">
              Ready to Transform Your Farming?
            </h2>
            <p className="text-green-800 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of Kerala farmers already using KrishiMitram AI for smarter, more productive farming.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="bg-green-900 text-white px-12 py-4 rounded-xl font-bold text-xl shadow-2xl hover:bg-green-800 transition-all duration-300 inline-flex items-center space-x-3"
            >
              <Sparkles className="w-6 h-6" />
              <span>Start Your AI Farming Journey</span>
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
