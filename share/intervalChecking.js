
module.exports=(coutDown,interval)=>{

    const intervalInMin=interval * 60 * 1000;

    if(coutDown>intervalInMin){
        return intervalInMin;
    }
    else{
        return false;
    }

}