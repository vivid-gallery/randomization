# FloraForms Randomization

## 0. Block used as source of randomness

We will be using block 830364 which at the time of this commit has not been minted yet.

This guarantees that we do not control the seed used for selecting the inscriptions used for the presale and the ones used for the public sale.




How do we guarantee the fair distribution of the ordinals?

## 1. Transparent randomness

For our randomness processes we use seeded algorithms. This means that the randomness we use is repeatable and uniquely dependant of the seed. The natural candidate for a seed is the hash of a bitcoin block. By announcing in advance the block that will be used we can guarantee that we do not control the seed. In the end our randomness process is totally transparent and can be verified by anyone.


## 2. Public inputs 

By making the inputs of our algorithm, public we guarantee that we cannot alter the outcome of the algorithm. In our case the inputs are:
- The addresses that have participated to the private sale
- The inscriptions and their id on the blockchain

Everything is public and available in this repository before the distribution process.

