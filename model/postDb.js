/**
 * Created by terryshek on 27/1/15.
 */
var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');
var postSchema= new mongoose.Schema({
    id: Number,
    title: String,
    permalink: String,
    content: String,
    excerpt: String,
    date: { type: Date, default: Date.now },
    author: String,
    categories: [],
    tags: []
});

module.exports = mongoose.model('postMsg', postSchema);


