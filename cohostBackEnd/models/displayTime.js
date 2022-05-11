const displayTime = (time) =>{
    if(time){
        if(time.charAt(0) === '0'){
            return `${time.substring(1,5)}am`;
        }
        if(parseInt(time.substring(0,2))>=13){
            return `${parseInt(time.substring(0,2))-12}${time.substring(2,5)}pm`
        }else{
            return `${time}am`
        }
    }
}

module.exports = displayTime;