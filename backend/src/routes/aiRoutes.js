import express from 'express';
import aiService from '../services/aiService.js';
import { storage } from '../utils/storage.js';

const router = express.Router();

// Detect language of query
const detectLanguage = (text) => {
  const malayalamRegex = /[\u0D00-\u0D7F]/;
  return malayalamRegex.test(text) ? 'malayalam' : 'english';
};

// AI Chat endpoint with REAL AI
router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }

    const language = detectLanguage(message);
    console.log('🤖 Processing AI request:', message);

    // Save query to storage
    storage.saveQuery({
      question: message,
      language: language
    });

    // Get REAL AI response
    const aiResponse = await aiService.getAIResponse(message);

    res.json({
      success: true,
      response: aiResponse,
      timestamp: new Date().toISOString(),
      language: language,
      source: 'real-ai'
    });

  } catch (error) {
    console.error('AI Route Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get AI response'
    });
  }
});

// Get query history (for demo)
router.get('/history', (req, res) => {
  try {
    const queries = storage.getQueries();
    res.json({
      success: true,
      queries,
      count: queries.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get history'
    });
  }
});

// Get stats
router.get('/stats', (req, res) => {
  try {
    const queries = storage.getQueries();
    const stats = {
      totalQueries: queries.length,
      malayalamQueries: queries.filter(q => q.language === 'malayalam').length,
      englishQueries: queries.filter(q => q.language === 'english').length,
      recentQueries: queries.slice(-5)
    };
    
    res.json({
      success: true,
      ...stats,
      system: 'KrishiMitram AI - Real AI Integration',
      aiProvider: process.env.OPENAI_API_KEY ? 'OpenAI' : 
                 process.env.GEMINI_API_KEY ? 'Gemini' : 'Fallback'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get stats'
    });
  }
});

export default router;
