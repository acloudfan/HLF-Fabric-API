'use strict';
/**
 * Part of a course on Hyperledger Fabric: 
 * http://ACloudFan.com
 * 
 * Demonstrates the use of admin connection to update an app
 * 
 **** Runtime has already been installed
 **** airlinev7@0.0.1.bna deployed and currently active
 *
 * 1. Create the Admin Connection instance
 * 2. Connect
 * 3. Create the Business Network Definition Object
 * 4. Update the airlinev7 model in runtime
 * 5. Disconnect
 */
const FileSystemCardStore = require('composer-common').FileSystemCardStore;
const AdminConnection = require('composer-admin').AdminConnection;
const BusinessNetworkDefinition = require('composer-common').BusinessNetworkDefinition;

const cardNameForNetworkAdmin = "admin@airlinev7";
// This where I have the archive file for v2.0 of airlinev7
// CHANGE THIS DIRECTORY FOR YOUR Model Project
const bnaDirectory = "C:/Users/Rajeev/Documents/Course/Hyperledger-Course/workspace/HLF-Course-Domain-Model/airlinev7";

// 1. Create the AdminConnection instance
const cardStore = new FileSystemCardStore();
const cardStoreObj = { cardStore: cardStore };
const adminConnection = new AdminConnection(cardStoreObj);

// 2. Connect using the card for the Network Admin
return adminConnection.connect(cardNameForNetworkAdmin).then(function(){
    console.log("Admin Connection Successful!!!");

    // Update the BNA
    updateApp();
}).catch(function(error){
    console.log(error);
});

/**
 * Deploys a network app using the admin connection
 */
function updateApp(){
    // 3. Create a Business Network Definition object from directory
    var bnaDef = {}
    BusinessNetworkDefinition.fromDirectory(bnaDirectory).then(function(definition){
        bnaDef = definition;
        console.log("Successfully created the definition!!! ",bnaDef.getName())

        // 4. Update the application
        // If you do not have the app installed, you will get an error
        return adminConnection.update(bnaDef);

    }).then(()=>{

        console.log('App updated successfully!! ', bnaDef.getName(),'  ',bnaDef.getVersion());

        // 5. Disconnect
        adminConnection.disconnect();

    }).catch(function(error){
        console.log(error);
    });

}

