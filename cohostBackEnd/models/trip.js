const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    host:{
        type: Object,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    startDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    },
    guests:{
        type: Array,
        required: false
    },
    bulletin:{
        type: Array,
        required: false
    },
    schedule:{
        type: Object,
        required: false
    },
    inviteCode:{
        type: String,
        required: false
    },
    coverImage:{
        type: String,
        required: false
    }
});

TripSchema.virtual('tripLength').get(function () {
    let dates = [];
    for( let date=new Date(this.startDate); date <= new Date(this.endDate); date.setDate(date.getDate()+1)){
        let d = new Date(date);
        const off = d.getTimezoneOffset()/60;
        d.setHours(d.getHours()+off);
        const final = d.toDateString();
        dates.push(final);
    }
    return dates;
});


module.exports = mongoose.model("Trip", TripSchema);