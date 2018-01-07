'use strict';
/**
 * Part of a course on Hyperledger Fabric: 
 * http://ACloudFan.com
 * 
 * Exercise:
 * Create a new flight resource instance and add it to the Flight Registry
 */


 // Parameter is a AssetRegistry
function addFlight(registry){
    const  bnDef = bnUtil.connection.getBusinessNetwork();
    const  factory = bnDef.getFactory();
    let    flightResource = factory.newResource(aircraftNamespace,aircraftType,'AE201-05-05-2020');
    flightResource.setPropertyValue('flightNumber','AE101');
    flightResource.route = factory.newConcept(aircraftNamespace,'Route');
    flightResource.route.setPropertyValue('origin', 'EWR');
    flightResource.route.setPropertyValue('destination' , 'ATL');
    flightResource.route.setPropertyValue('schedule' , new Date('2018-10-15T21:44Z'));

    return registry.add(flightResource).then(()=>{
        console.log('Successfully created the flight!!!');
        bnUtil.disconnect();
    }).catch((error)=>{
        console.log(error);
       bnUtil.disconnect();
    });
}