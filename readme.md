# Vivid Randomization

This repository contains tools and code snippets for randomization of Vivid Gallery's collection. 

Please refer to each folder for the specific details of a project.


# Fair Distribution Process

How do we guarantee the fair distribution of the ordinals?

## 1. Process description

The process is very simple: using this source of randomness, we assign a random ordinal to each address and then we complete the airdrop process.

Since we don’t control the source of randomness this process is probably the fairest for everyone, including people participating in the WL sale in Magic Eden.

## 2. Transparent randomness

For our randomness processes we use seeded algorithms. This means that the randomness we use is repeatable and uniquely dependant of the seed. The natural candidate for a seed is the hash of a bitcoin block. By announcing in advance the block that will be used we can guarantee that we do not control the seed. In the end our randomness process is totally transparent and can be verified by anyone.


## 3. Public inputs 

By making the inputs of our algorithm, public we guarantee that we cannot alter the outcome of the algorithm. In our case the inputs are:
- The addresses that have participated to the private sale
- The inscriptions and their id on the blockchain

Everything is public and available in this repository before the distribution process.

Results are also available on https://app.vivid.gallery/distribution




