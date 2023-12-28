const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const {Schema, model} = mongoose;
const userSchema = new Schema({
    username:String,
    email:String,
    password:String
})

userSchema.plugin(passportLocalMongoose)

const UserModel = model('User', userSchema);

passport.use(UserModel.createStrategy());

passport.serializeUser(UserModel.serializeUser());

passport.deserializeUser(UserModel.deserializeUser());

module.exports = UserModel