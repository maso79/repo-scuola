const calcolaEta=(anno, mese, giorno)=>{
    let data=anno+"-"+mese+"-"+giorno
    console.log(data)
    let oggettoData = new Date(data);
    if(data==null || data=='') {
      return false; 
    } else {
    
    //calculate month difference from current date in time
    var month_diff = Date.now() - oggettoData.getTime();
    
    //convert the calculated difference in date format
    var age_dt = new Date(month_diff); 
    
    //extract year from date    
    var year = age_dt.getUTCFullYear();
    
    //now calculate the age of the user
    var age = Math.abs(year - 1970);
    
    //display the calculated age
    return age
    }
}

module.exports={
    calcolaEta
}