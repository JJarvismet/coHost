const {v4: uuidv4} = require('uuid');
const displayTime = require('./displayTime');


class Activity {
    constructor(name, startTime, endTime, description, mandatory, organizer, address) {
        this.markType = 'A'
        this.name = name;
        this.startTime = startTime;
        this.endTime = endTime;
        this.description = description;
        this.mandatory = mandatory;
        this.id = uuidv4();
        this.organizer = organizer;
        this.address = address;
        this.displayStart = displayTime(startTime)
        this.displayEnd = displayTime(endTime)
    }
}



module.exports = Activity;