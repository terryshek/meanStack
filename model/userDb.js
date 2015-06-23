var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var UserSchema = new mongoose.Schema({
    username: String,
    gender:Boolean,
    fullname: String,
    phone:{type:Number, default:23456789},
    email:String,
    contact:Number,
    password: String,
    location:String,
    imageUrl:{type:String, default:"img/defaultImg.jpg"},
    role:{type:Boolean,default:false},
    created_at: { type : Date },
    post : [{type : mongoose.Schema.Types.ObjectId, ref : 'postMsg'}],
    updated_at: { type: Date, default: Date.now }
});
// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password, dbPassword) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('account', UserSchema);
