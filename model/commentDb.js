/**
 * Created by terryshek on 27/1/15.
 */
var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');
var postSchema= new mongoose.Schema({
    category:String,
    type:String,
    postId:Number,
    commentBy:String,
    comment:String,
    created_at:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('comment', postSchema);


