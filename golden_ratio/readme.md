# Golden Ratio Randomization

Golden Ratio artworks that have been sold during the presale or airdropped to SATs holders need to be randomized to provide fair chances for everyone.

To do that every buyer will be assigned a number (or multiple numbers if you bought more than one), then the numbers will be shifted by random number.

The random number that will be used will be determined by a seed random number generator (seedrandom package on npm).

The seed that will be used will be the blockhash of an announced Bitcoin block. This ensure that the seed is random since there is no possibility for us to know the blockhash in advance nor to influence the blockhash of a certain block.

Please check [Twitter/X](https://twitter.com/vivid_ordinals) or [Discord](https://discord.gg/g6GM8Jd2) for the block number.

Please check [this Google Sheet](https://docs.google.com/spreadsheets/d/1EGQc-NZJFymYwhv18y1MiX229UfI5oQRKa1rHU-Kzb0/edit?usp=sharing) to see what is your final id.

EDIT: The chosen block was 819726, with blockchash 0000000000000000000028e081c24aeea8890a89dea3bf82b3e585784ca063cd [check here](https://mempool.space/block/0000000000000000000028e081c24aeea8890a89dea3bf82b3e585784ca063cd)

The resulting shift is 296.

## Example

With block 819580, the blockhash is: 0000000000000000000092519d5011f4ea65416bec2886769d76de65ac064e69

The resulting shift would be 114.

