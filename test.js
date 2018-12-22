// Tested with v0.20.5

const BusinessNetworkCardStore = require('composer-common').BusinessNetworkCardStore;

const cardStore = require('composer-common').NetworkCardStoreManager.getCardStore( { type: 'composer-wallet-inmemory' } );

console.log(cardStore)

//https://hyperledger.github.io/composer/latest//business-network/cloud-wallets
