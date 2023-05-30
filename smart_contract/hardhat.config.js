require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config({ path: ".env" });
/** @type import('hardhat/config').HardhatUserConfig */

const XINFIN_NETWORK_URL = process.env.XINFIN_NETWORK_URL;
const XINFIN_PRIVATE_KEY = process.env.XINFIN_PRIVATE_KEY;
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    xinfin: {
      url: "https://erpc.apothem.network",
      accounts: ["c266b41c55a47b4c0edd1e31db6808991a38d88697c16db3d699976513d850cd"],
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};
