import axios from 'axios';

const API_BASE_URL = 'http://localhost:3003/api/v1/ai';

export const aiService = {
  async sendMessage(message) {
    try {
      console.log('🚀 Sending message to AI:', message);
      const response = await axios.post(`${API_BASE_URL}/chat`, {
        message
      }, {
        timeout: 30000, // 30 second timeout
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('✅ AI Response received:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ AI Service Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to get AI response');
    }
  }
};