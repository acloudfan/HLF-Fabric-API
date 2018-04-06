'use strict';

/**
 * Part of a Hyperledger Fabric Course : http://ACloudFan.com
 * 
 * Composer 0.19.0
 * 
 * https://hyperledger.github.io/composer/latest//business-network/cloud-wallets
 * https://github.com/hyperledger/composer/blob/master/packages/composer-common/lib/cardstore/networkcardstoremanager.js
 * 
 * 1. Get the instance of the NetworkCardStoreManager
 * 2. Create instance of BusinessNetworkCardStore for filesystem based wallet
 * 3. BusinessNetworkCardStore : Get all cards on file system & print the names on console
 * 4. BusinessNetworkCardStore :Get the first card by name
 */

// 1. Get the instance of the NetworkCardStoreManager
const NetworkCardStoreManager= require('composer-common').NetworkCardStoreManager;

// 2. Get instance of BusinessNetworkCardStore for filesystem based wallet
var walletType = { type: 'composer-wallet-filesystem' }
const cardStore = NetworkCardStoreManager.getCardStore( walletType );

// 3. Gets all the card
return cardStore.getAll().then(function(cardMap){
    // Print all card names
    console.log(cardMap.keys());

    // 4. Get the name of the first card & then retrieve it
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




