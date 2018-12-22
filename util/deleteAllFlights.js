/**
 * Tested with Composer 0.20.5
 * 
 * Utility method for cleaning up the flights
 */
const bnUtil = require('../bn-connection-util');
const flightNamespace = 'org.acme.airline.flight';
const resourceName = 'Flight';

bnUtil.cardName='admin@airlinev8';
if(process.argv.length < 3){
    console.log("Usage: node populate-acme-airline   <card-name> ")
    console.log("Populating Network using a card: ",bnUtil.cardName);
} else {
    bnUtil.cardName = process.argv[2];
    console.log("Populating Network using a card: ",bnUtil.cardName);
}
bnUtil.connect(main);



function main(){
    var registry = {}

    return bnUtil.connection.getAssetRegistry(flightNamespace+'.'+resourceName).then((reg)=>{
        registry = reg;

        console.log('Received Registry: ', registry.id);

        return registry.getAll();
    }).then((flights)=>{
        console.log('Retrieved flights : ', flights.length);
        // Utility method for adding the aircrafts
        return registry.removeAll(flights)

    }).then(()=>{

        console.log("Removed all flights !!");
        bnUtil.disconnect();
        
    }).catch((error)=>{

        console.log(error);
        bnUtil.disconnect();
    });
}