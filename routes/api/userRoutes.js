const router = require('express').Router();
const { User, Thought } = require('../../models');

// find all
router.get('/users', (req, res) => {
    try {
        User.find()
        .then((users) => res.status(200).json(users))
    } catch (error) {
        res.status(500).json(error)
    }
});

// find by id
router.get('/users/:id', (req, res) => {
    try {
        User.findOne({ _id: req.params.id })
        .populate('thoughts')
        .populate('friends')
        .then((user) => res.status(200).json(user))
    } catch (error) {
        res.status(500).json(error)
    }
});

// create user
router.post('/users', (req, res) => {
    try {
        User.create(req.body)
        .then((user) => res.status(200).json(user))
    } catch (error) {
        res.status(500).json(error)
    }
});

// update user
router.put('/users/:id', (req, res) => {
    try {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) => res.status(200).json(user))
    } catch (error) {
        res.status(500).json(error)
    }
});
    
// del user
router.delete('/users/:id', (req, res) => {
    try {
        User.findOneAndDelete({ _id: req.params.id })
        .then((user) => 
        !user
        ? res.status(404).json({ message: 'No user found, please try again' })
        : Thought.deleteMany({ _id: { $in: [user.thoughts] }}))
        .then(res.status(200).json({ message: 'User deleted!' }))
    } catch (error) {
        res.status(500).json(error)
    }
})

// add new friend
router.post('/users/:id/friends/:friendId', (req, res) => {
    try {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        )
        .then((user) => res.status(200).json(user))
            
    } catch (error) {
        res.status(500).json(error)
    }
})

// del friend
router.delete('/users/:id/friends/:friendId', (req, res) => {
    try {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
        .then((user) => res.status(200).json(user))
            
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;