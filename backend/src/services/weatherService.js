import axios from 'axios';

class WeatherService {
  constructor() {
    this.apiKey = process.env.WEATHER_API_KEY;
    this.baseURL = 'http://api.weatherapi.com/v1';
  }

  async getKeralaWeather(district = 'thrissur') {
    try {
      console.log('🌤️ Fetching weather for:', district);
      
      if (!this.apiKey || this.apiKey === 'your_weather_api_key_here') {
        console.log('⚠️ No weather API key, using fallback');
        return this.getFallbackWeather(district);
      }

      const response = await axios.get(
        `${this.baseURL}/forecast.json?key=${this.apiKey}&q=${district},kerala&days=3`
      );

      const weatherData = response.data;
      
      return {
        location: weatherData.location.name,
        temperature: weatherData.current.temp_c,
        condition: weatherData.current.condition.text,
        humidity: weatherData.current.humidity,
        rainfall: weatherData.forecast.forecastday[0].day.totalprecip_mm,
        windSpeed: weatherData.current.wind_kph,
        uvIndex: weatherData.current.uv,
        forecast: weatherData.forecast.forecastday.slice(0, 3),
        advice: this.generateFarmingAdvice(weatherData)
      };
    } catch (error) {
      console.error('Weather API Error:', error.message);
      return this.getFallbackWeather(district);
    }
  }

  generateFarmingAdvice(weatherData) {
    const { current, forecast } = weatherData;
    const advice = [];

    // Rainfall advice
    const rainfall = forecast.forecastday[0].day.totalprecip_mm;
    if (rainfall > 50) {
      advice.push('🌧️ Heavy rain expected - Delay field activities, protect seedlings');
    } else if (rainfall > 20) {
      advice.push('💧 Good rainfall - Ideal for planting and transplantation');
    } else if (rainfall < 5) {
      advice.push('☀️ Dry conditions - Ensure adequate irrigation for crops');
    }

    // Temperature advice
    if (current.temp_c > 35) {
      advice.push('🔥 High temperature - Water crops frequently, provide shade');
    } else if (current.temp_c < 20) {
      advice.push('❄️ Cool weather - Excellent for vegetable crops');
    }

    // Humidity advice
    if (current.humidity > 85) {
      advice.push('💦 Very high humidity - Monitor for fungal diseases, improve ventilation');
    } else if (current.humidity < 40) {
      advice.push('🌬️ Low humidity - Increase watering frequency');
    }

    // Wind advice
    if (current.wind_kph > 25) {
      advice.push('💨 Strong winds - Secure young plants and farm structures');
    }

    // UV advice
    if (current.uv > 8) {
      advice.push('☀️ High UV - Provide crop protection, work during cooler hours');
    }

    return advice.length > 0 ? advice : ['🌤️ Normal weather conditions - Continue regular farming activities'];
  }

  getFallbackWeather(district = 'Kerala') {
    // Realistic Kerala weather data based on season
    const month = new Date().getMonth();
    let seasonalData;

    if (month >= 5 && month <= 9) { // Monsoon season
      seasonalData = {
        temperature: 26,
        condition: 'Moderate rain',
        humidity: 85,
        rainfall: 35,
        advice: ['🌧️ Monsoon season - Good for rice cultivation', '💧 High rainfall - Monitor drainage systems']
      };
    } else if (month >= 10 && month <= 1) { // Post-monsoon/Winter
      seasonalData = {
        temperature: 24,
        condition: 'Partly cloudy',
        humidity: 70,
        rainfall: 5,
        advice: ['🌤️ Post-monsoon - Ideal for vegetable cultivation', '❄️ Cool weather - Good for spice crops']
      };
    } else { // Summer
      seasonalData = {
        temperature: 32,
        condition: 'Hot and humid',
        humidity: 65,
        rainfall: 8,
        advice: ['🔥 Summer season - Ensure adequate irrigation', '☀️ Hot weather - Work during early morning hours']
      };
    }

    return {
      location: district,
      temperature: seasonalData.temperature,
      condition: seasonalData.condition,
      humidity: seasonalData.humidity,
      rainfall: seasonalData.rainfall,
      windSpeed: 12,
      uvIndex: 6,
      forecast: this.generateFallbackForecast(),
      advice: seasonalData.advice
    };
  }

  generateFallbackForecast() {
    const today = new Date();
    const forecast = [];
    
    for (let i = 0; i < 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      forecast.push({
        date: date.toISOString().split('T')[0],
        day: {
          maxtemp_c: 30 + Math.floor(Math.random() * 6),
          mintemp_c: 22 + Math.floor(Math.random() * 4),
          condition: { text: i === 0 ? 'Partly cloudy' : ['Sunny', 'Light rain', 'Cloudy'][i % 3] },
          totalprecip_mm: Math.floor(Math.random() * 25)
        }
      });
    }
    
    return forecast;
  }

  async getWeatherAdvice(cropType, district) {
    const weather = await this.getKeralaWeather(district);
    
    const cropSpecificAdvice = {
      'rice': weather.rainfall > 30 ? 'Excellent for paddy transplantation' : 'Ensure adequate water supply for rice fields',
      'banana': weather.temperature > 32 ? 'Provide shade nets and extra irrigation' : 'Ideal growing conditions for banana',
      'vegetables': weather.humidity > 80 ? 'Watch for powdery mildew and leaf spot diseases' : 'Good conditions for vegetable growth',
      'pepper': weather.rainfall > 40 ? 'Monitor for root rot, ensure proper drainage' : 'Suitable for pepper cultivation',
      'coconut': weather.windSpeed > 20 ? 'Strong winds may affect coconut palms' : 'Good conditions for coconut',
      'cardamom': weather.temperature < 25 ? 'Ideal temperature for cardamom in hill stations' : 'Monitor temperature stress',
      'default': 'Weather suitable for general farming activities'
    };

    return {
      ...weather,
      cropAdvice: cropSpecificAdvice[cropType?.toLowerCase()] || cropSpecificAdvice.default,
      recommendations: this.getSeasonalRecommendations(weather)
    };
  }

  getSeasonalRecommendations(weather) {
    const recommendations = [];
    
    if (weather.rainfall > 30) {
      recommendations.push('Consider planting rice and other water-loving crops');
      recommendations.push('Ensure proper drainage to prevent waterlogging');
    }
    
    if (weather.temperature > 30) {
      recommendations.push('Schedule farming activities during early morning/evening');
      recommendations.push('Increase irrigation frequency for all crops');
    }
    
    if (weather.humidity > 80) {
      recommendations.push('Apply organic fungicides as preventive measure');
      recommendations.push('Ensure good air circulation around plants');
    }
    
    return recommendations;
  }

  // Kerala district weather
  async getDistrictWeather(district) {
    const keralDistricts = [
      'thiruvananthapuram', 'kollam', 'pathanamthitta', 'alappuzha',
      'kottayam', 'idukki', 'ernakulam', 'thrissur', 'palakkad',
      'malappuram', 'kozhikode', 'wayanad', 'kannur', 'kasaragod'
    ];
    
    const normalizedDistrict = district.toLowerCase();
    if (!keralDistricts.includes(normalizedDistrict)) {
      return await this.getKeralaWeather('thrissur'); // Default to Thrissur
    }
    
    return await this.getKeralaWeather(normalizedDistrict);
  }
}

export default new WeatherService();
