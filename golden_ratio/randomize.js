const seedrandom = require("seedrandom")

const generator = seedrandom("0000000000000000000028e081c24aeea8890a89dea3bf82b3e585784ca063cd")

const shift = Math.abs(generator.int32()) % 420;

console.log("Shift is", shift)

//SHift is 296
