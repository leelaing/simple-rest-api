const express = require('express')
const router = express.Router()
const Sample = require('../models/samples')

// Getting all
router.get('/', async (req, res) => {
  try {
    const samples = await Sample.find()
    res.json(samples)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getSample, (req, res) => {
  res.json(res.sample)
})

// Creating one
router.post('/', async (req, res) => {
  const sample = new Sample({
    // name: req.body.name,
    // subscribedToChannel: req.body.subscribedToChannel
  })
  try {
    const newSample = await sample.save()
    res.status(201).json(newSample)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', getSample, async (req, res) => {
  // if (req.body.name != null) {
  //   res.sample.name = req.body.name
  // }
  // if (req.body.subscribedToChannel != null) {
  //   res.sample.subscribedToChannel = req.body.subscribedToChannel
  // }
  try {
    const updatedSample = await res.sample.save()
    res.json(updatedSample)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getSample, async (req, res) => {
  try {
    await res.sample.remove()
    res.json({ message: 'Deleted Sample' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getSample(req, res, next) {
  let sample
  try {
    sample = await Sample.findById(req.params.id)
    if (sample == null) {
      return res.status(404).json({ message: 'Cannot find sample' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.sample = sample
  next()
}

module.exports = router