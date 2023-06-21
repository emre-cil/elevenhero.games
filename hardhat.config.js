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
      accounts: ['dbfa460768de88c6b3cdae4402e8d742ce0dda1b8771bccaffca5edaa6df6114'],
    },
  },
};
// 0x2269BE6442BFE7FF60Ff41dC457D629688676f00\
// accounts: ['c481dff170f741e8bed796d5494cfb475059c6602afa39740022c869794e3f96'],
