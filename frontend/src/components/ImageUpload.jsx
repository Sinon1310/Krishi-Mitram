import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Camera, CheckCircle, AlertCircle } from 'lucide-react';

const ImageUpload = ({ onAnalysisComplete, onClose }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage({
          file,
          preview: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    
    try {
      const formData = new FormData();
      formData.append('plantImage', selectedImage.file);

      const response = await fetch('/api/v1/images/analyze', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      if (result.success) {
        setAnalysisResult(result.analysis);
        if (onAnalysisComplete) {
          onAnalysisComplete(result.analysis, selectedImage.preview);
        }
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-green-800 flex items-center space-x-2">
            <Camera className="w-5 h-5" />
            <span>Upload Plant Image</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!selectedImage && !analysisResult && (
            <div
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Upload Plant Photo
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Drag & drop or click to upload image of diseased plant
              </p>
              <button className="bg-green-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-600 transition-colors">
                Choose Image
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => handleFileSelect(e.target.files[0])}
                accept="image/*"
                className="hidden"
              />
            </div>
          )}

          {selectedImage && !analysisResult && (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={selectedImage.preview}
                  alt="Selected plant"
                  className="w-full h-64 object-cover rounded-2xl"
                />
                <button
                  onClick={handleReset}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleReset}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Choose Different
                </button>
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Analyze Image</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {analysisResult && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                <div className="flex items-center space-x-2 text-green-700 mb-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Analysis Complete</span>
                </div>
                <p className="text-green-600 text-sm">
                  Confidence: {analysisResult.confidence}%
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Detected Disease</h4>
                  <p className="text-gray-900">{analysisResult.disease}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Recommended Treatment</h4>
                  <p className="text-gray-900">{analysisResult.treatment}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Organic Alternative</h4>
                  <p className="text-gray-900">{analysisResult.organicTreatment}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Prevention Tips</h4>
                  <p className="text-gray-900">{analysisResult.prevention}</p>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleReset}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Analyze Another
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ImageUpload;