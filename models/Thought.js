const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: v => `moment(${v}).format("MMM DD, YYYY [at] hh:mm a")`,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            {
                type: Schema.Typrs.ObjectId,
                ref: 'reaction',
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;