import { deployments } from "./constants";
import "@vmex/contracts/artifacts/contracts/misc/WalletBalanceProvider.sol/WalletBalanceProvider.json";
import { BigNumber, ethers } from "ethers";
import { getLendingPoolImpl, getUnsignedLP, approveUnderlying } from "./utils";

/**
 * calcProtocolTVL()
 * @params { network: string, test: bool }
 * @returns uint(aTokens, underlying)
 * returns a tuple containing the sum of all aTokens in all pools - reflects total supplied, and the sum of underlying amounts - reflecting total borrowed
 */
export async function calcProtocolTVL(params?: {
    network?: string;
    test: boolean;
}, callback?: () => Promise<any>) {
    const _lp = getUnsignedLP({ network: params.network || undefined, test: params.test });
    // TODO: implement protocol tvl calculation function from lending pool contract 
}


/**
 * userAggregatedTrancheData
 * @params { signer: ethers.Signer, tranche: number, network?: string }
 * @returns Promise { 
 *  totalCollateralETH: BigNumber
 *  totalDebtETH: BigNumber
 *  availableBorrowsETH: BigNumber
 *  currentLiquidationThreshold: BigNumber
 *  ltv: BigNumber
 *  healthFactor: BigNumber
 * }
 */
export async function userAggregatedTrancheData( params: { 
    signer: ethers.Signer;
    tranche: number;
    network?: string;
    test?: boolean;
}, callback?: () => Promise<any>) {
    const lendingPool = await getLendingPoolImpl(params.signer, params.network || "mainnet");
    return await lendingPool.getUserAccountData(await params.signer.getAddress(), params.tranche);
}

/**
 * userTrancheBalances
 * @params { signer: ethers.Signer, tranche: number, network?: string }
 * @returns tuple(address, uint256)[];
 */
export async function userTrancheBalances( params: {
    signer: ethers.Signer,
    tranche: number,
    network?: string
}, callback?: () => Promise<any> ) {
    const provider = deployments.LendingPoolAddressesProvider[`${params.network || "localhost"}`].address;
    const _balanceProviderAddress = deployments.WalletBalanceProvider[`${params.network || "localhost"}`].address;
    const { abi } = require("@vmex/contracts/artifacts/contracts/misc/WalletBalanceProvider.sol/WalletBalanceProvider.json");

    const balanceProvider = new ethers.Contract(_balanceProviderAddress, abi, params.signer);
    return await balanceProvider.getUserWalletBalances(provider, await params.signer.getAddress(), params.tranche);
}


/**
 * getUserReserveConfig
 * @params { signer: ethers.Signer, underlying: address, network?: string }
 */

// export async function totalTranches(params?: {
//     network: string;
//     test: boolean;
// }, callback?: () => Promise<BigNumber>) {
//     let configurator = await getLendingPoolConfiguratorProxy();
//     return configurator.totalTranches;
//     //sum of atoken amounts in all pools (this will reflect total supplied)? Or sum of actual underlying amounts (which will be total supplied - total borrowed). 
// }

// export async function totalMarkets(params?: {
//     network: string;
//     test: boolean;
// }, callback?: () => Promise<BigNumber>) {
//     let configurator = await getLendingPoolConfiguratorProxy();
//     return configurator.totalTranches;
//     //sum of atoken amounts in all pools (this will reflect total supplied)? Or sum of actual underlying amounts (which will be total supplied - total borrowed). 
// }

//tranche level


// //user level (querying by wallet address)
//  export async function userInfo(params: {
//     underlying: string;
//     trancheId: string;
//     signer: ethers.Signer; //assume signer is also address that you want
//     network?: string;
//     test?: boolean;
// }, callback?: () => Promise<UserReserveData>) {
//     let lendingPool = await getLendingPool();
//     let helpersContract = await getAaveProtocolDataProvider();
    
//     return getUserData(lendingPool, helpersContract, params.underlying, params.trancheId, await params.signer.getAddress() );
// }

