const seedrandom = require("seedrandom")

const generator = seedrandom("BITCOIN_BLOCK_HASH")

const shift = generator.int32() % 420;

console.log("Shift is", shift)
