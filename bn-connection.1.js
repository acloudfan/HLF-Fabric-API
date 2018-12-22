'use strict';
/**
 * Part of a course on Hyperledger Fabric: 
 * http://ACloudFan.com
 * 
 * DO NOT USE THIS FILE.
 * Dec 21, 2018
 * 
 * Demonstrates the use of the business network connection
 * 
 * Pre-Reqs
 * 1. The local fabric is up
 * 2. Deployed the application to fabric
 * 3. Card imported to the card storage on file system
 */

// Need the card store instance
const FileSystemCardStore = require('composer-common').FileSystemCardStore;
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
// Used as the card for all calls
var cardName = "admin@airlinev7";
const   registryId = "org.acme.airline.aircraft.Aircraft";

// 1. Create instance of file system card store
const cardStore = new FileSystemCardStore();
// 2. Connection object for the fabric
const cardStoreObj = { cardStore: cardStore };
const bnConnection = new BusinessNetworkConnection(cardStoreObj);

// 3. Initiate a connection
return bnConnection.connect(cardName).then(function(){
    console.log("Connected Successfully!!!");
    // 4. Display the name and version of the network app
    getBusinessNetwork();
    // 5. Ping the network
    ping();

    // 6. Get all assets in a registry
    getAssets();

}).catch((error)=>{
    console.log(error);
});


// Extracts information about the network
function getBusinessNetwork(){
    // Returns an object of type BusinessNetworkDefinition
    let businessNetworkDefinition = bnConnection.getBusinessNetwork();
    // Dump package.json to the console
    console.log("Connected to: ",businessNetworkDefinition.metadata.packageJson.name,
                "  version ",businessNetworkDefinition.metadata.packageJson.version);
}

// Ping the network app
function ping(){
    bnConnection.ping().then(function(response){
        console.log("Ping Response:");
        console.log(response);
    });
}

// Get all the Asset from a registry Registry
// 1. Get an instance of the AssetRegistry
// 2. Get all he objects in the asset registry
function getAssets(){
    
    return bnConnection.getAssetRegistry(registryId).then(function(registry){
        console.log("Received the Registry Instance: ", registryId)

        // This would get a collection of assets
        return registry.getAll().then(function(resourceCollection){
            console.log("Received count=",resourceCollection.length)
        });

    }).catch(function(error){
        console.log(error);
    });
}

// function update