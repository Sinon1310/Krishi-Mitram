import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WeatherWidget = ({ onWeatherClick }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [district, setDistrict] = useState('thrissur');

  const keralDistricts = [
    'thiruvananthapuram', 'kollam', 'pathanamthitta', 'alappuzha',
    'kottayam', 'idukki', 'ernakulam', 'thrissur', 'palakkad',
    'malappuram', 'kozhikode', 'wayanad', 'kannur', 'kasaragod'
  ];

  useEffect(() => {
    fetchWeather();
  }, [district]);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/v1/weather/current/${district}`);
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
    if (conditionLower.includes('rain')) return '🌧️';
    if (conditionLower.includes('cloud')) return '☁️';
    if (conditionLower.includes('sun') || conditionLower.includes('clear')) return '☀️';
    if (conditionLower.includes('storm')) return '⛈️';
    return '🌤️';
  };

  const getTemperatureColor = (temp) => {
    if (temp > 35) return 'text-red-500';
    if (temp > 30) return 'text-orange-500';
    if (temp > 25) return 'text-yellow-500';
    if (temp > 20) return 'text-green-500';
    return 'text-blue-500';
  };

  const handleWeatherAdviceClick = () => {
    if (weather && onWeatherClick) {
      const weatherQuery = `What farming activities are recommended for current weather in ${weather.location}? Temperature: ${weather.temperature}°C, Condition: ${weather.condition}, Rainfall: ${weather.rainfall}mm`;
      onWeatherClick(weatherQuery);
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-4 border border-blue-200">
        <div className="animate-pulse">
          <div className="h-4 bg-blue-200 rounded mb-2"></div>
          <div className="h-8 bg-blue-200 rounded mb-2"></div>
          <div className="h-4 bg-blue-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-4 border border-blue-200 shadow-sm"
    >
      {/* District Selector */}
      <div className="mb-3">
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="text-sm bg-white border border-blue-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-300"
        >
          {keralDistricts.map(dist => (
            <option key={dist} value={dist}>
              {dist.charAt(0).toUpperCase() + dist.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Main Weather Info */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{getWeatherIcon(weather.condition)}</span>
          <div>
            <div className={`text-2xl font-bold ${getTemperatureColor(weather.temperature)}`}>
              {weather.temperature}°C
            </div>
            <div className="text-xs text-gray-600">{weather.condition}</div>
          </div>
        </div>
        <div className="text-right text-xs text-gray-600">
          <div>💧 {weather.humidity}%</div>
          <div>🌧️ {weather.rainfall}mm</div>
        </div>
      </div>

      {/* Weather Advice */}
      <div className="space-y-1">
        {weather.advice?.slice(0, 2).map((advice, index) => (
          <div key={index} className="text-xs text-gray-700 bg-white bg-opacity-60 rounded px-2 py-1">
            {advice}
          </div>
        ))}
      </div>

      {/* Action Button */}
      <button
        onClick={handleWeatherAdviceClick}
        className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white text-xs py-2 px-3 rounded transition-colors"
      >
        Get Weather-Based Farming Advice 🌾
      </button>
    </motion.div>
  );
};

export default WeatherWidget;
