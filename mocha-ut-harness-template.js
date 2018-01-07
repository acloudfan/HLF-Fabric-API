/**
 * Part of a course on Hyperledger Fabric: 
 * http://ACloudFan.com
 * 
 * Use this as a template for your own unit test cases
 */
var assert = require('chai').assert;


const utHarness = require('./ut-harness');

// This points to the model project folder
var modelFolder = 'C:/Users/Rajeev/Documents/Course/Hyperledger-Course/workspace/HLF-Course-Domain-Model/airlinev7';

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


// Test Suite # 1
describe('Give information on the test case', () => {

    // Synchronous
    beforeEach((done) => {
        // Move the initialize here if you would like to 
        // initialize runtime everytime before each test 
        // case
        done()
    });

    // Test Case # 1
    it('should have more that 1 registry', () => {
        // Your test code goes here

        // expression in assert 
        assert(true)
    });

    // Test Case # 2
    it('should have more that 2 registry', () => {
        // Your test code goes here
        
        // expression in assert 
        assert(true)
    });
});


