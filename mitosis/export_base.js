const seedrandom = require("seedrandom");
const fs = require('fs');
const csv = require('csv-parser');
const path = require("path");

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
const addresses = [];

fs.createReadStream(path.join(__dirname, 'addresses.csv'))
    .pipe(csv())
    .on('data', (row) => {
        if(row.addresses){
            addresses.push(row.addresses);
        }
    })
    .on('end', () => {
        let addressesWithIds = {};


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
