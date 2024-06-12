const seedrandom = require("seedrandom");
const fs = require('fs');
const csv = require('csv-parser');
const path = require("path");

const batches = [
    
    {
        id:'52bd5e1b1d89d3308bc62d988aab336805b9644e451369795ec723ce07bcb0fa',
        amount:400
    }
]
const addresses = [];

fs.createReadStream(path.join(__dirname, 'addresses.csv'))
    .pipe(csv())
    .on('data', (row) => {
    if(row.addresses && row.addresses.trim()){
            addresses.push(row.addresses);
        }
    })
    .on('end', () => {
        let addressesWithIds = {};

        console.log("Total addresses:", addresses.length);


        addresses.forEach((address, index) => {

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
        });

        fs.writeFile(path.join(__dirname,'base.json'), JSON.stringify(addressesWithIds, null, 2), (err) => {
            if (err) {
                console.error('Error writing JSON file:', err);
            } else {
                console.log('Successfully saved addresses with IDs to addressesWithIds.json');
            }
        });
    });
