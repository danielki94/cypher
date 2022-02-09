const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    
    firstName: {
        type: String,
        required: true,
        max: 20
    },

    lastName: {
        type: String,
        required: true,
        max: 20
    },

    password: {
        type: String,
        required: true,
        min: 6,
    },
    profilePicture: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    description: {
        type: String,
        max: 50
    },
    bio: {
        type: String,
        max: 50
    },
    location: {
        type: String,
        max: 50
    },
    
},
    {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema)