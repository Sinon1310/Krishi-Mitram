import axios from 'axios';

const GEMINI_API_KEY = 'AIzaSyDP1eG5QC_ZD8YGFGSy0YAfzCJodp4EROc';

async function testNewGeminiKey() {
  try {
    console.log('🧪 Testing NEW Gemini API key...');
    
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: "വാഴയിൽ പുള്ളി രോഗം എങ്ങനെ ചികിത്സിക്കാം? Give detailed advice in Malayalam for Kerala farmers."
              }
            ]
          }
        ]
      }
    );

    console.log('✅ NEW Gemini API Key Works!');
    console.log('📝 Malayalam Response:');
    console.log(response.data.candidates[0].content.parts[0].text);
    
    return true;
    
  } catch (error) {
    console.error('❌ NEW Gemini API Test Failed:');
    if (error.response?.status === 429) {
      console.log('💸 Quota exceeded - need to check billing/limits');
    } else if (error.response?.status === 401) {
      console.log('🔑 Invalid API key');
    } else {
      console.log('Error:', error.response?.data?.error || error.message);
    }
    return false;
  }
}

testNewGeminiKey();
