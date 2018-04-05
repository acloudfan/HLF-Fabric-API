'use strict';

/**
 * Part of a Hyperledger Fabric Course : http://ACloudFan.com
 * Composer 0.19.0
 * https://hyperledger.github.io/composer/latest//business-network/cloud-wallets
 */
const NetworkCardStoreManager= require('composer-common').NetworkCardStoreManager;

var cardType = { type: 'composer-wallet-filesystem' }
const cardStore = NetworkCardStoreManager.getCardStore( cardType );


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




