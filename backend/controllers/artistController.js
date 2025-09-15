const Artist = require('../models/Artist');
const { validationResult } = require('express-validator');

// @desc    Get all artists
// @route   GET /api/artists
// @access  Public
const getArtists = async (req, res) => {
  try {
    const { category } = req.query;
    
    let query = { isActive: true };
    if (category) {
      query.category = category;
    }

    const artists = await Artist.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: artists.length,
      data: artists
    });
  } catch (error) {
    console.error('Get artists error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single artist
// @route   GET /api/artists/:id
// @access  Public
const getArtist = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: 'Artist not found'
      });
    }

    res.json({
      success: true,
      data: artist
    });
  } catch (error) {
    console.error('Get artist error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create new artist
// @route   POST /api/artists
// @access  Private/Admin
const createArtist = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const artist = await Artist.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Artist created successfully',
      data: artist
    });
  } catch (error) {
    console.error('Create artist error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update artist
// @route   PUT /api/artists/:id
// @access  Private/Admin
const updateArtist = async (req, res) => {
  try {
    const artist = await Artist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: 'Artist not found'
      });
    }

    res.json({
      success: true,
      message: 'Artist updated successfully',
      data: artist
    });
  } catch (error) {
    console.error('Update artist error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete artist
// @route   DELETE /api/artists/:id
// @access  Private/Admin
const deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.id);

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: 'Artist not found'
      });
    }

    res.json({
      success: true,
      message: 'Artist deleted successfully'
    });
  } catch (error) {
    console.error('Delete artist error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get featured artists
// @route   GET /api/artists/featured
// @access  Public
const getFeaturedArtists = async (req, res) => {
  try {
    const artists = await Artist.find({ 
      isActive: true, 
      isFeatured: true 
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: artists.length,
      data: artists
    });
  } catch (error) {
    console.error('Get featured artists error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get artists by category
// @route   GET /api/artists/category/:category
// @access  Public
const getArtistsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    const artists = await Artist.find({ 
      isActive: true, 
      category: category 
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: artists.length,
      data: artists
    });
  } catch (error) {
    console.error('Get artists by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getArtists,
  getArtist,
  createArtist,
  updateArtist,
  deleteArtist,
  getFeaturedArtists,
  getArtistsByCategory
};




