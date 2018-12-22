/**
 * Part of a course on Hyperledger Fabric: 
 * http://ACloudFan.com
 * 
 * Composer 0.20.5
 * 
 * Takes a model project folder as input. 
 * 
 * 1. Setup the Peer Admin IDCard
 * 2. Setup the MemoryCardStore
 * 3. Create the admin and business network connection
 * 4. Use adminConnection to import the PeerAdmin card
 * 5. Connect the adminConnection to embedded runtime
 * 6. Create the business network definition fromDirectory
 * 7. Install the business network definition
 * 8. Start the airlinev7 
 * 9. Import the network admin ID Card
 * 10. Invoke the connect on businessNetwork connection object
 * 11. Invoke Callback(....)
 *      
 * Callback
 * ========
 * Callback receives the adminConnection, businessNetworkConnection
 * and the businessNetworkDefinition
 * 
 * Developer may use these to code the test cases, without worrying
 * about the boiler plate code for all of the tasks carried out in this
 * test harness.
 */

module.exports = {
    // Removed MemoryCardStore & Added NetworkCardStore 0.19.0
    // MemoryCardStore: require('composer-common').MemoryCardStore,
    NetworkCardStore: require('composer-common').NetworkCardStoreManager,
    IdCard: require('composer-common').IdCard,
    AdminConnection: require('composer-admin').AdminConnection,
    BusinessNetworkDefinition: require('composer-common').BusinessNetworkDefinition,
    BusinessNetworkConnection: require('composer-client').BusinessNetworkConnection,
    CertificateUtil: require('composer-common').CertificateUtil,
    
    info: 'UT-Harness-NOT-Initialized!!!',
    debug: false,

    // Objects created for testing
    adminConnection: {},
    businessNetworkDefinition: {},
    businessNetworkConnection: {},
  
    initialize: function (folder, callback) {
        // 1 Setup the PeerAdmin Card to be used by the admin connection
        idCard = this.setupPeerAdminCard();

        // Changed for Composer 0.19.0
        // 2. Set up the card store
        // let cardStoreObj = { cardStore: new this.MemoryCardStore() };
        // 3. Create the business & the admin Connection
        // this.adminConnection = new this.AdminConnection(cardStoreObj);
        // this.businessNetworkConnection = new this.BusinessNetworkConnection(cardStoreObj);
        const cardStore = require('composer-common').NetworkCardStoreManager.getCardStore( { type: 'composer-wallet-inmemory' } );
        this.adminConnection = new this.AdminConnection({ cardStore: cardStore });
        this.businessNetworkConnection = new this.BusinessNetworkConnection({ cardStore: cardStore });//cardType);

        // 4. Import the PeerAdmin Card to the Memory card store
        const peerAdminCardName = "PeerAdmin"
        return this.adminConnection.importCard(peerAdminCardName, idCard).then(() => {

            this.log("PeerAdmin Card imported Successfully!!");

            // 5. Connect to the embedded runtime with PeerAdmin Card
            return this.adminConnection.connect(peerAdminCardName);

        }).then(() => {

            // Admin connection successfull
            this.log("Admin Connection Successful!!")

            // 6. Create the Business Network Def from directory
            return this.BusinessNetworkDefinition.fromDirectory(folder)
        }).then(definition => {
            this.businessNetworkDefinition = definition;
            this.info = definition.metadata.packageJson.name + '@' + definition.metadata.packageJson.version;

            // Changed 0.19.0   install takes bnDefinition now
            // 7. Install the Composer runtime for the new business network
            return this.adminConnection.install(this.businessNetworkDefinition);//.getName());
        }).then(() => {
            this.log("Runtime Install Successful!!");
           
            const startOptions = {
                networkAdmins: [
                    {
                        userName: 'admin',
                        enrollmentSecret: 'adminpw'
                    }
                ]
            };
            // Changed 0.19.0 - start now needs a name & version
            // 8. Start runtime - will receive admin card on resolution
            return this.adminConnection.start(this.businessNetworkDefinition.getName(),this.businessNetworkDefinition.getVersion(), startOptions);
        }).then((networkAdminCardMap) => {
            this.log("Start Successful - network admin card received!!");
            this.networkAdminCardName = `admin@${this.businessNetworkDefinition.getName()}`;

            // 9. Import the network admin card
            return this.adminConnection.importCard(this.networkAdminCardName, networkAdminCardMap.get('admin'));
        }).then(() => {

            this.log("Imported the Network Admin Card!!! =" + this.networkAdminCardName);

            // 10. Connect the business network 
            return this.businessNetworkConnection.connect(this.networkAdminCardName);

        }).then(() => {

            this.log("Business connection successful!!!");

            // 13. Invoke the callback function
            callback(this.adminConnection, this.businessNetworkConnection, this.businessNetworkDefinition);

        }).catch((error) => {
            this.log("Errored!!", error)
        });
    },


    // This prints message to console if the debug=true
    log: function (msg, error) {
        if (this.debug) {
            console.log('UTH: ', msg);
        }
        if (error) console.log('UT Harness Error: ', error);
    },

    disconnect: function(){
        this.businessNetworkConnection.disconnect();
        this.adminConnection.disconnect();
    },

    /**
     * Sets up the Card store and the Network idCard
     */
    setupPeerAdminCard: function () {

        // Changed for 0.19.0
        // 1.1 Create the connection profile object
        // Type=embedded is the key here
        // const connectionProfile = {
        //     name: 'embedded',
        //     type: 'embedded'
        // }
        const connectionProfile = {
            name: 'embedded',
            'x-type': 'embedded'
        };

        // 1.2 Metadata
        const metaData = {
            version: 1,
            userName: 'PeerAdmin',
            roles: ['PeerAdmin', 'ChannelAdmin']
        }

        // Changed 0.19.0
        // 1.3 Just to satisfy the IDCard
        // const credentials = {
        //     certificate: "DOES NOT MATTER what you put here as",
        //     privateKey: "embedded runtime does not use these :)"
        // }
        // Generate certificates for use with the embedded connection
        const credentials = this.CertificateUtil.generate({ commonName: 'admin' });

        // 2. Create the IDCard
        idCard = new this.IdCard(metaData, connectionProfile);

        // 3. Set the credentials
        idCard.setCredentials(credentials)

        // 4. Create the admin object
        return idCard;
    }


}