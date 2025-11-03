import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain, CloudDrizzle, Navigation, Thermometer, Droplets, Wind } from 'lucide-react';

// Get API base URL from environment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://krishi-mitram.onrender.com';

const WeatherWidget = ({ onWeatherClick }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [district, setDistrict] = useState('thrissur');

  const keralDistricts = [
    { value: 'thiruvananthapuram', label: 'Thiruvananthapuram' },
    { value: 'kollam', label: 'Kollam' },
    { value: 'pathanamthitta', label: 'Pathanamthitta' },
    { value: 'alappuzha', label: 'Alappuzha' },
    { value: 'kottayam', label: 'Kottayam' },
    { value: 'idukki', label: 'Idukki' },
    { value: 'ernakulam', label: 'Ernakulam' },
    { value: 'thrissur', label: 'Thrissur' },
    { value: 'palakkad', label: 'Palakkad' },
    { value: 'malappuram', label: 'Malappuram' },
    { value: 'kozhikode', label: 'Kozhikode' },
    { value: 'wayanad', label: 'Wayanad' },
    { value: 'kannur', label: 'Kannur' },
    { value: 'kasaragod', label: 'Kasaragod' }
  ];

  useEffect(() => {
    fetchWeather();
  }, [district]);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/v1/weather/current/${district}`);
      const data = await response.json();
      
      if (data.success) {
        setWeather(data.data);
      }
    } catch (error) {
      console.error('Weather fetch error:', error);
      // Fallback weather data
      setWeather({
        location: district,
        temperature: 28,
        condition: 'Partly cloudy',
        humidity: 75,
        rainfall: 12,
        advice: ['🌤️ Normal weather conditions for farming']
      });
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    const conditionLower = condition?.toLowerCase() || '';
    if (conditionLower.includes('rain')) return <CloudRain className="w-6 h-6 text-blue-200" />;
    if (conditionLower.includes('drizzle')) return <CloudDrizzle className="w-6 h-6 text-blue-300" />;
    if (conditionLower.includes('sun') || conditionLower.includes('clear')) return <Sun className="w-6 h-6 text-yellow-200" />;
    if (conditionLower.includes('cloud')) return <Cloud className="w-6 h-6 text-gray-200" />;
    return <Cloud className="w-6 h-6 text-gray-200" />;
  };

  const getTemperatureColor = (temp) => {
    if (temp > 35) return 'text-red-200';
    if (temp > 30) return 'text-orange-200';
    if (temp > 25) return 'text-yellow-200';
    if (temp > 20) return 'text-green-200';
    return 'text-blue-200';
  };

  const getBackgroundGradient = (condition, temp) => {
    const conditionLower = condition?.toLowerCase() || '';
    if (conditionLower.includes('rain')) return 'from-gray-600 to-blue-700';
    if (conditionLower.includes('cloud')) return 'from-gray-500 to-blue-600';
    if (conditionLower.includes('sun') || conditionLower.includes('clear')) {
      if (temp > 30) return 'from-orange-500 to-red-600';
      return 'from-blue-400 to-cyan-500';
    }
    return 'from-blue-500 to-cyan-600';
  };

  const handleWeatherAdviceClick = () => {
    if (weather && onWeatherClick) {
      const weatherQuery = `What farming activities are recommended for current weather in ${weather.location}? Temperature: ${weather.temperature}°C, Condition: ${weather.condition}, Rainfall: ${weather.rainfall}mm`;
      onWeatherClick(weatherQuery);
    }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-4 text-white shadow-lg"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Navigation className="w-4 h-4 animate-spin" />
            <div className="w-20 h-4 bg-blue-400 rounded animate-pulse"></div>
          </div>
          <div className="w-8 h-8 bg-blue-400 rounded-full animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <div className="w-24 h-6 bg-blue-400 rounded animate-pulse"></div>
          <div className="w-32 h-4 bg-blue-400 rounded animate-pulse"></div>
        </div>
      </motion.div>
    );
  }

  if (!weather) {
    return (
      <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-4 text-white shadow-lg">
        <div className="text-center">
          <Cloud className="w-8 h-8 mx-auto mb-2 opacity-60" />
          <p className="text-sm">Weather data unavailable</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-3 py-1 bg-white bg-opacity-20 rounded text-xs hover:bg-opacity-30 transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Weather Widget Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-4 text-white shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Navigation className="w-5 h-5" />
            <h3 className="font-bold text-lg">Live Weather</h3>
          </div>
          <div className="bg-white bg-opacity-20 rounded-full px-2 py-1">
            <span className="text-xs font-semibold">KERALA</span>
          </div>
        </div>
        <p className="text-blue-100 text-sm">Real-time agricultural weather data</p>
      </div>

      {/* Main Weather Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-gradient-to-br ${getBackgroundGradient(weather.condition, weather.temperature)} rounded-2xl p-5 text-white shadow-xl border border-white border-opacity-20`}
      >
        {/* District Selector */}
        <div className="mb-4">
          <select 
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg px-3 py-2 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 cursor-pointer hover:bg-opacity-30 transition-all backdrop-blur-sm"
          >
            {keralDistricts.map(dist => (
              <option key={dist.value} value={dist.value} className="text-gray-800 bg-white">
                📍 {dist.label} District
              </option>
            ))}
          </select>
        </div>

        {/* Weather Display */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className={`text-4xl font-bold ${getTemperatureColor(weather.temperature)} flex items-center`}>
              <Thermometer className="w-8 h-8 mr-2" />
              {weather.temperature}°C
            </div>
            <div className="text-sm opacity-90 capitalize font-medium">{weather.condition}</div>
          </div>
          <div className="text-right space-y-2">
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              className="text-6xl"
            >
              {getWeatherIcon(weather.condition)}
            </motion.div>
          </div>
        </div>

        {/* Weather Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-3 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <Droplets className="w-4 h-4" />
              <span className="text-sm font-medium">Humidity</span>
            </div>
            <div className="text-xl font-bold">{weather.humidity}%</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <CloudRain className="w-4 h-4" />
              <span className="text-sm font-medium">Rainfall</span>
            </div>
            <div className="text-xl font-bold">{weather.rainfall}mm</div>
          </div>
        </div>

        {/* Farming Advice */}
        {weather.advice && weather.advice.length > 0 && (
          <div className="space-y-2 mb-4">
            <h4 className="font-semibold text-sm opacity-90">🌾 Farming Recommendations:</h4>
            {weather.advice.slice(0, 2).map((advice, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-xs bg-white bg-opacity-20 rounded-lg px-3 py-2 backdrop-blur-sm border border-white border-opacity-20"
              >
                💡 {advice}
              </motion.div>
            ))}
          </div>
        )}

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.98 }}
          onClick={handleWeatherAdviceClick}
          className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 border border-white border-opacity-30 text-white text-sm py-3 px-4 rounded-lg transition-all backdrop-blur-sm font-semibold flex items-center justify-center space-x-2"
        >
          <span>🌾</span>
          <span>Get Detailed Farming Advice</span>
          <span>→</span>
        </motion.button>
      </motion.div>

      {/* Quick Weather Actions */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-gray-600">Quick Weather Queries:</h4>
        {[
          "Today's planting conditions",
          "Weekly weather forecast", 
          "Rainfall predictions"
        ].map((query, index) => (
          <button
            key={index}
            onClick={() => onWeatherClick && onWeatherClick(`${query} for ${district} district`)}
            className="w-full text-left bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors"
          >
            📊 {query}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeatherWidget;
