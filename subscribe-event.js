/**
 * Part of a course on Hyperledger Fabric: 
 * http://ACloudFan.com
 * 
 * Tested with Composer 0.20.5
 * 
 * Pre-Requisites
 * 1. Launch Fabric - Deploy Aircraft v8
 * 2. Launch REST Server
 * 
 * Demonstrates event subscription on HL fabric.
 * 1. Create the business network connection
 * 2. Subscribe to event stream - as of Jan 2017, criteria based subscription is not available
 *              https://hyperledger.github.io/composer/applications/subscribing-to-events.html
 * 3. Filter event 
 * 4. If Receieved event = FlightCreated then process it otherwise ignore
 * 
 * To Test:
 * 1. In REST server interface, initiate the CreateFlight transaction
 **/

const bnUtil = require('./bn-connection-util');

// #1 Connect to the airlinev8
bnUtil.cardName='admin@airlinev8';
bnUtil.connect(main);

var counter = 0;
function main(error){

    console.log("Event subscription started for: FlightCreated event!!");
    console.log("Received:")
    // #2 Subscribe to event
    bnUtil.connection.on('event',(event)=>{
        var namespace = event.$namespace;
        var eventtype = event.$type;

        var fqn = namespace+'.'+eventtype;

        // #3 Filter the events
        switch(fqn){
            case    'org.acme.airline.flight.FlightCreated':        
                    // #3 Process the event
                    counter++;
                    console.log('Event#',counter);
                    processFlightCreatedEvent(fqn, event);
                    break;
            default:    
                    console.log("Ignored event: ", fqn);
        }
    });
}

/**
 * This is the event processing function that can be coded to carry out any action
 * that the subscriber intends to take. E.g., when the flight is scheduled the travel
 * agent will open it up on their site for ticket sale.
 * @param {*} fqn 
 * @param {*} event 
 */
function processFlightCreatedEvent(fqn, event){
    // For demo purpose the information is getting printed on the console
    console.log(fqn, ' ', event.flightId, ' ', event.timestamp, ' ', event.eventId);
    console.log();
}