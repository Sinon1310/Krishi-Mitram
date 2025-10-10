import express from 'express';
import multer from 'multer';
import path from 'path';
import { storage } from '../utils/storage.js';

const router = express.Router();

// Configure multer for image uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Mock AI plant disease detection
const analyzePlantDisease = (imageInfo) => {
  const diseases = [
    {
      name: "Banana Leaf Spot",
      confidence: 92,
      treatment: "Apply Mancozeb 2g/liter of water. Remove affected leaves.",
      organic: "Neem oil spray every 15 days",
      prevention: "Ensure proper spacing and avoid waterlogging"
    },
    {
      name: "Rice Blast", 
      confidence: 88,
      treatment: "Carbendazim 1g/liter. Avoid excessive nitrogen.",
      organic: "Trichoderma application",
      prevention: "Use resistant varieties like Jyothi"
    },
    {
      name: "Pepper Phytophthora",
      confidence: 85,
      treatment: "Metalaxyl 2g/liter. Improve drainage.",
      organic: "Bordeaux mixture spray",
      prevention: "Avoid overhead irrigation"
    }
  ];

  // Mock AI analysis - in real app, this would use TensorFlow/PyTorch
  const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
  
  return {
    disease: randomDisease.name,
    confidence: randomDisease.confidence,
    treatment: randomDisease.treatment,
    organicTreatment: randomDisease.organic,
    prevention: randomDisease.prevention,
    recommendation: "Consult local Krishi Bhavan for confirmation",
    timestamp: new Date().toISOString()
  };
};

// Image upload and analysis endpoint
router.post('/analyze', upload.single('plantImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No image file uploaded'
      });
    }

    console.log('📸 Image uploaded:', req.file.originalname);

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const analysisResult = analyzePlantDisease(req.file);

    // Save to storage
    storage.saveQuery({
      question: `[IMAGE] ${req.file.originalname}`,
      language: 'image',
      analysis: analysisResult
    });

    res.json({
      success: true,
      message: 'Image analyzed successfully',
      analysis: analysisResult,
      imageInfo: {
        filename: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });

  } catch (error) {
    console.error('Image analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze image'
    });
  }
});

// Get recent image analyses
router.get('/recent-analyses', (req, res) => {
  try {
    const queries = storage.getQueries();
    const imageAnalyses = queries.filter(q => q.language === 'image').slice(-10);
    
    res.json({
      success: true,
      analyses: imageAnalyses,
      count: imageAnalyses.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get analyses'
    });
  }
});

export default router;
