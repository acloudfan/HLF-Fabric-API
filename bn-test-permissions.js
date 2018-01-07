'use strict';
/**
 * Part of a course on Hyperledger Fabric: 
 * http://ACloudFan.com
 * 
 * Demostrates the permissions setup. This 
 * 
 * Pre-Req
 * 1. Start the fabric
 * 2. Deploy & start airlinev9
 * 3. Add the user william Smith as per instructions 
 *    in the lecture on "ACL (2 of 2) Conditional Rules"
 * 4. Run the test by invoking this code
 *    Usage: node bn-test-permissions   <card-name>  <date in yyyy-mm-dd format>
 * 
 * PS: Keep in mind duplicate flight ID not allowed so change the -dd with every call
 */

 // Constant values - change as per your needs
 const namespace = "org.acme.airline.flight";
 const transactionType = "CreateFlight";

// 1. Connect to airlinev7
const bnUtil = require('./bn-connection-util');

if(process.argv.length < 4){
    console.log("Usage: node bn-test-permissions   <card-name>  <date in yyyy-mm-dd format>")
    process.exit(1);
}

bnUtil.cardName = process.argv[2]; //'wills@airlinev9'
bnUtil.connect(main);

function main(error){
    
    // Check for error
    if(error){
        console.log(error);
        process.exit(1);
    }

    executeTransaction();
    executeCreateOnFlightRegistry();
}

function    executeCreateOnFlightRegistry(){
    const  bnDef = bnUtil.connection.getBusinessNetwork();
    const  factory = bnDef.getFactory();
    let    flightResource = factory.newResource(namespace,'Flight','AE201-05-05-2020');
    flightResource.setPropertyValue('flightNumber','AE101');
    flightResource.route = factory.newConcept(namespace,'Route');
    flightResource.route.setPropertyValue('origin', 'EWR');
    flightResource.route.setPropertyValue('destination' , 'ATL');
    flightResource.route.setPropertyValue('schedule' , new Date('2018-10-15T21:44Z'));

    bnUtil.connection.getRegistry(namespace+'.'+'Flight').then((registry)=>{
        return registry.add(flightResource)
    }).then(()=>{
        console.log('Successfully created the flight in Flight Registry!!!');
    }).catch((error)=>{
        console.log('Error invoking create on Flight Registry!!!');
    });
}

// Executes the CreateFlight Transaction
function executeTransaction(){

    // 2. Get the Business Network Definition
    let bnDef =  bnUtil.connection.getBusinessNetwork();

    // 3. Get the factory
    let factory = bnDef.getFactory();
    
    // 4. Create an instance of transaction
    let options = {
        generate: false,
        includeOptionalFields: false
    }
    let flightId = "AE101-06-07-2018";
    let transaction = factory.newTransaction(namespace,transactionType,flightId,options);

    // 5. Set up the properties of the transaction object
    transaction.setPropertyValue('flightNumber','AE103');
    transaction.setPropertyValue('origin', 'EWR');
    transaction.setPropertyValue('destination' , 'ATL');
    transaction.setPropertyValue('schedule' , new Date(process.argv[3])); //'2018-11-15T21:44Z'));

    // 6. Submit the transaction
    return bnUtil.connection.submitTransaction(transaction).then(()=>{
        console.log("Transaction 'CreateFlight' Submitted/Processed Successfully!!")

        bnUtil.disconnect();

    }).catch((error)=>{
        console.log(error);

        bnUtil.disconnect();
    });
}




/**
 * Test Data for adding flight in registry
 {
  "$class": "org.acme.airline.flight.Flight",
  "flightId": "AE101-05-05-2018",
  "flightNumber": "AE101",
  "route": {
    "$class": "org.acme.airline.flight.Route",
    "origin": "ATL",
    "destination": "EWR",
    "schedule": "2017-12-17T18:49:58.288Z",
    "id": "string"
  }
}
* Adding flight using the createFlight transaction
{
  "$class": "org.acme.airline.flight.CreateFlight",
  "flightNumber": "AE101-06-06-2018",
  "origin": "MSP",
  "destination": "SEA",
  "schedule": "2018-06-06T18:49:58.273Z"
}
*/