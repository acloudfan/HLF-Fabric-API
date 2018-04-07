'use strict';
/**
 * Part of a course on Hyperledger Fabric: 
 * http://ACloudFan.com
 * 
 * Composer 0.19.0 : Update not valid anymore
 * 
 * https://hyperledger.github.io/composer/latest//api/common-businessnetworkdefinition
 * https://hyperledger.github.io/composer/latest//api/admin-adminconnection
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
const AdminConnection = require('composer-admin').AdminConnection;
const BusinessNetworkDefinition = require('composer-common').BusinessNetworkDefinition;

const cardNameForPeerAdmin = "PeerAdmin@hlfv1";
const appName = "airlinev7";
// This where I have the archive file for v2.0 of airlinev7
// CHANGE THIS DIRECTORY FOR YOUR Model Project
const bnaDirectory = "/AIRLINE v7 Poroject Folder/";

// 1. Create the AdminConnection instance
// Composer 0.19.0 change
var walletType = { type: 'composer-wallet-filesystem' }
const adminConnection = new AdminConnection(walletType);

// 2. Connect using the card for the Network Admin
return adminConnection.connect(cardNameForPeerAdmin).then(function(){
    console.log("Admin Connection Successful!!!");

    // Upgrade the BNA version
    upgradeApp();
}).catch(function(error){
    console.log(error);
});

/**
 * Deploys a network app using the admin connection
 */
function upgradeApp(){
    // 3. Create a Business Network Definition object from directory
    var bnaDef = {}
    BusinessNetworkDefinition.fromDirectory(bnaDirectory).then(function(definition){
        bnaDef = definition;
        console.log("Successfully created the definition!!! ",bnaDef.getName())

        // Install the new version of the BNA
        return adminConnection.install(bnaDef);
        
    }).then(()=>{

        // 4. Update the application
        // If you do not have the app installed, you will get an error
        console.log("Install successful")
        return adminConnection.upgrade(appName, '0.0.2');

    }).then(()=>{

        console.log('App updated successfully!! ', bnaDef.getName(),'  ',bnaDef.getVersion());

        // 5. Disconnect
        adminConnection.disconnect();

    }).catch(function(error){
        console.log(error);
    });

}

