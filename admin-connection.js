'use strict';
/**
 * Part of a course on Hyperledger Fabric: 
 * http://ACloudFan.com
 * 
 * Last Updated: Dec 21, 2018
 * Composer 0.20.5  : Does not require a FileSystemCardStore to be created
 * 
 * https://hyperledger.github.io/composer/latest//api/admin-adminconnection
 * 
 * Demonstrates the use of the admin connection class
 * 1. Create an instance of the AdminConnection object
 * 2. Connect as the PeerAdmin
 * 3. List the deployed Business Network Apps
 * 4. Disconnect 
 * 5. Connect as the Network Admin for airlinev7
 * 6. Ping airlinev7
 * 7. Disconnect
 */

// Need the card store instance
const AdminConnection = require('composer-admin').AdminConnection;

// Used as the card for all calls
const   cardNameForPeerAdmin   = "PeerAdmin@hlfv1";
const   cardNameForNetworkAdmin   = "admin@airlinev7";
const   appToBePinged = "airlinev7";

// 1. Create Admin Connection object for the fabric
var walletType = { type: 'composer-wallet-filesystem' }
var adminConnection = new AdminConnection(walletType);

// 2. Initiate a connection as PeerAdmin
return adminConnection.connect(cardNameForPeerAdmin).then(function(){

    console.log("Admin Connected Successfully!!!");
    // Display the name and version of the network app
   listBusinessNetwork();
}).catch((error)=>{
    console.log(error);
});


// Extracts information about the network
function listBusinessNetwork(){
    // 3. List the network apps
    adminConnection.list().then((networks)=>{
        console.log("1. Successfully retrieved the deployed Networks: ",networks);

        networks.forEach((businessNetwork) => {
            console.log('Business Network deployed in Runtime', businessNetwork);
         });
        // 4. Disconnect
        return adminConnection.disconnect().then(function(){
            reconnectAsNetworkAdmin();
        });

        
    }).catch((error)=>{
        console.log("Error=",error);
    });
}

// Ping the network
function reconnectAsNetworkAdmin(){
   
    // 5. Reconnect with the card for network admin
    return adminConnection.connect(cardNameForNetworkAdmin).then(function(error){
        
        console.log("2. Network Admin Connected Successfully!!!");
        // 6. Ping the BNA 
        
        adminConnection.ping(appToBePinged).then(function(response){
            console.log("Ping response from "+appToBePinged+" :",response);
            // 7. Disconnect
            adminConnection.disconnect();
        }).catch((error)=>{
            console.log("Error=",error);
        });

    });

    
}


