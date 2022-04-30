const Trip = require('../models/trip');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');
const Activity = require('../models/activity');
const OutMeal = require('../models/outMeal');
const InMeal = require('../models/inMeal');
const displayTime = require('../models/displayTime');


const postToTrip = asyncHandler(async(req,res)=>{
    const trip = await Trip.findById(req.params.id);
    if(!trip){
        res.status(400)
        throw new Error('Could not send post');
    }
    if(req.body.post && req.body.post.length>0){
        if(trip.bulletin){
            trip.bulletin.unshift({poster: req.user, postMsg:req.body.post, id:uuidv4()});
            await Trip.findByIdAndUpdate(trip._id, {...trip});
            res.status(200).json(trip.bulletin);
        }
        if(!trip.bulletin){
            trip.bulletin = [{poster: req.user, postMsg:req.body.post, id:uuidv4()}];
            await Trip.findByIdAndUpdate(trip._id, {...trip});
            res.status(200).json(trip.bulletin);
        }
    }
    if(req.body.post && !req.body.post.length>0){
        res.status(400);
        throw new Error('no post body');
    }
    if(req.body.isAttending){
        const guest = trip.guests.find(guestIndex => guestIndex.guest._id.equals(req.user._id));
        if(!guest && req.user._id.equals(trip.host._id)){
            res.status(400);
            throw new Error("You can't leave a trip you're hosting");
        }
        if(guest){
            trip.guests[trip.guests.indexOf(guest)].isAttending = req.body.isAttending;
            await Trip.findByIdAndUpdate(trip._id, {...trip});
            res.status(200).json({guests:trip.guests,isAttending:req.body.isAttending});
        }
    }
})

const postToSchedule = asyncHandler(async(req,res)=>{
    const trip = await Trip.findById(req.params.id);
    const day = req.params.day;
    const markType = req.body.mark
    const data = req.body.data;
    if(!data.name || !data.name.length>0 || !data.startTime || !data.startTime>0 || !data.endTime || !data.endTime>0){
        res.status(400);
        throw new Error('Could not make mark');
    }

    if(!trip || !markType || !trip.schedule){
        res.status(400)
        throw new Error('Could not find trip');
    }

    if(markType == 'activity'){
        const activity = new Activity(data.name,data.startTime,data.endTime,data.description,data.mandatory,req.user,data.address);

        if(!trip.schedule[day] || !trip.schedule[day].length>0){
            trip.schedule[day] = [activity];
        }else{
            if(activity.startTime > trip.schedule[day][trip.schedule[day].length-1].startTime){
                trip.schedule[day].push(activity);
            }else{
                for(mark of trip.schedule[day]){
                    if(activity.startTime <= mark.startTime){
                        trip.schedule[day].splice(trip.schedule[day].indexOf(mark), 0, activity);
                        break;
                    }
                }
            }
        }
    }

    if(markType == 'outMeal'){
        const meal = new OutMeal(data.name,data.startTime,data.endTime,req.user,data.address);

        if(!trip.schedule[day] || !trip.schedule[day].length>0){
            trip.schedule[day] = [meal];
        }else{
            if(meal.startTime > trip.schedule[day][trip.schedule[day].length-1].startTime){
                trip.schedule[day].push(meal);
            }else{
                for(mark of trip.schedule[day]){
                    if(meal.startTime <= mark.startTime){
                        trip.schedule[day].splice(trip.schedule[day].indexOf(mark), 0, meal);
                        break;
                    }
                }
            }
        }
    }

    if(markType == 'inMeal'){
        const meal = new InMeal(data.name,data.startTime,data.endTime,req.user,data.list);

        if(!trip.schedule[day] || !trip.schedule[day].length>0){
            trip.schedule[day] = [meal];
        }else{
            if(meal.startTime > trip.schedule[day][trip.schedule[day].length-1].startTime){
                trip.schedule[day].push(meal);
            }else{
                for(mark of trip.schedule[day]){
                    if(meal.startTime <= mark.startTime){
                        trip.schedule[day].splice(trip.schedule[day].indexOf(mark), 0, meal);
                        break;
                    }
                }
            }
        }
    }

    await Trip.findByIdAndUpdate(trip._id, {...trip});
    res.status(200).send();
})

