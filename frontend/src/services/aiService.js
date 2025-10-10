import axios from 'axios';

const API_BASE_URL = '/api/v1/ai';

export const aiService = {
  async sendMessage(message) {
    try {
      const response = await axios.post(`${API_BASE_URL}/chat`, {
        message
      });
      
      return response.data;
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to get AI response');
    }
  }
};