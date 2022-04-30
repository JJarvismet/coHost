const Trip = require('../models/trip');
const asyncHandler = require('express-async-handler');

const isTrip = asyncHandler(async(req,res,next)=>{
    try{
        await Trip.findById(req.params.id);
    }catch(err){
        res.status(400);
        throw new Error('trip not found');
    }
    next();
})
module.exports = isTrip;