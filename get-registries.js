'use strict';
/**
 * Part of a course on Hyperledger Fabric: 
 * http://ACloudFan.com
 * 
 * Tested with Composer 0.20.5
 * 
 * Demostrates the getter functions for the registries
 * 1. Use the bn-connection-util to connect
 * 2. Get & Print the Asset Registries
 * 3. Get & Print the Participant Registries
 * 4. Get & Print the Transaction Registries
 * 5. Get & Print the Historian Registry
 * 6. Get & Print the Identity  Registriy
 */
const bnUtil = require('./bn-connection-util');

// This creates the business network connection object
// and calls connect() on it. Calls the callback method 
// 'main' with error
bnUtil.connect(main);

// This gets invoked after the promise for connect is
// resolved. Error has value if there was an error in connect()
function main(error){
    // Check for the connection error
    if(error){
        console.log(error);
        process.exit(1);
    }
    
    // This is where you would code the app specific stuff
    // Connection is available bnUtil.connection
    // to disconnect use bnUtil.disconnect()

    // 2. Get All asset registries...arg true = include system registry
    bnUtil.connection.getAllAssetRegistries(false).then((registries)=>{        
        console.log("Registries");
        console.log("==========");
        printRegistry(registries);
        // 3. Get all the participant registries
        return bnUtil.connection.getAllParticipantRegistries(false);
    }).then((registries)=>{
        printRegistry(registries);

        // 4. Get all the transaction Registries
        return bnUtil.connection.getAllTransactionRegistries();
    }).then((registries)=>{       
        printRegistry(registries);

        // 5. Get the Historian Registry
        return bnUtil.connection.getHistorian();

    }).then((registry)=>{
        console.log("Historian Registry: ", registry.registryType, "   ", registry.id);

        // 6. Get the Identity Registry
        return bnUtil.connection.getIdentityRegistry();

    }).then((registry)=>{
        console.log("Identity Registry: ", registry.registryType, "   ", registry.id);

        bnUtil.connection.disconnect();
    }).catch((error)=>{
        console.log(error);
        bnUtil.connection.disconnect();
    });
}

// Utility function to print information about the registry
function printRegistry(registryArray){
    registryArray.forEach((registry)=>{
        console.log(registry.registryType, "   ", registry.id);
    });
}
