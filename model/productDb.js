var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');
var ProductSchema = new mongoose.Schema({
    username: String,
    product_name:String,
    product_description:String,
    product_quanity:Number,
    created_at: { type : Date },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('product', ProductSchema);
