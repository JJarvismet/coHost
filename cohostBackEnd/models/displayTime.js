const displayTime = (time) =>{
    if(time){
        if(time.charAt(0) === '0'){
            if(parseInt(time.substring(0,2))===00){
                return `${parseInt(time.substring(0,2))+12}${time.substring(2,4)}am`
            }
            return `${time.substring(1,5)}am`;
        }
        if(parseInt(time.substring(0,2))>=12){
            if(parseInt(time.substring(0,2))===12){
                return `${time}pm`
            }
            return `${parseInt(time.substring(0,2))-12}${time.substring(2,4)}pm`
        }else{
            return `${time}am`
        }
    }
}

module.exports = displayTime;