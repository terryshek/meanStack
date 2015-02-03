var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');
var ProductSchema = new mongoose.Schema({
    username: String,
    product_name:String,
    product_description:String,
    productImg:{type:String,default:"/img/undefined.png"},
    product_quanity:Number,
    purchaseStatus:{type:String,default:"pending"},
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('product', ProductSchema);
