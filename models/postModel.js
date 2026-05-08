const { model, Schema } = require("mongoose");
// const Comment = require('./commentModel')
// const User = require('./UserModel')

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    body: {
      type: String,
      required: true,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tags: {
      type: [String],
      trim: true,
    },
    thumbnail: {
      type: String, // image URL/path 
    },

    readTime: {
      type: Number, // in minutes
      default: 1,
    },

    likes: [{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    dislikes: [{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],

    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true },
);


const PostModel = model('Post',postSchema)

module.exports = PostModel