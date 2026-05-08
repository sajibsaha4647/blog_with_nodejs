const { model, Schema } = require("mongoose");
// const Profile = require('./ProfileModel')
// const Post = require('./postModel')

const profileSchema = new Schema({
     name: {
      type: String,
      required: true,
      maxlength: 30,
      minlength: 2,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
    title:{
        type:String,
    },
     bio:{
        bio:String,
    },
    profile_pic:{
        type:String
    },
    links:{
        website:String,
        facebook:String,
        github:String
    },
    posts:[
        {
            type:Schema.Types.ObjectId,
            ref:'Post'
        }
    ],
    bookMarks:[
        {
            type:Schema.Types.ObjectId,
            ref:'Post'
        }
    ]
    


},{
     timestamps: true ,
});

const ProfileModel = model('Profile',profileSchema)

module.exports = ProfileModel