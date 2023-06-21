const hre = require('hardhat');

async function main() {
  const a = await hre.ethers.getContractFactory('ELEVENHERO');
  const b = await a.deploy();

  await b.deployed();

  console.log('My NFT deployed to:', b.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
