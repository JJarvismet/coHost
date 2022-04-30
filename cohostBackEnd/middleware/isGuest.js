const Trip = require('../models/trip');
const asyncHandler = require('express-async-handler');

isGuest = asyncHandler(async(req,res,next)=>{
    const trip = await Trip.findById(req.params.id);
    if(!trip){
        res.status(400);
        throw new Error('trip not found');
    }
    if(trip.guests && trip.guests.length > 0){
        if(!req.isAuthenticated() || (!trip.guests.find(guestIndex => guestIndex.guest._id.equals(req.user._id)) && !req.user._id.equals(trip.host._id))){
            res.status(401);
            throw new Error('not guest');
        }
    }else{
        if(!req.isAuthenticated() || !req.user._id.equals(trip.host._id)){
            res.status(401);
            throw new Error('not host--- from guestCheck');
        }
    }
    next()
})
module.exports = isGuest;