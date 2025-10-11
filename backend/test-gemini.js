import axios from 'axios';

const GEMINI_API_KEY = 'AIzaSyCmndn8HcD3SRaK6Xv30KSejOSneWQcmS0';

async function testGeminiAPI() {
  try {
    console.log('🔍 Checking available Gemini models...');
    
    const modelsResponse = await axios.get(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`
    );
    
    console.log('📋 Available models:');
    modelsResponse.data.models.forEach(model => {
      if (model.name.includes('gemini')) {
        console.log(`  - ${model.name} (${model.displayName})`);
      }
    });
    
    // Try with the first available gemini model
    const firstGeminiModel = modelsResponse.data.models.find(m => 
      m.name.includes('gemini') && m.supportedGenerationMethods?.includes('generateContent')
    );
    
    if (firstGeminiModel) {
      console.log(`\n🧪 Testing with model: ${firstGeminiModel.name}`);
      
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/${firstGeminiModel.name}:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: "Hello, can you help farmers with rice cultivation in Kerala?"
                }
              ]
            }
          ]
        }
      );

      console.log('✅ Gemini API Test Successful!');
      console.log('📝 Response:', response.data.candidates[0].content.parts[0].text.substring(0, 200) + '...');
      
      return firstGeminiModel.name;
    }
    
  } catch (error) {
    console.error('❌ Gemini API Test Failed:', error.response?.data || error.message);
  }
}

testGeminiAPI();
