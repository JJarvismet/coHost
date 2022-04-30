const Trip = require('../models/trip');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');

const makeTrip = asyncHandler(async(req,res)=>{
    if(req.user){
        const trip = req.body;
        if(!trip.coverImage){
            trip.coverImage = "https://thetravelexpert.ie/wp-content/uploads/2019/05/shutterstock_358226087-compressor.jpg";
        }
        const newTrip = new Trip({...trip, host:req.user});
        if(!newTrip || !trip){
            res.status(400)
            throw new Error('Could not make trip');
        }
        newTrip.bulletin = [{poster:req.user, postMsg:'Let the fun begin!', id:uuidv4()}]
        newTrip.schedule = [];
        for(let i = 0; i<newTrip.tripLength.length; i++){
            newTrip.schedule.push([]);
        }
        await newTrip.save();
        if(req.user.trips){
            req.user.trips.push(newTrip._id.toString());
        }
        if(!req.user.trips){
            req.user.trips = [newTrip._id.toString()];
        }
        req.user.save();
        res.status(200).json(newTrip);
    }
})

const myTrips = asyncHandler(async(req,res)=>{
    if(req.user && req.user.trips.length>0){
        let up = [];
        let past = []
        for(let tripId of req.user.trips){
            let trip = await Trip.findById(tripId)
            if(!trip){
                res.status(400);
                throw new Error('Could not find trips')
            }
            let d = new Date();
            if(trip.endDate.getFullYear() > d.getFullYear()){
                up.push(trip);
            }else{
                if(trip.endDate.getMonth()+1 > d.getMonth()+1){
                    up.push(trip);
                }else{
                    if(trip.endDate.getDate() > d.getDate()){
                        up.push(trip);
                    }else{
                        past.push(trip);
                    }
                }
            }
        }
        res.status(200).json({past, up});
    }
    else{
        res.status(400);
        throw new Error('Could not find trips');
    }
})

module.exports = {
    makeTrip,
    myTrips
}