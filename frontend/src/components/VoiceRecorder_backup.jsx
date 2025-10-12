import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Square, Waves, CheckCircle, X, Volume2, Languages, RefreshCw, AlertCircle } from 'lucide-react';
import { useVoiceRecorder } from '../hooks/useVoiceRecorder';

const VoiceRecorder = ({ onTranscriptComplete, onClose }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('ml-IN'); // Default to Malayalam
  const [showLanguageHelp, setShowLanguageHelp] = useState(false);
  const [voiceTips, setVoiceTips] = useState(0);
  
  const { 
    isRecording, 
    transcript, 
    isSupported, 
    startRecording, 
    stopRecording, 
    resetTranscript,
    confidence,
    interimTranscript 
  } = useVoiceRecorder(selectedLanguage);

  const languages = [
    { code: 'ml-IN', name: 'മലയാളം', flag: '🇮🇳', example: 'നെല്ല് കൃഷിയെ കുറിച്ച് ചോദിക്കുക' },
    { code: 'en-IN', name: 'English (India)', flag: '🇮🇳', example: 'Ask about rice farming' },
    { code: 'hi-IN', name: 'हिंदी', flag: '🇮🇳', example: 'धान की खेती के बारे में पूछें' },
    { code: 'ta-IN', name: 'தமிழ்', flag: '🇮🇳', example: 'நெல் சாகுபடி பற்றி கேளுங்கள்' }
  ];

  const farmingVoiceTips = [
    {
      ml: 'വ്യക്തമായി സംസാരിക്കുക - "വാഴയുടെ ഇല പുള്ളി രോഗം എങ്ങനെ ചികിത്സിക്കാം?"',
      en: 'Speak clearly - "How to treat banana leaf spot disease?"'
    },
    {
      ml: 'കാലാവസ്ഥയെ കുറിച്ച് ചോദിക്കുക - "ഇന്നത്തെ കാലാവസ്ഥ എങ്ങനെയാണ്?"',
      en: 'Ask about weather - "What is today\'s weather condition?"'
    },
    {
      ml: 'സർകാർ പദ്ധതികളെ കുറിച്ച് അറിയുക - "കർഷകർക്കുള്ള സബ്സിഡി എന്താണ്?"',
      en: 'Learn about schemes - "What subsidies are available for farmers?"'
    },
    {
      ml: 'വിത്ത് തിരഞ്ഞെടുപ്പ് - "ഈ സീസണിൽ ഏത് വിത്ത് നടാം?"',
      en: 'Seed selection - "Which seeds should I plant this season?"'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setVoiceTips((prev) => (prev + 1) % farmingVoiceTips.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleStartRecording = () => {
    resetTranscript();
    startRecording();
  };

  const handleStopRecording = () => {
    stopRecording();
  };

  const handleUseTranscript = () => {
    if (transcript.trim()) {
      onTranscriptComplete(transcript);
      onClose();
    }
  };

  const handleCancel = () => {
    resetTranscript();
    onClose();
  };

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    resetTranscript();
  };

  if (!isSupported) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-6 max-w-md w-full"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Voice Feature Not Available
            </h3>
            <p className="text-gray-600 mb-4">
              Your browser doesn't support voice recognition. Please use a modern browser like Chrome or Edge.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">KrishiMitram Voice Assistant</h3>
                <p className="text-green-100 text-sm">Speak your farming questions</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Language Selection */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Languages className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Select Language:</span>
            </div>
            <button
              onClick={() => setShowLanguageHelp(!showLanguageHelp)}
              className="text-xs text-green-600 hover:text-green-700"
            >
              Need help?
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`p-3 rounded-lg text-left transition-all ${
                  selectedLanguage === lang.code
                    ? 'bg-green-100 border-2 border-green-500 text-green-800'
                    : 'bg-white border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{lang.flag}</span>
                  <div>
                    <div className="font-medium text-sm">{lang.name}</div>
                    <div className="text-xs text-gray-500 truncate">{lang.example}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {showLanguageHelp && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200"
            >
              <div className="text-sm text-blue-800">
                <strong>Voice Tips for Farmers:</strong>
                <ul className="mt-2 space-y-1 text-xs">
                  <li>• Speak slowly and clearly in your chosen language</li>
                  <li>• Use farming terms like "കൃഷി" (farming), "രോഗം" (disease), etc.</li>
                  <li>• Ask about crops, weather, diseases, or government schemes</li>
                  <li>• Try: "വാഴയുടെ ഇല പുള്ളി രോഗം എങ്ങനെ ചികിത്സിക്കാം?"</li>
                </ul>
              </div>
            </motion.div>
          )}
        </div>

        {/* Voice Recording Area */}
        <div className="p-6">
          {/* Current Tip */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <Volume2 className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Try saying:</span>
            </div>
            <motion.div
              key={voiceTips}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-1"
            >
              <p className="text-sm text-gray-800 font-medium">
                {selectedLanguage === 'ml-IN' 
                  ? farmingVoiceTips[voiceTips].ml 
                  : farmingVoiceTips[voiceTips].en}
              </p>
            </motion.div>
          </div>

          {/* Recording Controls */}
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <motion.button
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-lg transition-all ${
                  isRecording 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-green-500 hover:bg-green-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={isRecording ? { scale: [1, 1.1, 1] } : {}}
                transition={isRecording ? { duration: 1, repeat: Infinity } : {}}
              >
                {isRecording ? (
                  <Square className="w-8 h-8" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </motion.button>
              
              {isRecording && (
                <motion.div
                  className="absolute -inset-2 border-4 border-red-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </div>
            
            <p className="mt-3 text-sm text-gray-600">
              {isRecording 
                ? `Recording in ${languages.find(l => l.code === selectedLanguage)?.name}...` 
                : `Tap to start recording in ${languages.find(l => l.code === selectedLanguage)?.name}`}
            </p>

            {isRecording && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 flex items-center justify-center space-x-1"
              >
                <Waves className="w-4 h-4 text-green-500" />
                <span className="text-xs text-gray-500">Listening...</span>
              </motion.div>
            )}
          </div>

          {/* Transcript Display */}
          <AnimatePresence>
            {(transcript || interimTranscript) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Your Question:</span>
                    {confidence && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        confidence > 0.8 
                          ? 'bg-green-100 text-green-700' 
                          : confidence > 0.6 
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                      }`}>
                        {Math.round(confidence * 100)}% confidence
                      </span>
                    )}
                  </div>
                  <p className="text-gray-800 leading-relaxed">
                    {transcript}
                    {interimTranscript && (
                      <span className="text-gray-500 italic">{interimTranscript}</span>
                    )}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
            
            {transcript && (
              <button
                onClick={resetTranscript}
                className="px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            )}
            
            <button
              onClick={handleUseTranscript}
              disabled={!transcript.trim()}
              className="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Ask KrishiMitram</span>
            </button>
          </div>

          {/* Privacy Notice */}
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">
              🔒 <strong>Privacy:</strong> Your voice is processed locally in your browser. No audio data is stored or transmitted to our servers.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
            <p className="text-gray-600 text-sm mb-4">
              Your browser doesn't support voice recording. Please use Chrome or Edge for the best experience.
            </p>
            <button
              onClick={onClose}
              className="bg-green-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-600 transition-colors"
            >
              Okay
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl max-w-md w-full"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-green-800 flex items-center space-x-2">
            <Mic className="w-5 h-5" />
            <span>Voice Message</span>
          </h2>
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isRecording && !transcript && (
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Mic className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Speak Your Question
                </h3>
                <p className="text-gray-600 text-sm">
                  Speak clearly in Malayalam or English about your farming problem
                </p>
              </div>
              <button
                onClick={handleStartRecording}
                className="bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors flex items-center space-x-2 mx-auto"
              >
                <Mic className="w-5 h-5" />
                <span>Start Speaking</span>
              </button>
            </div>
          )}

          {isRecording && (
            <div className="text-center space-y-6">
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto"
                >
                  <Waves className="w-8 h-8 text-white" />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-32 h-32 border-4 border-red-300 rounded-full"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Listening...
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Speak now. We're listening in Malayalam.
                </p>
                <p className="text-red-500 text-sm font-medium">
                  • Recording in progress
                </p>
              </div>

              <button
                onClick={handleStopRecording}
                className="bg-red-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-600 transition-colors flex items-center space-x-2 mx-auto"
              >
                <Square className="w-5 h-5" />
                <span>Stop Recording</span>
              </button>
            </div>
          )}

          {transcript && !isRecording && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Transcript Ready
                </h3>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-gray-700 text-sm">
                  {transcript || "No speech detected..."}
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleStartRecording}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Record Again
                </button>
                <button
                  onClick={handleUseTranscript}
                  disabled={!transcript.trim()}
                  className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Use This Text
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="px-6 pb-4">
          <p className="text-xs text-gray-500 text-center">
            💡 Speak clearly in Malayalam or English • Works best in Chrome/Edge
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default VoiceRecorder;
