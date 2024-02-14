const fs = require('fs');
const path = require("path");
const seedrandom = require("seedrandom");


const RESERVE_FOR_PRESALE = 600

const batches = [
    {
        id: "0721c49b95378b326ce5411b5b05e9a32ab269f5611a2ef98baa91d635dc9b05",
        amount: 590
    }, 
    {
        id: "a6bda68a2316a66ef1e6ade5f7c1bddfb0cc07d8bd8d345d1d2b9263f795a225",
        amount: 1000
    },
    {
        id: "bc896d57f1fe99a2eedd7846de557a2817123a94fc3d42c2e8e9ae24e00eccab",
        amount: 1000
    },
    {
        id: "ffa4ed28354463a2498902a22f25283e6ece69fa9c6d5383bede8b822f465553",
        amount: 1000
    },
    {
        id: "3f7504038e8a79b365867b6bdf98e111b95e988636ffaad6e6e7e77a6474e19f",
        amount: 1000
    },
    {
        id: "ddca6c73fc1337692562455793338e5283bdc7fd7e780d584187d630c8c1ebf6",
        amount: 1000
    },
    {
        id: "e27a6968604b0417b617099e494e21368e6517c310607f200c806049fde776ee",
        amount: 1000
    }, 
    {
        id: "937939794fb2112781ee3868835a528e1830380c0fd952e3d260c0be7016f795",
        amount: 1000
    },
    {
        id: "1d38e3b6c7b590f2a2af897a9cc9bd9e399ea859988070d523b59263e551ca6e",
        amount: 1000
    },
    {
        id: "5ca65191fe8ce6d40a45d5585265c61d68365578736d8f4dbaaaacae67a898e9",
        amount: 1000
    },
    {
        id: "4bd7803823966ee77381fd2cbfae0d3d6e49045c34f31bedc26a57b26c25903a",
        amount: 400
    }
]

let ids = []

let presaleIds = []
let launchIds = []

const generator = seedrandom("00000000000000000003a4e4d367a836b32a229a7c1d023ddedcf265e4993c0a");

for(const batch of batches){

    for (let i = 0; i < batch.amount; i++) {
        ids.push(`${batch.id}i${i}`)
    }
}

for (let i = 0; i < RESERVE_FOR_PRESALE; i++) {
    
    let randIndex = Math.abs(generator.int32()) % ids.length;
    presaleIds.push(ids[randIndex]); 
    ids.splice(randIndex, 1);
}

fs.writeFileSync(path.join(__dirname,'presaleIds.json'), JSON.stringify(presaleIds, null, 2))
fs.writeFileSync(path.join(__dirname,'launchIds.json'), JSON.stringify(ids, null, 2))

