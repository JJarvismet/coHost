const Trip = require('../models/trip');
const asyncHandler = require('express-async-handler');

isHost = asyncHandler(async(req,res,next)=>{
    const trip = await Trip.findById(req.params.id);
    if(!trip){
        res.status(400);
        throw new Error('no trip found');
    }
    if(!req.isAuthenticated() || !req.user._id.equals(trip.host._id)){
        res.status(401);
        throw new Error('not host');
    }
    next();
})
module.exports = isHost;