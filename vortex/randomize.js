const seedrandom = require("seedrandom");
const fs = require('fs');
const csv = require('csv-parser');
const path = require("path");

let addresses = [];
const batches = [
    {
        id:"6dd41ac917b8e5e03e341d4da6e903b3dd4cb56cde6f3cf6aea726fdcfc74682",
        amount: 6
    },
    {
        id:"9f08168dc9f8433c1d8e53226524de959ea9cdee497809831716b4f212085984",
        amount:113,
    }
]

fs.createReadStream(path.join(__dirname, 'addresses.csv'))
    .pipe(csv())
    .on('data', (row) => {
        if(row.addresses){

            addresses.push(row.addresses);
        }
    })
    .on('end', () => {
        const generator = seedrandom("HASH OF SELECT BLOCK");

        let randomAddresses = [];
        const addressesLength = addresses.length;

        for (let i = 0; i < addressesLength; i++) {
            let oldIndex = Math.abs(generator.int32()) % addresses.length;
            randomAddresses.push(addresses[oldIndex]); 
            addresses.splice(oldIndex, 1);
        }

        let addressesWithIds = {};

        randomAddresses.forEach((address, index) => {

            let id = ''
            let currentBatch = 0;
            let currentOffset = 0;

            for (let i = 0; i < batches.length; i++) {
                if (currentOffset + batches[i].amount > index) {
                    currentBatch = i;
                    break;
                }
                currentOffset += batches[i].amount;
            }

            id = `${batches[currentBatch].id}i${index - currentOffset+3}`;

            if (!addressesWithIds[address]) {
                addressesWithIds[address] = { ordinals: [], presales:0 }; 
            }
            addressesWithIds[address].presales++; 
            addressesWithIds[address].ordinals.push(id); 
        });

        fs.writeFile(path.join(__dirname, 'addressesWithIds.json'), JSON.stringify(addressesWithIds, null, 2), (err) => {
            if (err) {
                console.error('Error writing JSON file:', err);
            } else {
                console.log('Successfully saved addresses with IDs to addressesWithIds.json');
            }
        });
    });