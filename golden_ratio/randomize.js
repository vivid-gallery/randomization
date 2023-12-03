const seedrandom = require("seedrandom")

const generator = seedrandom("BLOCK_HASH")

const shift = Math.abs(generator.int32()) % 420;

console.log("Shift is", shift)

