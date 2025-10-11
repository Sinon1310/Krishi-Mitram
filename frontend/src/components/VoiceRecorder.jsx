import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Square, Waves, CheckCircle, X } from 'lucide-react';
import { useVoiceRecorder } from '../hooks/useVoiceRecorder';

const VoiceRecorder = ({ onTranscriptComplete, onClose }) => {
  const { 
    isRecording, 
    transcript, 
    isSupported, 
    startRecording, 
    stopRecording, 
    resetTranscript 
  } = useVoiceRecorder();

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
    }
  };

  const handleCancel = () => {
    resetTranscript();
    onClose();
  };

  if (!isSupported) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-6 max-w-sm w-full"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Voice Not Supported
            </h3>
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
