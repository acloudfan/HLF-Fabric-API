/**
 * Part of a course on Hyperledger Fabric: 
 * http://ACloudFan.com
 * 
 * This demonstrates the use of Chai Assertion Library       
 * http://chaijs.com/
 * 
 */

var assert = require('chai').assert;

// This statement is for Mocha test suite
describe('Suite-1',()=>{


    it('Test case # 1 *Assertion* style',()=>{
        // Test case passes if expression evaluates to true
        assert(true);

        // .equal(actual, expected, [message])
        assert.equal(true, true, 'otherwise problem');

        // .exists(value, [message])
        assert.exists(true, 'otherwise problem');

        // .operator(val1, operator, val2, [message])
        assert.operator(10, ">", 5, 'otherwise problem');

        // Check the documentation here for complete list
        // http://chaijs.com/api/assert/
    });

});



