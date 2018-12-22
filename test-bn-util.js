'use strict';
/**
 * Part of a course on Hyperledger Fabric: 
 * http://ACloudFan.com
 * 
 * Last Updated: Dec 21, 2018
 * Composer 0.20.5
 * 
 * This is for testing the bn-connection-util.js
 * 
 * Shows how to use the bn-connection-util in your 
 */
const bnUtil = require('./bn-connection-util');

// This creates the business network connection object
// and calls connect() on it. Calls the callback method 
// 'main' with error
bnUtil.connect(main);

// Callback function passed to the BN Connection utility
// Error has value if there was an error in connect()
function main(error){
    // 1. Check for the connection error
    if(error){
        console.log(error);
        process.exit(1);
    }

    console.log("1. Successfully Connected !!!");

    // 2. Lets ping
    bnUtil.ping((response, error)=>{
        if(error){
            console.log(error);
        } else {
            console.log("2. Received Ping Response:");
            console.log(response);
        }

        // 3. Disconnect
        bnUtil.disconnect();

        console.log("3. Disconnected");
    });
}


