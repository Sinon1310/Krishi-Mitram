import express from 'express';
import { storage } from '../utils/storage.js';

const router = express.Router();

// Detect language of query
const detectLanguage = (text) => {
  const malayalamRegex = /[\u0D00-\u0D7F]/;
  return malayalamRegex.test(text) ? 'malayalam' : 'english';
};

// Mock AI response based on keywords
const getAIResponse = (question) => {
  const lowerQuestion = question.toLowerCase();
  const language = detectLanguage(question);
  
  // Save query to storage
  storage.saveQuery({
    question,
    language,
    responseGenerated: true
  });

  // Malayalam Responses
  if (language === 'malayalam') {
    if (lowerQuestion.includes('വാഴ') || lowerQuestion.includes('പുള്ളി')) {
      return `വാഴയില പുള്ളി രോഗത്തിന്:\n\n🌱 **ചികിത്സ**: മැൺകോസെബ് 2 ഗ്രാം/ലിറ്റർ വെള്ളത്തിൽ കലക്കി തളിക്കുക\n🦠 **രോഗം**: ഇലപ്പുള്ളി രോഗം\n💧 **തടയൽ**: ഈർപ്പം കൂടിയ പ്രദേശങ്ങൾ ഒഴിവാക്കുക\n📅 **സീസൺ**: മഴക്കാലത്ത് രോഗം കൂടുതൽ\n\nവിശദമായി അറിയാൻ രോഗം ബാധിച്ച ചിത്രം അപ്ലോഡ് ചെയ്യുക.`;
    }
    
    if (lowerQuestion.includes('നെല്ല്') || lowerQuestion.includes('വിള')) {
      return `നെല്ല് കൃഷിയിൽ:\n\n🌱 **വിത്ത് വിതയ്ക്കൽ**: ഏപ്രിൽ-മെയ്, സെപ്റ്റംബർ-ഒക്ടോബർ\n🦠 **പ്രധാന രോഗങ്ങൾ**: ബ്ലാസ്റ്റ്, ബ്രൗൺ സ്പോട്ട്\n💊 **ജൈവ നിയന്ത്രണം**: നീം എണ്ണ സ്പ്രേ\n💧 **ജലസേചനം**: നിരന്തരമായ ജലം\n\nകൃഷി സമ്മേളന കേന്ദ്രത്തിൽ നിന്ന് വിത്ത് ലഭിക്കും.`;
    }
    
    if (lowerQuestion.includes('മഴ') || lowerQuestion.includes('കാലാവസ്ഥ')) {
      return `കേരള കാലാവസ്ഥ:\n\n☀️ **വേനൽ**: ഫെബ്രുവരി-മെയ് (ചൂട്, ഇടിയും മിന്നലും)\n🌧️ **മൺസൺ**: ജൂൺ-സെപ്റ്റംബർ (കനത്ത മഴ)\n🌤️ **ശീതകാലം**: ഒക്ടോബർ-ജനുവരി (സുഖകരമായ കാലാവസ്ഥ)\n\n💡 **സൂചന**: സ്ഥലീയ കൃഷി ഭവനത്തിൽ നിന്ന് കാലാവസ്ഥാ വിവരങ്ങൾ ലഭിക്കുക.`;
    }
  }

  // English keyword patterns
  if (lowerQuestion.includes('banana') || lowerQuestion.includes('വാഴ')) {
    return `For banana cultivation in Kerala:\n\n🌱 **Planting Season**: April-May or August-September\n🦠 **Common Diseases**: Leaf spot, Panama wilt, Bunchy top\n💊 **Treatment**: Mancozeb 2g/liter for leaf spots\n💧 **Water**: Regular irrigation, good drainage\n\nFor specific issues, upload a photo of affected plants.`;
  }
  
  if (lowerQuestion.includes('rice') || lowerQuestion.includes('നെല്ല്')) {
    return `For rice cultivation in Kerala:\n\n🌱 **Varieties**: Jyothi, Uma, MO-16\n🦠 **Common Issues**: Blast, Brown spot, Stem borer\n💊 **Organic Control**: Neem oil spray\n📅 **Season**: Virippu (Apr-May), Mundakan (Sep-Oct)\n\nShare your specific problem for detailed advice.`;
  }
  
  if (lowerQuestion.includes('weather') || lowerQuestion.includes('മഴ')) {
    return `Kerala Weather Advisory:\n\n☀️ **Summer**: Feb-May (Hot, occasional rains)\n🌧️ **Monsoon**: Jun-Sep (Heavy rainfall)\n🌤️ **Winter**: Oct-Jan (Pleasant weather)\n\n💡 **Tip**: Check local Krishi Bhavan for micro-climate advice.`;
  }
  
  if (lowerQuestion.includes('subsidy') || lowerQuestion.includes('സബ്സിഡി')) {
    return `Government Schemes Available:\n\n💰 **PM-KISAN**: ₹6000/year to farmers\n🌱 **Soil Health Card**: Free soil testing\n💧 **Micro Irrigation**: 55% subsidy\n🐄 **Dairy Farming**: Various subsidies\n\nVisit local Krishi Bhavan with land documents.`;
  }

  // Default AI response
  return `I understand you're asking about farming. As KrishiMitram AI, I can help with:\n\n• 🌱 Crop-specific advice (rice, banana, pepper, etc.)\n• 🦠 Disease identification and treatment\n• 🌧️ Weather-based planting guidance\n• 💰 Government subsidy information\n• 📅 Seasonal crop calendars\n\nPlease ask your question in more detail or upload a photo of affected plants for precise advice!`;
};

// AI Chat endpoint
router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const aiResponse = getAIResponse(message);

    res.json({
      success: true,
      response: aiResponse,
      timestamp: new Date().toISOString(),
      language: detectLanguage(message)
    });

  } catch (error) {
    console.error('AI Route Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get query history and stats (for demo dashboard)
router.get('/stats', (req, res) => {
  try {
    const stats = storage.getStats();
    res.json({
      success: true,
      ...stats,
      system: 'KrishiMitram AI - JSON Storage'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get stats'
    });
  }
});

export default router;