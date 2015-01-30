var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');
var ProductSchema = new mongoose.Schema({
    username: String,
    production:String,
    created_at: { type : Date },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('product', ProductSchema);
