import { HardhatUserConfig } from 'hardhat/types';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import 'temp-hardhat-etherscan';
import 'hardhat-gas-reporter';
import 'hardhat-typechain';
import '@tenderly/hardhat-tenderly';
import "hardhat-deploy";
import 'solidity-coverage';
declare const buidlerConfig: HardhatUserConfig;
export default buidlerConfig;
