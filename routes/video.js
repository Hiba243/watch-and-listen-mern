const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Video = require('../models/Video');

// @route     GET api/videos
// @desc      Get all users videos
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const videos = await Video.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(videos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/videos
// @desc      Add new video
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, videoId, category } = req.body;

    try {
      const newvideo = new Video({
        name,
        videoId,
        category,
        user: req.user.id,
      });

      const video = await newvideo.save();

      res.json(video);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route     PUT api/videos/:id
// @desc      Update video
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const { name, videoId, category } = req.body;

  // Build video object
  const videoFields = {};
  if (name) videoFields.name = name;
  if (videoId) videoFields.videoId = videoId;
  if (category) videoFields.category = category;

  try {
    let video = await Video.findById(req.params.id);

    if (!video) return res.status(404).json({ msg: 'video not found' });

    // Make sure user owns video
    if (video.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    video = await Video.findByIdAndUpdate(
      req.params.id,
      { $set: videoFields },
      { new: true },
    );

    res.json(video);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/videos/:id
// @desc      Delete video
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let video = await Video.findById(req.params.id);

    if (!video) return res.status(404).json({ msg: 'video not found' });

    // Make sure user owns video
    if (video.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Video.findByIdAndRemove(req.params.id);

    res.json({ msg: 'video removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;