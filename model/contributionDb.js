/**
 * Created by terryshek on 27/1/15.
 */
var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');
var contributionSchema= new mongoose.Schema({
    contributeId:String,
    content:String,
    imgPath:String,
    created_at:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('task', contributionSchema);


