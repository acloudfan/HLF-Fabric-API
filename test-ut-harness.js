/**
  * Part of a course on Hyperledger Fabric: 
 *  http://ACloudFan.com
 * 
 * This is for testing the UT test harness itself :-)
 * 
 * 1. utHarness = require('./ut-harness');
 * 2. Call the initialize function on the ut-harness
 *      A) Folder for the model project
 *      B) Callback function receives the:
 *           adminConnection, 
 *           businessNetworkConnection,
 *           businessNetworkDefinition
 * 3. The unit test code is written in the callback function
 */
const utHarness = require('./ut-harness');

var modelFolder = 'C:/Users/Rajeev/Documents/Course/Hyperledger-Course/workspace/HLF-Course-Domain-Model/airlinev7';
//var modelFolder = '';


// Set this to false for suppressing the UTH messages
utHarness.debug=true;
utHarness.initialize(modelFolder, (adminCon, bnCon, definition)=>{

    // Get the registry names
        console.log("BNA =",definition.getName(),'@',definition.getVersion());

        // Lets geth the registries
        return bnCon.getAllAssetRegistries(false).then((registries)=>{
            registries.forEach((registry)=>{
                console.log(registry.id)
            });
                     
        });        
});
