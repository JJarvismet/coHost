const {v4: uuidv4} = require('uuid');
const displayTime = require('./displayTime');


class InMeal {
    constructor(name, startTime, endTime, organizer, products) {
        this.markType = 'IM'
        this.name = name;
        this.startTime = startTime;
        this.endTime = endTime;
        this.id = uuidv4();
        this.organizer = organizer;
        this.displayStart = displayTime(startTime)
        this.displayEnd = displayTime(endTime)
        this.products = products
    }
}



module.exports = InMeal;