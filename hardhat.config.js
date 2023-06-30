import '@nomicfoundation/hardhat-web3';
/** @type import('hardhat/config').HardhatUserConfig */
export default {
  solidity: '0.8.17',
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    matic: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/oT188NmpOFYow2ixcuT6MKWs9lmbYjdS',
      accounts: ['key'],
    },
  },
};
