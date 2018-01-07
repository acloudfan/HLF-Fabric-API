'use strict';

/**
 * Part of a Hyperledger Fabric Course : http://ACloudFan.com
 */
const FileSystemCardStore = require('composer-common').FileSystemCardStore;


// Create the FileSystemCardStore object that by default 
// picks the card information from the caller's home directory
// at ~/.composer
const cardStore = new FileSystemCardStore();

// Gets all the card
return cardStore.getAll().then(function(cardMap){
    // Print all card names
    console.log(cardMap.keys());

    // Get the name of the first card
    let firstCard = cardMap.keys().next().value

    // Get the firstCard - returns a promise so check .then()
    return cardStore.get(firstCard);

}).then(function(idCard){

    // get the user and business name
    console.log("Pulled First Card from file system: ", idCard.getUserName(),' @ ', idCard.getBusinessNetworkName())

    // get the connection profile
    console.log("Connection Profile Name: ",idCard.getConnectionProfile().name)
    
}).catch((error)=>{
    console.log(error)
});




