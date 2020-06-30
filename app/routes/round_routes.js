const express = require('express')
const passport = require('passport')

const Round = require('../models/round')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// INDEX
// GET /rounds
router.get('/rounds', requireToken, (req, res, next) => {
  Round.find({'owner': req.user.id})
    .then(rounds => {
      return rounds.map(round => round.toObject())
    })
    .then(rounds => res.status(200).json({ rounds: rounds }))
    .catch(next)
})

// SHOW
// GET /rounds/5a7db6c74d55bc51bdf39793
router.get('/rounds/:id', requireToken, (req, res, next) => {
  Round.findById(req.params.id)
    .then(handle404)
    .then(round => res.status(200).json({ round: round.toObject() }))
    .catch(next)
})

// CREATE
// POST /rounds
router.post('/rounds', requireToken, (req, res, next) => {
  req.body.round.owner = req.user.id

  Round.create(req.body.round)
    .then(round => {
      res.status(201).json({ round: round.toObject() })
    })
    .catch(next)
})

// UPDATE
// PATCH /rounds/5a7db6c74d55bc51bdf39793
router.patch('/rounds/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.round.owner

  Round.findById(req.params.id)
    .then(handle404)
    .then(round => {
      requireOwnership(req, round)
      return round.updateOne(req.body.round)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY
// DELETE /rounds/5a7db6c74d55bc51bdf39793
router.delete('/rounds/:id', requireToken, (req, res, next) => {
  Round.findById(req.params.id)
    .then(handle404)
    .then(round => {
      requireOwnership(req, round)
      round.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
