const express = require('express');
const { body } = require('express-validator');
const {
  getArtists,
  getArtist,
  createArtist,
  updateArtist,
  deleteArtist,
  getFeaturedArtists,
  getArtistsByCategory
} = require('../controllers/artistController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const artistValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Artist name is required'),
  body('origin')
    .trim()
    .notEmpty()
    .withMessage('Artist origin is required'),
  body('flag')
    .trim()
    .notEmpty()
    .withMessage('Country flag is required'),
  body('style')
    .trim()
    .notEmpty()
    .withMessage('Dance style is required'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('achievements')
    .isArray({ min: 1 })
    .withMessage('At least one achievement is required'),
  body('image')
    .trim()
    .notEmpty()
    .withMessage('Artist image is required'),
  body('category')
    .isIn(['bachata', 'dj', 'instructor', 'performer'])
    .withMessage('Invalid artist category')
];

// @route   GET /api/artists
// @desc    Get all artists
// @access  Public
router.get('/', getArtists);

// @route   GET /api/artists/featured
// @desc    Get featured artists
// @access  Public
router.get('/featured', getFeaturedArtists);

// @route   GET /api/artists/category/:category
// @desc    Get artists by category
// @access  Public
router.get('/category/:category', getArtistsByCategory);

// @route   GET /api/artists/:id
// @desc    Get single artist
// @access  Public
router.get('/:id', getArtist);

// @route   POST /api/artists
// @desc    Create new artist
// @access  Private/Admin
router.post('/', protect, admin, artistValidation, createArtist);

// @route   PUT /api/artists/:id
// @desc    Update artist
// @access  Private/Admin
router.put('/:id', protect, admin, artistValidation, updateArtist);

// @route   DELETE /api/artists/:id
// @desc    Delete artist
// @access  Private/Admin
router.delete('/:id', protect, admin, deleteArtist);

module.exports = router;




