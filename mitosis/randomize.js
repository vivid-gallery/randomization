const seedrandom = require("seedrandom");
const fs = require('fs');
const csv = require('csv-parser');
const path = require("path");

let addresses = [];
const batches = [
    {
        id:"5c9468a267f7c781a02fad24b33939c6d06df200ef57ae1f2923b4c8c654ab26",
        amount:10
    },
    {
        id:'498aae35abc985d1e4e914ac1e01f91e9b74a5a63d755fea22ceee427636871a',
        amount:390
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
        const generator = seedrandom("00000000000000000001ffaf30b46acdf5e38fcacea9afdec9eccb82d62b81d2");

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

            id = `${batches[currentBatch].id}i${index - currentOffset}`;

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
