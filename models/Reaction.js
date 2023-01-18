const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
          type: Schema.Types.ObjectId,
          default: () => new Types.ObjectId(),
        },
        responseBody: {
          type: String,
          required: true,
          maxlength: 280,
        },
        username: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
          get: v => `moment(${v}).format("MMM DD, YYYY [at] hh:mm a")`,
        },
      },
      {
        toJSON: {
          getters: true,
        },
        id: false,
      }
);

module.exports = reactionSchema;