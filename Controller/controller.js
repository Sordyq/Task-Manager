const passport = require('passport');
const UserModel = require('../Model/user');
const bcrypt = require('bcrypt');


const SignUp = async(req,res)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        return res.json({error: 'field is required'})
    }
    const existingUser = await UserModel.findOne({email})
    if(existingUser){
        return res.json({error: 'User already exist, login to continue'})
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    const newUser = new UserModel({
        email:email,
        username:username,
        password: hashedPassword
    })

    UserModel.register(newUser, password, function(err){
        if(err){
            console.log(err);
        }

        passport.authenticate('local')(req,res, function(err){
            res.json({msg: 'Signed Up Successfully'})
        })
    })
}

const Login = async (req,res)=>{
    const{username, password} = req.body;
    if(!username || !password){
        return res.json({error: 'field is required'})
    }
    const existingUser = await UserModel.findOne({username})
    if(!existingUser){
        return res.json({error: 'user not found, please signup to continue'})
    }
    const passwordMatch = await bcrypt.compare( password, existingUser.password )
    if(!passwordMatch){
        return res.json({error: 'Password is incorrect'})
    }

    const User = new UserModel({
        username,
        password 
    })

    req.login(User, function(err){
        if(err){
            return res.json(err)
        }
        passport.authenticate('local')(req,res, function(){
            return res.json({msg: 'Log In Sucessfully'})
        })
    })  
}

const Logout = async(req,res)=>{
    req.logout(function(err){
        if(err){
            return res.json({err})
        }
        res.json({msg: 'Logout Successfully'})
    })
}

module.exports = {SignUp, Login, Logout}