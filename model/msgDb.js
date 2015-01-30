/**
 * Created by terryshek on 27/1/15.
 */
var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');
var contactSchema = new mongoose.Schema({
    username: String,
    title:String,
    queryMsg:String,
    responseMsg:String,
    responseTime: String,
    ans_status:{type:Boolean, default:false},
    created_at: String
});

module.exports = mongoose.model('query', contactSchema);