const editMark = asyncHandler(async(req,res)=>{
    const trip = await Trip.findById(req.params.id);
    const day = req.params.day;
    const markType = req.body.mark;
    const markId = req.body.markId;
    const data = req.body.data;

    if(!data.name || !data.name.length>0 || !data.startTime || !data.startTime>0 || !data.endTime || !data.endTime>0){
        res.status(400);
        throw new Error('Could not make mark');
    }

    if(!trip || !markType || !trip.schedule){
        res.status(400)
        throw new Error('Could not find trip');
    }

    if(markType == 'activity'){
        let activity = trip.schedule[day].find(activityIndex => activityIndex.id === markId);
        trip.schedule[day] = trip.schedule[day].filter(mark => mark.id != activity.id);
        activity.name = data.name;
        activity.startTime = data.startTime;
        activity.endTime = data.endTime;
        activity.description = data.description;
        activity.address = data.address;
        activity.displayStart = displayTime(data.startTime);
        activity.displayEnd = displayTime(data.endTime);

        if(!trip.schedule[day] || !trip.schedule[day].length>0){
            trip.schedule[day] = [activity];
        }else{
            if(activity.startTime > trip.schedule[day][trip.schedule[day].length-1].startTime){
                trip.schedule[day].push(activity);
            }else{
                for(mark of trip.schedule[day]){
                    if(activity.startTime <= mark.startTime){
                        trip.schedule[day].splice(trip.schedule[day].indexOf(mark), 0, activity);
                        break;
                    }
                }
            }
        }

        res.status(200).send();
    }

    if(markType == 'outMeal'){
        let outMeal = trip.schedule[day].find(outMealIndex => outMealIndex.id === markId);
        trip.schedule[day] = trip.schedule[day].filter(mark => mark.id != outMeal.id);
        outMeal.name = data.name;
        outMeal.startTime = data.startTime;
        outMeal.endTime = data.endTime;
        outMeal.address = data.address;
        outMeal.displayStart = displayTime(data.startTime);
        outMeal.displayEnd = displayTime(data.endTime);
        
        if(!trip.schedule[day] || !trip.schedule[day].length>0){
            trip.schedule[day] = [outMeal];
        }else{
            if(outMeal.startTime > trip.schedule[day][trip.schedule[day].length-1].startTime){
                trip.schedule[day].push(outMeal);
            }else{
                for(mark of trip.schedule[day]){
                    if(outMeal.startTime <= mark.startTime){
                        trip.schedule[day].splice(trip.schedule[day].indexOf(mark), 0, outMeal);
                        break;
                    }
                }
            }
        }

        res.status(200).send();
    }

    if(markType == 'inMeal'){
        let inMeal = trip.schedule[day].find(inMealIndex => inMealIndex.id === markId);
        trip.schedule[day] = trip.schedule[day].filter(mark => mark.id != inMeal.id);
        inMeal.name = data.name;
        inMeal.startTime = data.startTime;
        inMeal.endTime = data.endTime;
        inMeal.products = data.list;
        inMeal.displayStart = displayTime(data.startTime);
        inMeal.displayEnd = displayTime(data.endTime);
        
        if(!trip.schedule[day] || !trip.schedule[day].length>0){
            trip.schedule[day] = [inMeal];
        }else{
            if(inMeal.startTime > trip.schedule[day][trip.schedule[day].length-1].startTime){
                trip.schedule[day].push(inMeal);
            }else{
                for(mark of trip.schedule[day]){
                    if(inMeal.startTime <= mark.startTime){
                        trip.schedule[day].splice(trip.schedule[day].indexOf(mark), 0, inMeal);
                        break;
                    }
                }
            }
        }

        res.status(200).send();
    }

    await Trip.findByIdAndUpdate(trip._id, {...trip});
    res.status(200).send();
});

const deleteMark = asyncHandler(async(req,res)=>{
    const trip = await Trip.findById(req.params.id);
    const day = req.params.day;
    const markId = req.params.markId;
    trip.schedule[day] = trip.schedule[day].filter(mark => mark.id != markId);
    await Trip.findByIdAndUpdate(trip._id, {...trip});
    res.status(200).send();
})



module.exports = {
    postToTrip,
    postToSchedule,
    editMark,
    deleteMark
}