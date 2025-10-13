import axios from 'axios';

// Use production backend as primary, fallback to env var, then localhost
const API_BASE_URL = 'https://krishi-mitram.onrender.com/api/v1/ai';

export const aiService = {
  async sendMessage(message) {
    try {
      console.log('🚀 Sending message to AI:', message);
      console.log('🔗 Using API URL:', API_BASE_URL);
      
      const response = await axios.post(`${API_BASE_URL}/chat`, {
        message
      }, {
        timeout: 45000, // Increased to 45 seconds for cold starts
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('✅ AI Response received:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ AI Service Error Details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: `${API_BASE_URL}/chat`
      });
      
      // Provide more specific error messages
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout - Backend may be starting up, please try again');
      } else if (error.response?.status === 502) {
        throw new Error('Backend is starting up, please wait a moment and try again');
      } else if (error.response?.status >= 500) {
        throw new Error('Server error - please try again in a moment');
      } else {
        throw new Error(error.response?.data?.error || 'Failed to get AI response');
      }
    }
  }
};