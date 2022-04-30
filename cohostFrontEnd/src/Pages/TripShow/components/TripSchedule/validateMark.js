const validateMark = (mark) => {
    if(!mark.name || !mark.name.length > 0){
        return {valid:false, message:'Please add a name'};
    }
    if(!mark.startTime || !mark.startTime > 0){
        return {valid:false, message:'Please add a starting time'};
    }
    if(!mark.endTime || !mark.endTime > 0){
        return {valid:false, message:'Please add an ending time'};
    }
    return {valid:true};
}

export default validateMark;