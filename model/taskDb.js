/**
 * Created by terryshek on 27/1/15.
 */
var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');
var taskSchema= new mongoose.Schema({
    category:String,
    type:String,
    postId:String,
    personId:String,
    finish:{type:Boolean,default:false},
    created_at:{ type: Date, default: Date.now }
})
module.exports = mongoose.model('task', taskSchema);


