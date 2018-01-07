'use strict';
/**
 * Part of a course on Hyperledger Fabric: 
 * http://ACloudFan.com
 * 
 * Demonstrates the use of the admin connection class
 * 1. Create a FileSystemCard store object
 * 2. Create an instance of the AdminConnection object
 * 3. Connect as the PeerAdmin
 * 4. List the deployed Business Network Apps
 * 5. Disconnect 
 * 6. Connect as the Network Admin for airlinev7
 * 7. Ping airlinev7
 * 8. Disconnect
 */

// Need the card store instance
const FileSystemCardStore = require('composer-common').FileSystemCardStore;
const AdminConnection = require('composer-admin').AdminConnection;

// Used as the card for all calls
const   cardNameForPeerAdmin   = "PeerAdmin@hlfv1";
const   cardNameForNetworkAdmin   = "admin@airlinev7";
const   appToBePinged = "airlinev7";

// 1. Create instance of file system card store
const cardStore = new FileSystemCardStore();

// 2. Create Admin Connection object for the fabric
const cardStoreObj = { cardStore: cardStore };
const adminConnection = new AdminConnection(cardStoreObj);

// 3. Initiate a connection as PeerAdmin
return adminConnection.connect(cardNameForPeerAdmin).then(function(){
    console.log("Admin Connected Successfully!!!");
    // Display the name and version of the network app
   listBusinessNetwork();
}).catch((error)=>{
    console.log(error);
});


// Extracts information about the network
function listBusinessNetwork(){
    // 4. List the network apps
    adminConnection.list().then((networks)=>{
        console.log("Successfully retrieved the deployed Networks: ",networks);
        // 5. Disconnect
        adminConnection.disconnect();
        reconnectAsNetworkAdmin();
    }).catch((error)=>{
        console.log(error);
    });
}

// Ping the network
function reconnectAsNetworkAdmin(){

    // 6. Reconnect with the card for network admin
    return adminConnection.connect(cardNameForNetworkAdmin).then(function(){
        console.log("Network Admin Connected Successfully!!!");
        // 7. Ping the BNA 
        adminConnection.ping(appToBePinged).then(function(response){
            console.log("Ping response: ",response);
            // 8. Disconnect
            adminConnection.disconnect();
        }).catch((error)=>{
            console.log(error);
        });
    });

    
}


