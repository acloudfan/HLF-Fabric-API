/**
 * Part of a course on Hyperledger Fabric: 
 * http://ACloudFan.com
 * 
 * This is the sample test case used in the lecture
 * "Unit Testing of Network Apps"
 */
var assert = require('chai').assert;


const utHarness = require('C:/Users/Rajeev/Documents/Course/Hyperledger-Course/workspace/wip/HLF-API/ut-harness.js');

// This points to the model project folder
var modelFolder = __dirname+'/..';

var adminConnection = {}
var businessNetworkConnection = {}
var bnDefinition = {}



// Synchronous call so that connections can be established
before((done) => {
    utHarness.debug = false;
    utHarness.initialize(modelFolder, (adminCon, bnCon, definition) => {
        adminConnection = adminCon;
        businessNetworkConnection = bnCon;
        bnDefinition = definition;
        done();
    });
})

const nameSpace = 'org.example.biznet';
const resourceName = 'SampleAsset';

// Test Suite # 1
describe('Sample Asset # Add & Check', () => {

    // Test Case # 1
    // 1. Add an Asset of type "SampleAsset" with value="10"
    // 2. Get the asset instance that was added
    // 3. Assert Equal >> Value in received asset should be "10"
    it('should have 1 asset instance with value=10', () => {
        let registry ={}
        // Add the asset
        // Get the asset registry using the BN Connection
        return businessNetworkConnection.getAssetRegistry(nameSpace+'.'+resourceName).then((reg)=>{
            registry = reg;
            // Get the factory using the BN Definition
            const  factory = bnDefinition.getFactory();
            // Create the instance
            let    sampleAsset = factory.newResource(nameSpace,resourceName,'SA-1');
            sampleAsset.value='10';
            // Add to registry
            return registry.add(sampleAsset);
        }).then((asset)=>{

            // Get the asset now
            return registry.get('SA-1');
        }).then((asset)=>{

            // Assert
            assert.equal(asset.value,"10","Value not equal or undefined");
        }).catch((error)=>{
            console.log(error);
        });
    });


});


