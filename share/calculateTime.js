module.exports= (weeks,days,hours,minutes)=> {
    let totalTimeInMiliSec=0;
    if(days!==null || days!== undefined){
        totalTimeInMiliSec+=days * 24 * 60 * 60 * 1000;
    }

    if(weeks!==null || weeks!== undefined){
        totalTimeInMiliSec+=weeks  * 7 * 24 * 60 * 60 * 1000;
    }

    if(hours!==null || hours!== undefined){
        totalTimeInMiliSec+=hours * 60 * 60 * 1000;
    }

    if(minutes!==null || minutes!== undefined){
        totalTimeInMiliSec+=minutes  * 60 * 1000;
    }

    return totalTimeInMiliSec;

}

