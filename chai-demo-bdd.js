/**
 * Part of a course on Hyperledger Fabric: 
 * http://ACloudFan.com
 * 
 * This demonstrates the use of Chain Assertion Library       
 * http://chaijs.com/
 * 
 * Pre-Rquisite: Please review the mocha-demo lecture
 */

// BDD style:
var expect = require('chai').expect;
// Or
var should = require('chai').should;

// This statement is for Mocha test suite
describe('Suite-1',()=>{


    it('Test case # 1 *BDD* style',()=>{
        
        // Test case passes if expression evaluates to true
        expect(true);

        // equality
        expect(true).to.equal(true);

        // exist = defines i.e., not null
        expect('object').to.exist;

        // substring string check
        expect('foobar').to.have.string('bar');
    });

    // Check the documentation here for complete list
    // http://chaijs.com/api/bdd/
});