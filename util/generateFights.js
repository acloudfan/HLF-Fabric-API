/**
 * Tested with Composer 0.20.5
 * 
 * This generates a flight schedule for 6 weeks for 3 flights
 * AE101, AE102, AE103
 * AE101  EWR -> SEA    11:00  AM
 * AE102  SEA -> ATL    2:30 PM
 * AE103  ATL -> EWR    6:15 PM
 */
const bnUtil = require('../bn-connection-util');
const flightNamespace = 'org.acme.airline.flight';
const transactionType = 'CreateFlight';

// Change this for populating other versions
bnUtil.cardName='admin@airlinev8';
if(process.argv.length < 3){
    console.log("Usage: node populate-acme-airline   <card-name> ")
    console.log("Populating Network using a card: ",bnUtil.cardName);
} else {
    bnUtil.cardName = process.argv[2];
    console.log("Populating Network using a card: ",bnUtil.cardName);
}
bnUtil.connect(main);



function main(error){
    if(error){
        console.log(error)
        process.exit(1)
    }
    createFlights('AE101','EWR','SEA',new Date(), 3, 11,00);
    let nextDay = new Date(new Date().getTime()+24*60*60*1000);
    createFlights('AE102','SEA','ATL', nextDay, 3, 14,30);
    nextDay = new Date(nextDay.getTime()+2*24*60*60*1000);
    createFlights('AE103','ATL','EWR', nextDay, 3, 18,15);
}


// Creates the flight instances 
// To keep things simple, flight will be scheduled at the start of hour 1:30 not allowed
// departureTime = 0-23 0=12 AM, 1=1 AM .... 13=1 PM, 23=11:00 PM
function  createFlights(number, origin, destination, startDate, frequency, departureTimeHour, departureTimeMinute){

    var x = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    x = new Date(x.getTime()+departureTimeHour*60*60*1000+departureTimeMinute*60*1000); // + );

    let    flights = [];
    const  bnDef = bnUtil.connection.getBusinessNetwork();
    const  factory = bnDef.getFactory();

    var ctr = 0 ;
    const iterations = 4;
    for(var i=0; i < iterations; i++){
        // Flight scheduled every 3rd day starting from today
        let sched = new Date(x.getTime()+(i+1)*frequency*24*60*60*1000);
        
        let transaction = factory.newTransaction(flightNamespace,transactionType);
        transaction.setPropertyValue('flightNumber',number);
        transaction.setPropertyValue('origin', origin);
        transaction.setPropertyValue('destination' , destination);
        transaction.setPropertyValue('schedule' , sched);
        //flights.push(transaction);
        bnUtil.connection.submitTransaction(transaction).then(()=>{
            console.log('Added Flight : ',number,ctr);
            ctr++;
        }).catch((error)=>{
            console.log(error);
            bnUtil.connection.disconnect();
        })
    }
}