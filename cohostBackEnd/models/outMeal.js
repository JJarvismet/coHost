const {v4: uuidv4} = require('uuid');
const displayTime = require('./displayTime');


class OutMeal {
    constructor(name, startTime, endTime, organizer, address) {
        this.markType = 'OM'
        this.name = name;
        this.startTime = startTime;
        this.endTime = endTime;
        this.address = address;
        this.id = uuidv4();
        this.organizer = organizer;
        this.displayStart = displayTime(startTime)
        this.displayEnd = displayTime(endTime)
    }
}



module.exports = OutMeal;