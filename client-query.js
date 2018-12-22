'use strict';
/**
 * Part of a course on Hyperledger Fabric: 
 * http://ACloudFan.com
 * 
 * Tested with Composer 0.20.5
 * 
 * Pre-Requisites
 * 1. Launch Fabric - Deploy Aircraft v8
 * 2. Poupulate the flight data ... use utility or REST Server
 * 
 * Demostrates the use Client module : query & buildQuery
 * 1. Create the Client Connection
 * 2. Execute a Named Query using Client Module : query()
 * 3. Create a Dynamic Query using Client Module : buildQuery()
 * 4. Execute the Query
 */

const bnUtil = require('./bn-connection-util');

// #1 Connect to the airlinev8
bnUtil.cardName='admin@airlinev8';
bnUtil.connect(main);

function main(error){
    // for clarity sake - ignored the error

    // #2 Execute the named query : AllFlights

    return bnUtil.connection.query('AllFlights').then((results)=>{

        console.log('Received flight count:', results.length)

        var   statement = 'SELECT  org.acme.airline.aircraft.Aircraft WHERE (aircraftId == _$id)';
        
        // #3 Build the query object
        return bnUtil.connection.buildQuery(statement);

    }).then((qry)=>{

        // #4 Execute the query
        return bnUtil.connection.query(qry,{id:'CRAFT01'});
    }).then((result)=>{
        console.log('Received aircraft count:', result.length);
        if(result.length > 0) console.log(result[0].aircraftId);
        bnUtil.connection.disconnect();
    }).catch((error)=>{
        console.log(error);
        bnUtil.connection.disconnect();
    });
}