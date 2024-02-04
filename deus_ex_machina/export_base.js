const seedrandom = require("seedrandom");
const fs = require('fs');
const csv = require('csv-parser');
const path = require("path");

let addresses = [];

fs.createReadStream("./deus_ex_machina/addresses.csv")
    .pipe(csv())
    .on('data', (row) => {
        addresses.push(row.addresses);
    })
    .on('end', () => {
        let addressesWithIds = {};

        addresses.forEach((address, index) => {
            const id = `9119da1b4289dae536b15c0efe4b68503194097107412f60489c68e97b484434i${index}`;
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
