const express = require('express');
const router = express.Router();
const Culture = require('../models/Culture');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const auth = require('../middleware/auth');
const { cloudinary } = require('../cloudinary/cloudinary');

// Ensure culture videos directory exists (temporary upload staging only)
const cultureVideoDir = path.join(__dirname, '..', 'public', 'cultural');
fs.mkdirSync(cultureVideoDir, { recursive: true });

// Multer storage for culture videos (temporary local cache before Cloudinary upload)
const cultureVideoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, cultureVideoDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.mp4';
    cb(null, `culture-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  }
});

// Multer instance for short culture videos (max ~10MB)
const uploadCultureVideo = multer({
  storage: cultureVideoStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('video/')) {
      return cb(new Error('Only video files are allowed'));
    }
    cb(null, true);
  }
});

const handleVideoUpload = (req, res, next) => {
  uploadCultureVideo.single('video')(req, res, (error) => {
    if (!error) {
      return next();
    }

    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'Video must be less than 10MB.' });
      }

      return res.status(400).json({ message: error.message });
    }

    return res.status(400).json({ message: error.message || 'Video upload failed.' });
  });
};

// Get all cultures
router.get('/', async (req, res) => {
  try {
    const cultures = await Culture.find().sort({ createdAt: -1 }).populate('userId', 'name');
    res.json(cultures);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get cultures by country
router.get('/country/:country', async (req, res) => {
  try {
    const cultures = await Culture.find({ 
      country: { $regex: req.params.country, $options: 'i' } 
    }).populate('userId', 'name');
    res.json(cultures);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get cultures by region
router.get('/region/:region', async (req, res) => {
  try {
    const cultures = await Culture.find({ region: req.params.region }).populate('userId', 'name');
    res.json(cultures);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get cultures by category
router.get('/category/:category', async (req, res) => {
  try {
    const cultures = await Culture.find({ category: req.params.category }).populate('userId', 'name');
    res.json(cultures);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's own cultures
router.get('/user/my-posts/:userId', async (req, res) => {
  try {
    const cultures = await Culture.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(cultures);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single culture by ID - MUST BE LAST
router.get('/:id', async (req, res) => {
  try {
    const culture = await Culture.findById(req.params.id).populate('userId', 'name email');
    if (!culture) return res.status(404).json({ message: 'Culture not found' });
    res.json(culture);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new culture (with optional short video upload and authentication)
router.post('/', auth, handleVideoUpload, async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: 'Authentication required to create culture' });
  }

  let videoUrl = '';
  let videoPublicId = '';

  if (req.file) {
    try {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'video',
        folder: 'cultures',
        use_filename: true,
        unique_filename: true,
        overwrite: false
      });

      videoUrl = uploadResult.secure_url;
      videoPublicId = uploadResult.public_id;

      // Remove local file after upload
      fs.unlink(req.file.path, (err) => {
        if (err) console.warn('Failed to remove temporary video file', err);
      });
    } catch (err) {
      return res.status(500).json({ message: 'Could not upload video to Cloudinary', error: err.message });
    }
  }

  const culture = new Culture({
    country: req.body.country,
    region: req.body.region,
    category: req.body.category,
    title: req.body.title,
    description: req.body.description,
    story: req.body.story,
    image: req.body.image || 'https://via.placeholder.com/300',
    videoUrl,
    videoPublicId,
    userId,
    createdBy: req.body.createdBy || 'Anonymous'
  });

  try {
    const newCulture = await culture.save();
    const populatedCulture = await newCulture.populate('userId', 'name');
    res.status(201).json(populatedCulture);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update culture (only by owner)
router.put('/:id', auth, async (req, res) => {
  try {
    const culture = await Culture.findById(req.params.id);
    if (!culture) return res.status(404).json({ message: 'Culture not found' });

    const userId = req.userId;
    
    // Check if user is the owner
    if (culture.userId && culture.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this culture' });
    }

    if (req.body.country) culture.country = req.body.country;
    if (req.body.region) culture.region = req.body.region;
    if (req.body.category) culture.category = req.body.category;
    if (req.body.title) culture.title = req.body.title;
    if (req.body.description) culture.description = req.body.description;
    if (req.body.story) culture.story = req.body.story;
    if (req.body.image) culture.image = req.body.image;

    const updatedCulture = await culture.save();
    res.json(updatedCulture);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete culture (only by owner)
router.delete('/:id', auth, async (req, res) => {
  try {
    const culture = await Culture.findById(req.params.id);
    if (!culture) return res.status(404).json({ message: 'Culture not found' });

    const userId = req.userId;
    
    // Check if user is the owner
    if (culture.userId && culture.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this culture' });
    }

    await Culture.deleteOne({ _id: req.params.id });
    res.json({ message: 'Culture deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Like a culture
router.put('/:id/like', async (req, res) => {
  try {
    const culture = await Culture.findById(req.params.id);
    if (!culture) return res.status(404).json({ message: 'Culture not found' });

    culture.likes = (culture.likes || 0) + 1;
    const updatedCulture = await culture.save();
    res.json(updatedCulture);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;