/**
 * Created by terryshek on 27/1/15.
 */
var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');
var postSchema= new mongoose.Schema({
    usernameId: String,
    title:String,
    description:String,
    imageUrl:{type:String, default:"img/defaultImg.jpg"},
    created_at:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('postMsg', postSchema);


