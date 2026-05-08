const { model, Schema } = require("mongoose");
// const Post = require('./postModel')
// const User = require('./UserModel')

const commentSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    replies: [
      {
        body: {
          type: String,
          required: true,
        },
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        createAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  { timestamps: true },
);

const CommnetModel = model('Comment',commentSchema)

module.exports = CommnetModel
