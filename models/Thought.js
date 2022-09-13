// username, email, thoughts, friends 
const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
    body: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
}, 
{
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
    id: false,
});

// CreatedAt can be set with timestamps in to the JSON section
// Id is created by mongo out of the box
const thoughtSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        // not recommended to do, instead try make a foreign key (username)
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
    },
    timestamps: true,
    id: false,
}
);

const Thought = model('thought', thoughtSchema);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
});

module.exports = Thought;
