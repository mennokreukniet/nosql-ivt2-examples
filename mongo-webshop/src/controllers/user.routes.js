const express = require('express')
const router = express.Router()

const User = require('../models/user.model')

// create a user on a post request
router.post('/', async function(req, res) {
    if (!req.body.name) {
        res.status(400).end()
        return
    }

    const user = new User(req.body)
    
    try {
        // save user
        await user.save()
    
        // reply with success
        res.status(200).send({id: user._id})
    } catch {
        res.status(400).end()
    }
})

// get all users
router.get('/', async function(req, res) {
    const users = await User.find().populate('bought')

    res.status(200).send(users)
})

// get a user
router.get('/:id', async function(req, res) {
    const user = await User.findById(req.params.id).populate('bought')

    res.status(200).send(user)
})

// delete a user on a delete request
router.delete('/:id', async function(req, res) {
    const user = await User.findById(req.params.id)
    await user.delete()

    res.status(200).end()
})

// store that a user bought a product
router.post


module.exports = router