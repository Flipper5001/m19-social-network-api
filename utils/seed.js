const connection = require('../config/connection');
const { Thought, User } = require('../models');
connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected to the Database')

    await User.deleteMany({});

    await Thought.deleteMany({});

    await User.create({
        username: "Marry",
        email: "marry@mail.com",
        thoughts: [],
        friends: []
    });

    await User.create({
        username: "Larry",
        email: "larry@mail.com",
        thoughts: [],
        friends: []
    });

    await Thought.create({
        text: "This is a test of thoughts",
        username: "Larry",
        reactions: [
            {
                body: "This is a test of reactions",
                username: "Marry",
            }
        ]
    }).then((thought) =>
        !thought
        ? res.status(404)
        : User.findOneAndUpdate(
            { username: thought.username },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
    ))

    console.info('Examples seeded!');
    process.exit(0);
});
