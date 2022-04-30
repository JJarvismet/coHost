const User = require('../models/user');
const asyncHandler = require('express-async-handler');


const register = asyncHandler(async(req,res)=>{
    const {username, password, firstName, lastName} = req.body;
    if(!username || !password || !firstName || !lastName){
        res.status(400);
        throw new Error('Please add all fields');
    }
    if(await User.findOne({username:username})){
        res.status(400);
        throw new Error('username already registered');
    }
    const user = new User({firstName, lastName, username});
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err =>{
        if(err){
            res.status(400);
            throw new Error('Could not login user');
        } 
    });
    if(user){
        res.status(200).json({
            _id: user._id,
            firstName: user.firstName,
            lastName:user.lastName
        })
    }else{
        res.status(400)
        throw new Error('Invalid User data');
    }
})

const login = (req,res)=>{
    res.status(200).json({
        _id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName
    })
}

const checkUser = (req,res)=>{
    if(!req.user || !req.isAuthenticated()){
        res.status(400);
        throw new Error('Please login');
    }else{
        res.status(200).json({
            _id: req.user._id,
            firstName: req.user.firstName,
            lastName: req.user.lastName
        });
    }
}

const logout = (req,res)=>{
    req.logout();
    res.status(200).json('logged out');
}

module.exports = {
    register,
    login,
    checkUser,
    logout,
}