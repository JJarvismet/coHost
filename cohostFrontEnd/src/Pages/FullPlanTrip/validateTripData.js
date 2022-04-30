export const validateTripData = (tripData) => {
    const { name, location, address, description, startDate, endDate } = tripData
    if(!name || !location || !address || !description || !startDate || !endDate){
        return {valid:false, message:'Please fill all fields'}
    }
    if(endDate < startDate){
        return {valid:false, message:"Trip can't end before it begins"}
    }
    if(new Date(startDate).getTime() < Date.now()-100000000){
        return {valid:false, message:"Trip can't start before its planned"}
    }
    if(name.length > 12){
        return {valid:false, message:"Trip name can't be over 16 characters"}
    }
    if(location.length > 16){
        return {valid:false, message:"Trip location can't be over 24 characters"}
    }
    return {valid:true};
}