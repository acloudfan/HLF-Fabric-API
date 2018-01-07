/**
 * Populates the airline Registries with data
 */

const bnUtil = require('../bn-connection-util');

const aircraftNamespace = 'org.acme.airline.aircraft';
const aircraftType = 'Aircraft';
const flightNamespace = 'org.acme.airline.flight';
const transactionType = 'CreateFlight';

// This creates the business network connection object
// and calls connect() on it. Calls the callback method 
// 'main' with error
bnUtil.cardName='admin@airlinev8';
if(process.argv.length < 3){
    console.log("Usage: node populate-acme-airline   <card-name> ")
    console.log("Populating Network using a card: ",bnUtil.cardName);
} else {
    bnUtil.cardName = process.argv[2];
    console.log("Populating Network using a card: ",bnUtil.cardName);
}
bnUtil.connect(main);

// Callback function passed to the BN Connection utility
// Error has value if there was an error in connect()
function main(error){

    if(error){
        console.log(error);
        process.exit(1);
    }

    // create an array of aircraft instances
    let registry = {};
    let aircrafts = createAircraftInstances();
    return bnUtil.connection.getAssetRegistry(aircraftNamespace+'.'+aircraftType).then((reg)=>{
        registry = reg;

        // Add aircraft instances
        return registry.addAll(aircrafts);

    }).then(()=>{

        submitCreateFlightTransactions();

    }).catch((error)=>{
        console.log(error);
       // bnUtil.disconnect();
    });

}

/**
 * Create the flights
 */
function submitCreateFlightTransactions(){
    // Create the flight tra
    let flights = createFlightTransactions();

    flights.forEach((txn)=>{
        return bnUtil.connection.submitTransaction(txn).then(()=>{
            console.log("Added flight : ", txn.flightNumber, txn.origin, txn.destination, txn.schedule)
        });
    });
}

/**
 * Returns an array of aircraft instances
 */
function    createAircraftInstances(){
    // 3. This Array will hold the instances of aircraft resource
    let    aircrafts = [];
    const  bnDef = bnUtil.connection.getBusinessNetwork();
    const  factory = bnDef.getFactory();
    // Instance#1
    let    aircraftResource = factory.newResource(aircraftNamespace,aircraftType,'CRAFT01');
    aircraftResource.setPropertyValue('ownershipType','LEASED');
    aircraftResource.setPropertyValue('firstClassSeats',10);
    aircraftResource.setPropertyValue('businessClassSeats',10);
    aircraftResource.setPropertyValue('economyClassSeats',50);
    // Push instance to  the aircrafts array
    aircrafts.push(aircraftResource);

    // Instance#2 
    aircraftResource = factory.newResource(aircraftNamespace,aircraftType,'CRAFT02');
    // You may use direct assignment instead of using the setPropertyValue()
    aircraftResource.ownershipType='OWNED';
    aircraftResource.firstClassSeats=15
    aircraftResource.businessClassSeats=20;
    aircraftResource.economyClassSeats=100;
    // Push instance to  the aircrafts array
    aircrafts.push(aircraftResource);

    
    // Instance#3 
    aircraftResource = factory.newResource(aircraftNamespace,aircraftType,'CRAFT03');
    // You may use direct assignment instead of using the setPropertyValue()
    aircraftResource.ownershipType='OWNED';
    aircraftResource.firstClassSeats=16
    aircraftResource.businessClassSeats=10;
    aircraftResource.economyClassSeats=80;
    // Push instance to  the aircrafts array
    aircrafts.push(aircraftResource);

    return aircrafts;
}

function createFlightTransactions(){
    let    flights = [];
    const  bnDef = bnUtil.connection.getBusinessNetwork();
    const  factory = bnDef.getFactory();

    // Transaction instance#1
    let transaction = factory.newTransaction(flightNamespace,transactionType);
    transaction.setPropertyValue('flightNumber','AE101');
    transaction.setPropertyValue('origin', 'EWR');
    transaction.setPropertyValue('destination' , 'SEA');
    transaction.setPropertyValue('schedule' , new Date('2018-10-15T21:44Z'));
    flights.push(transaction);

    // Transaction instance#2
    transaction = factory.newTransaction(flightNamespace,transactionType);
    transaction.setPropertyValue('flightNumber','AE102');
    transaction.setPropertyValue('origin', 'ATL');
    transaction.setPropertyValue('destination' , 'EWR');
    transaction.setPropertyValue('schedule' , new Date('2018-11-16T21:44Z'));
    flights.push(transaction)

    // Transaction instance#2
    transaction = factory.newTransaction(flightNamespace,transactionType);
    transaction.setPropertyValue('flightNumber','AE103');
    transaction.setPropertyValue('origin', 'SEA');
    transaction.setPropertyValue('destination' , 'JFK');
    transaction.setPropertyValue('schedule' , new Date('2018-12-17T21:44Z'));
    flights.push(transaction)

    return flights;
}