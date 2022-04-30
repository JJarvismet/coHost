const Trip = require('../models/trip');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');

const getInviteCode = asyncHandler(async(req,res)=>{
    const trip = await Trip.findById(req.params.id);
    if(!trip){
        res.status(400);
        throw new Error('Could not find trip');
    }
    if(trip.inviteCode){
        res.status(200).json(trip.inviteCode);
    }
    if(!trip.inviteCode){
        trip.inviteCode = uuidv4();
        await Trip.findByIdAndUpdate(trip._id, {...trip})
        res.status(200).json(trip.inviteCode);
    }
})

const joinTrip = asyncHandler(async(req,res)=>{
    const trip = await Trip.findById(req.params.id);
    let isExisting = false;
    if(!trip){
        res.status(400);
        throw new Error('Could not find trip');
    }
    //checking is user is already a guest
    if(trip.guests && trip.guests.length > 0){
        if(trip.guests.find(guestIndex => guestIndex.guest._id.equals(req.user._id)) || req.user._id.equals(trip.host._id)){
            isExisting = true;
        }
    }else{
        if(req.user._id.equals(trip.host._id)){
            isExisting = true;
        }
    }
    if(isExisting){
        res.status(200).json(trip);
    }
    else{
        //validating invitation
        if(req.body.code === trip.inviteCode){
             //adding user to trip
            req.user.trips.push(trip._id);
            req.user.save();
            if(trip.guests){
                trip.guests.push({
                    guest: req.user,
                    isAttending: 'may'
                })
            }
            if(!trip.guests){
                trip.guests = [{
                    guest: req.user,
                    isAttending: 'may'          
                }]
            }
            trip.bulletin.unshift({poster: req.user, postMsg:'Joined the trip!', id:uuidv4()});
            await Trip.findByIdAndUpdate(trip._id, { ...trip });
            res.status(200).json(trip);
        }
        else{
            res.status(400);
            throw new Error('invalid invitation');
        }
    }
})

const currentTrip = asyncHandler(async(req,res)=>{
    const trip = await Trip.findById(req.params.id);
    let isHost = false;
    let isAttending;
    if(!trip){
        res.status(400);
        throw new Error('Could not find trip');
    }
    if(trip.host._id.equals(req.user._id)){
        isHost = true
        isAttending = 'yes'
    }else{
        isAttending = trip.guests.find(guestIndex => guestIndex.guest._id.equals(req.user._id)).isAttending;
    }
    res.status(200).json({trip:trip,isHost:isHost,isAttending:isAttending, length:trip.tripLength});
})

const editTrip = asyncHandler(async(req,res)=>{
    const tripEdit = req.body;
    if(!tripEdit.coverImage){
        tripEdit.coverImage = "https://thetravelexpert.ie/wp-content/uploads/2019/05/shutterstock_358226087-compressor.jpg";
    }
    const trip = await Trip.findById(req.params.id);
    if(!trip){
        res.status(400);
        throw new Error('Could not edit trip');
    }
    if(tripEdit.name.length<=0){
        tripEdit.name = trip.name;
    }
    if(tripEdit.address.length<=0){
        tripEdit.address = trip.address;
    }
    if(tripEdit.location.length<=0){
        tripEdit.location = trip.location;
    }
    if(tripEdit.description.length<=0){
        tripEdit.description = trip.description;
    }
    await Trip.findByIdAndUpdate(trip._id, {...tripEdit});
    res.status(200).send();
})

const deleteTrip = asyncHandler(async(req,res)=>{
    const trip = await Trip.findById(req.params.id);
    const host = await User.findById(trip.host._id);
    if(!trip || !host){
        res.status(400);
        throw new Error('Could not delete trip');
    }
    host.trips.splice(host.trips.indexOf(trip._id),1);
    host.save();
    if(trip.guests && trip.guests.length>0){
        for(guest of trip.guests){
            let currentGuest = await User.findById(guest.guest._id);
            currentGuest.trips.splice(currentGuest.trips.indexOf(trip._id),1);
            currentGuest.save();
        }
    }
    await Trip.findByIdAndDelete(trip._id);
    res.status(200);
})

const departTrip = asyncHandler(async(req,res)=>{
    const trip = await Trip.findById(req.params.id);
    req.user.trips.splice(req.user.trips.indexOf(trip._id),1)
    req.user.save();
    trip.guests = trip.guests.filter(guestIndex => !guestIndex.guest._id.equals(req.user._id));
    await Trip.findByIdAndUpdate(trip._id, {...trip});
})

module.exports = {
    currentTrip,
    deleteTrip,
    getInviteCode,
    joinTrip,
    editTrip,
    departTrip
}