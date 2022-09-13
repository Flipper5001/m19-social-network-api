const router = require('express').Router();
const { Thought, User } = require('../../models');

// find all thoughts
router.get('/thoughts', (req, res) => {
    try {
        Thought.find()
        .then((thoughts) => res.status(200).json(thoughts))
    } catch (error) {
        res.status(500).json(error)
    }
});

// find by id
router.get('/thoughts/:id', (req, res) => {
    try {
        Thought.findOne({ _id: req.params.id })
        .populate('reactions')
        .then((thought) => res.status(200).json(thought))
    } catch (error) {
        res.status(500).json(error)
    }
});

// create thought
router.post('/thoughts', async (req, res) => {
    try {
        Thought.create(req.body)
        .then((thought) =>
        !thought
        ? res.status(404)
        : User.findOneAndUpdate(
            { username: req.body.username },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
        ))
        res.status(200).json({message: 'Thought has been created!'})
            
    } catch (error) {
        res.status(500).json(error)
    }
});
    
// update thought
router.put('/thoughts/:id', (req, res) => {
    try {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) => res.status(200).json(thought))
    } catch (error) {
        res.status(500).json(error)
    }
});
    
// del thought
router.delete('/thoughts/:id', (req, res) => {
    try {
        Thought.findOneAndDelete({ _id: req.params.id })
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: 'No thought found, please try again' })
        : User.findOneAndUpdate(
            { thoughts: req.params.id },
            { $pull: { thoughts: req.params.id } },
            { new: true }
        ))
        res.status(200).json({ message: 'Thought has been deleted!' })
            
    } catch (error) {
        res.status(500).json(error)
    }
});

// add new reaction
router.post('/thoughts/:id/reactions', (req, res) => {
    try {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: { reactions: req.body } },
            { new: true }
        )
        .then((user) => res.status(200).json(user))
            
    } catch (error) {
        res.status(500).json(error)
    }
})

// del reaction
router.delete('/thoughts/:id/reactions/:reactionId', (req, res) => {
    try {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { reactions: {_id: req.params.reactionId }} },
            { new: true }
        )
        .then((user) => res.status(200).json(user))
            
    } catch (error) {
        res.status(500).json(error)
    }
})
    
module.exports = router;
    