'use strict';
/**
 * Part of a course on Hyperledger Fabric: 
 * http://ACloudFan.com
 * 
 * Last Update: Dec 21, 2018
 * Tested with: 0.20.5
 * 
 * Sample shows how to use asset registry for adding new instances 
 * of resources. Code creates 2 instances of the Aircraft asset and
 * adds to the AssetRegistry by invoking the addAll() function.
 * 
 * Please note that if the Aircraft with ID = CRAFT01 | CRAFT02 already
 * exist then the call to addAll() will fail.
 * 
 * Execution environment
 * =====================
 * 1. Fabric runtime is up
 * 2. aircraftv7 deployed
 * 3. No asset in the flight registry for CRAFT01, CRAFT02
 * 
 * Demo Steps
 * ==========
 * 1. Connect using the bn-connection-util
 * 2. Get the AssetRegistry from connection
 * 3. Create 2 instances of Aircraft resource using the factory & initialize
 * 4. Invoke registry.addAll([Array of Aircraft resource instances])
 */

const aircraftNamespace = 'org.acme.airline.aircraft';
const aircraftType = 'Aircraft';

// 1. Connect
const bnUtil = require('./bn-connection-util');
bnUtil.connect(main);

function main(error){
    // Check for the connection error
    if(error){
        console.log(error);
        process.exit(1);
    }

    // 2. Get the aircraft AssetRegistry
    return bnUtil.connection.getAssetRegistry(aircraftNamespace+'.'+aircraftType).then((registry)=>{
        console.log('1. Received Registry: ', registry.id);

        // Utility method for adding the aircrafts
        addAircrafts(registry);

    }).catch((error)=>{
        console.log(error);
       // bnUtil.disconnect();
    });
}

/**
 * Creates two resources instances CRAFT01 & CRAFT02
 * @param {*} registry This is of type AssetRegistry
 */
function    addAircrafts(registry){
    // 3. This Array will hold the instances of aircraft resource
    let    aircrafts = [];
    const  bnDef = bnUtil.connection.getBusinessNetwork();
    const  factory = bnDef.getFactory();
    // Instance#1
    let    aircraftResource = factory.newResource(aircraftNamespace,aircraftType,'CRAFT01');
    aircraftResource.setPropertyValue('ownershipType','LEASED');
    aircraftResource.setPropertyValue('firstClassSeats',10);
    aircraftResource.setPropertyValue('businessClassSeats',10);
    aircraftResource.setPropertyValue('economyClassSeats',50);
    // Push instance to  the aircrafts array
    aircrafts.push(aircraftResource);

    // Instance#2 
    aircraftResource = factory.newResource(aircraftNamespace,aircraftType,'CRAFT02');
    // You may use direct assignment instead of using the setPropertyValue()
    aircraftResource.ownershipType='OWNED';
    aircraftResource.firstClassSeats=15
    aircraftResource.businessClassSeats=20;
    aircraftResource.economyClassSeats=100;
    // Push instance to  the aircrafts array
    aircrafts.push(aircraftResource);

    // 4. Add the Aircraft resource to the registry
    return registry.addAll(aircrafts).then(()=>{
        console.log('Added the Resources successfully!!!');
        bnUtil.disconnect();
    }).catch((error)=>{
        console.log(error);
        bnUtil.disconnect();
    });
}

