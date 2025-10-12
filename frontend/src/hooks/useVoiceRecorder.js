import { useState, useRef, useEffect } from 'react';

export const useVoiceRecorder = (language = 'ml-IN') => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [confidence, setConfidence] = useState(null);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      
      const recognition = recognitionRef.current;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 3;
      recognition.lang = language;

      recognition.onstart = () => {
        setIsRecording(true);
        setTranscript('');
        setInterimTranscript('');
        setConfidence(null);
      };

      recognition.onresult = (event) => {
        let finalTranscript = '';
        let currentInterimTranscript = '';
        let highestConfidence = 0;

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const transcriptText = result[0].transcript;
          const confidenceScore = result[0].confidence;

          if (result.isFinal) {
            finalTranscript += transcriptText;
            if (confidenceScore > highestConfidence) {
              highestConfidence = confidenceScore;
            }
          } else {
            currentInterimTranscript += transcriptText;
          }
        }

        if (finalTranscript) {
          setTranscript(finalTranscript);
          setConfidence(highestConfidence);
          setInterimTranscript('');
        } else {
          setInterimTranscript(currentInterimTranscript);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        
        // Provide user-friendly error messages
        if (event.error === 'not-allowed') {
          alert('🎤 Microphone access denied. Please allow microphone access and try again.');
        } else if (event.error === 'no-speech') {
          alert('🔇 No speech detected. Please speak louder or check your microphone.');
        } else if (event.error === 'audio-capture') {
          alert('🎤 Microphone not found. Please check your microphone connection.');
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
        setInterimTranscript('');
      };
    } else {
      setIsSupported(false);
      console.warn('Speech recognition not supported in this browser');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [language]); // Add language as dependency

  // Update language when it changes
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = language;
    }
  }, [language]);

  const startRecording = () => {
    if (recognitionRef.current && !isRecording) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        alert('Failed to start voice recording. Please try again.');
      }
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
    }
  };

  const resetTranscript = () => {
    setTranscript('');
    setInterimTranscript('');
    setConfidence(null);
  };

  return {
    isRecording,
    transcript,
    interimTranscript,
    confidence,
    isSupported,
    startRecording,
    stopRecording,
    resetTranscript
  };
};
