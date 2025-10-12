import express from 'express';
import weatherService from '../services/weatherService.js';

const router = express.Router();

// Get current weather for a district
router.get('/current/:district?', async (req, res) => {
  try {
    const district = req.params.district || 'thrissur';
    console.log('🌤️ Weather request for district:', district);
    
    const weather = await weatherService.getKeralaWeather(district);
    
    res.json({
      success: true,
      data: weather,
      district: district,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Weather route error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch weather data'
    });
  }
});

// Get weather advice for specific crop
router.get('/advice/:crop/:district?', async (req, res) => {
  try {
    const { crop, district = 'thrissur' } = req.params;
    console.log(`🌾 Weather advice for ${crop} in ${district}`);
    
    const weatherAdvice = await weatherService.getWeatherAdvice(crop, district);
    
    res.json({
      success: true,
      data: weatherAdvice,
      crop: crop,
      district: district,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Weather advice route error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch weather advice'
    });
  }
});

// Get weather for all Kerala districts (for dashboard)
router.get('/kerala/all', async (req, res) => {
  try {
    const districts = [
      'thiruvananthapuram', 'kollam', 'pathanamthitta', 'alappuzha',
      'kottayam', 'idukki', 'ernakulam', 'thrissur', 'palakkad',
      'malappuram', 'kozhikode', 'wayanad', 'kannur', 'kasaragod'
    ];
    
    console.log('🗺️ Fetching weather for all Kerala districts');
    
    // Get weather for major districts only to avoid API limits
    const majorDistricts = ['thiruvananthapuram', 'ernakulam', 'thrissur', 'kozhikode'];
    const weatherPromises = majorDistricts.map(district => 
      weatherService.getKeralaWeather(district)
    );
    
    const weatherData = await Promise.all(weatherPromises);
    
    const districtWeather = majorDistricts.reduce((acc, district, index) => {
      acc[district] = weatherData[index];
      return acc;
    }, {});
    
    res.json({
      success: true,
      data: districtWeather,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('All districts weather error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch Kerala weather data'
    });
  }
});

// Quick weather check endpoint
router.get('/quick', async (req, res) => {
  try {
    const weather = await weatherService.getKeralaWeather('thrissur');
    
    res.json({
      success: true,
      summary: {
        temperature: weather.temperature + '°C',
        condition: weather.condition,
        rainfall: weather.rainfall + 'mm',
        advice: weather.advice[0] || 'Normal farming conditions'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Weather service unavailable'
    });
  }
});

export default router;
