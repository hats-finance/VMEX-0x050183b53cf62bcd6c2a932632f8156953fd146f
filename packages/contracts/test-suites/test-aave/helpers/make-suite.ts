import { evmRevert, evmSnapshot, DRE } from "../../../helpers/misc-utils";
import { Signer } from "ethers";
import {
  getLendingPool,
  getLendingPoolAddressesProvider,
  getAaveProtocolDataProvider,
  getAToken,
  getMintableERC20,
  getLendingPoolConfiguratorProxy,
  getPriceOracle,
  getLendingPoolAddressesProviderRegistry,
  getWETHMocked,
  getWETHGateway,
  getTricrypto2Strategy,
  getCurvePriceOracleWrapper,
  // getATokensAndRatesHelper,
} from "../../../helpers/contracts-getters";
import {
  eEthereumNetwork,
  eNetwork,
  tEthereumAddress,
} from "../../../helpers/types";
import { LendingPool } from "../../../types/LendingPool";
import { AaveProtocolDataProvider } from "../../../types/AaveProtocolDataProvider";
import { MintableERC20 } from "../../../types/MintableERC20";
import { AToken } from "../../../types/AToken";
import { LendingPoolConfigurator } from "../../../types/LendingPoolConfigurator";
import { CrvLpStrategy } from "../../../types/CrvLpStrategy";

import chai from "chai";
// @ts-ignore
import bignumberChai from "chai-bignumber";
import { almostEqual } from "./almost-equal";
import { PriceOracle } from "../../../types/PriceOracle";
import { LendingPoolAddressesProvider } from "../../../types/LendingPoolAddressesProvider";
import { LendingPoolAddressesProviderRegistry } from "../../../types/LendingPoolAddressesProviderRegistry";
import { getEthersSigners } from "../../../helpers/contracts-helpers";
import { UniswapLiquiditySwapAdapter } from "../../../types/UniswapLiquiditySwapAdapter";
import { UniswapRepayAdapter } from "../../../types/UniswapRepayAdapter";
import { ParaSwapLiquiditySwapAdapter } from "../../../types/ParaSwapLiquiditySwapAdapter";
import { getParamPerNetwork } from "../../../helpers/contracts-helpers";
import { WETH9Mocked } from "../../../types/WETH9Mocked";
import { WETHGateway } from "../../../types/WETHGateway";
import { solidity } from "ethereum-waffle";
import { AaveConfig } from "../../../markets/aave";
import { CurveWrapper, FlashLiquidationAdapter } from "../../../types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { usingTenderly } from "../../../helpers/tenderly-utils";
import { isHardhatTestingStrategies } from "../../../helpers/configuration";

chai.use(bignumberChai());
chai.use(almostEqual());
chai.use(solidity);

export interface SignerWithAddress {
  signer: Signer;
  address: tEthereumAddress;
}
export interface TestEnv {
  deployer: SignerWithAddress;
  users: SignerWithAddress[];
  pool: LendingPool;
  configurator: LendingPoolConfigurator;
  // aTokensAndRatesHelper: ATokensAndRatesHelper;
  oracle: PriceOracle;
  curveOracle: CurveWrapper;
  helpersContract: AaveProtocolDataProvider;
  weth: WETH9Mocked;
  aWETH: AToken;
  dai: MintableERC20;
  aDai: AToken;
  usdc: MintableERC20;
  aave: MintableERC20;
  tricrypto2: MintableERC20;
  tricrypto2Strategy: CrvLpStrategy;
  addressesProvider: LendingPoolAddressesProvider;
  uniswapLiquiditySwapAdapter: UniswapLiquiditySwapAdapter;
  uniswapRepayAdapter: UniswapRepayAdapter;
  registry: LendingPoolAddressesProviderRegistry;
  wethGateway: WETHGateway;
  flashLiquidationAdapter: FlashLiquidationAdapter;
  paraswapLiquiditySwapAdapter: ParaSwapLiquiditySwapAdapter;
}

let buidlerevmSnapshotId: string = "0x1";
const setBuidlerevmSnapshotId = (id: string) => {
  buidlerevmSnapshotId = id;
};

const testEnv: TestEnv = {
  deployer: {} as SignerWithAddress,
  users: [] as SignerWithAddress[],
  pool: {} as LendingPool,
  configurator: {} as LendingPoolConfigurator,
  // aTokensAndRatesHelper: {} as ATokensAndRatesHelper,
  helpersContract: {} as AaveProtocolDataProvider,
  oracle: {} as PriceOracle,
  curveOracle: {} as CurveWrapper,
  weth: {} as WETH9Mocked,
  aWETH: {} as AToken,
  dai: {} as MintableERC20,
  aDai: {} as AToken,
  usdc: {} as MintableERC20,
  aave: {} as MintableERC20,
  tricrypto2: {} as MintableERC20,
  tricrypto2Strategy: {} as CrvLpStrategy,
  addressesProvider: {} as LendingPoolAddressesProvider,
  uniswapLiquiditySwapAdapter: {} as UniswapLiquiditySwapAdapter,
  uniswapRepayAdapter: {} as UniswapRepayAdapter,
  flashLiquidationAdapter: {} as FlashLiquidationAdapter,
  paraswapLiquiditySwapAdapter: {} as ParaSwapLiquiditySwapAdapter,
  registry: {} as LendingPoolAddressesProviderRegistry,
  wethGateway: {} as WETHGateway,
} as TestEnv;

