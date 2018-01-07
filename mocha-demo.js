/**
 * Part of a course on Hyperledger Fabric: 
 * http://ACloudFan.com
 * 
 * This demonstrates the use of Mocha Test Framework          
 * https://mochajs.org/
 * 
 * By default all executions are asynchrnonous but using the done in callback one can 
 * change the behavior of the before/beforeEach/after to synchronous
 */


/**
 * Suite of tests
 */
describe('Enclosing Suite', () => {

    /**
    * This is invoked before any test is executed
    */

    // ASynchronous
    before(() => {
        // This gets executed asynchronously before every test suite
        console.log("before() the test cases are executed");
    });

    /**
    * This is invoked before any test is executed
    */
    beforeEach(() => {
        console.log("\tbeforeEach() executed");
    });

    // Test suite-1
    describe('Suite-1', () => {

        // Test case # 1
        it('Test Case# 1', () => {

        });

        // Test case # 2
        it('Test Case# 2', () => {

        });
    });

    // Test suite-2
    describe('Suite-2', () => {
        it('Test Case# 1', () => {
            
        });
    });

    /**
     * This is invoked at the end of all the test execution
     */
    after(() => {
        console.log("after() executed");
    });

});