export async function initializeMakeSuite() {
  const [_deployer, ...restSigners] = await getEthersSigners();
  const deployer: SignerWithAddress = {
    address: await _deployer.getAddress(),
    signer: _deployer,
  };

  for (const signer of restSigners) {
    testEnv.users.push({
      signer,
      address: await signer.getAddress(),
    });
  }
  testEnv.deployer = deployer;
  testEnv.pool = await getLendingPool();

  testEnv.configurator = await getLendingPoolConfiguratorProxy();
  // testEnv.aTokensAndRatesHelper = await getATokensAndRatesHelper();

  testEnv.addressesProvider = await getLendingPoolAddressesProvider();

  if (process.env.FORK) {
    testEnv.registry = await getLendingPoolAddressesProviderRegistry(
      getParamPerNetwork(
        AaveConfig.ProviderRegistry,
        process.env.FORK as eNetwork
      )
    );
  } else {
    testEnv.registry = await getLendingPoolAddressesProviderRegistry();
    testEnv.oracle = await getPriceOracle();
    testEnv.curveOracle = await getCurvePriceOracleWrapper();
  }

  testEnv.helpersContract = await getAaveProtocolDataProvider();

  const allTokensT0 = await testEnv.helpersContract.getAllATokens("0");
  const aDaiAddress = allTokensT0.find(
    (aToken) => aToken.symbol === "aDAI0"
  )?.tokenAddress; //choose tranche

  const aWEthAddress = allTokensT0.find(
    (aToken) => aToken.symbol === "aWETH0"
  )?.tokenAddress;

  const reservesTokensT0 = await testEnv.helpersContract.getAllReservesTokens(
    "0"
  );

  const daiAddress = reservesTokensT0.find(
    (token) => token.symbol === "DAI"
  )?.tokenAddress;
  const usdcAddress = reservesTokensT0.find(
    (token) => token.symbol === "USDC"
  )?.tokenAddress;
  const aaveAddress = reservesTokensT0.find(
    (token) => token.symbol === "AAVE"
  )?.tokenAddress;
  const wethAddress = reservesTokensT0.find(
    (token) => token.symbol === "WETH"
  )?.tokenAddress;
  if (!aDaiAddress || !aWEthAddress) {
    process.exit(1);
  }
  if (!daiAddress || !usdcAddress || !aaveAddress || !wethAddress) {
    process.exit(1);
  }

  const reservesTokensT1 = await testEnv.helpersContract.getAllReservesTokens(
    "1"
  );

  const tricrypto2Address = reservesTokensT1.find(
    (token) => token.symbol === "Tricrypto2"
  )?.tokenAddress;

  if (!tricrypto2Address) {
    process.exit(1);
  }

  if (isHardhatTestingStrategies)
    testEnv.tricrypto2Strategy = await getTricrypto2Strategy();

  testEnv.aDai = await getAToken(aDaiAddress);
  testEnv.aWETH = await getAToken(aWEthAddress);

  testEnv.dai = await getMintableERC20(daiAddress);
  testEnv.usdc = await getMintableERC20(usdcAddress);
  testEnv.aave = await getMintableERC20(aaveAddress);
  testEnv.weth = await getWETHMocked(wethAddress);
  testEnv.wethGateway = await getWETHGateway();

  testEnv.tricrypto2 = await getMintableERC20(tricrypto2Address);

  //CURVE TODO: these are not deployed when running mainnet fork in localhost
  // testEnv.uniswapLiquiditySwapAdapter = await getUniswapLiquiditySwapAdapter();
  // testEnv.uniswapRepayAdapter = await getUniswapRepayAdapter();
  // testEnv.flashLiquidationAdapter = await getFlashLiquidationAdapter();

  // testEnv.paraswapLiquiditySwapAdapter =
  //   await getParaSwapLiquiditySwapAdapter();
}

const setSnapshot = async () => {
  const hre = DRE as HardhatRuntimeEnvironment;
  if (usingTenderly()) {
    setBuidlerevmSnapshotId((await hre.tenderlyNetwork.getHead()) || "0x1");
    return;
  }
  setBuidlerevmSnapshotId(await evmSnapshot());
};

const revertHead = async () => {
  const hre = DRE as HardhatRuntimeEnvironment;
  if (usingTenderly()) {
    await hre.tenderlyNetwork.setHead(buidlerevmSnapshotId);
    return;
  }
  await evmRevert(buidlerevmSnapshotId);
};

export function makeSuite(name: string, tests: (testEnv: TestEnv) => void) {
  describe(name, () => {
    before(async () => {
      await setSnapshot();
    });
    tests(testEnv);
    after(async () => {
      await revertHead();
    });
  });
}
