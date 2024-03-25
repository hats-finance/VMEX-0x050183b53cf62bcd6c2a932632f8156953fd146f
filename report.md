# **VMEX Audit Competition on Hats.finance** 


## Introduction to Hats.finance


Hats.finance builds autonomous security infrastructure for integration with major DeFi protocols to secure users' assets. 
It aims to be the decentralized choice for Web3 security, offering proactive security mechanisms like decentralized audit competitions and bug bounties. 
The protocol facilitates audit competitions to quickly secure smart contracts by having auditors compete, thereby reducing auditing costs and accelerating submissions. 
This aligns with their mission of fostering a robust, secure, and scalable Web3 ecosystem through decentralized security solutions​.

## About Hats Audit Competition


Hats Audit Competitions offer a unique and decentralized approach to enhancing the security of web3 projects. Leveraging the large collective expertise of hundreds of skilled auditors, these competitions foster a proactive bug hunting environment to fortify projects before their launch. Unlike traditional security assessments, Hats Audit Competitions operate on a time-based and results-driven model, ensuring that only successful auditors are rewarded for their contributions. This pay-for-results ethos not only allocates budgets more efficiently by paying exclusively for identified vulnerabilities but also retains funds if no issues are discovered. With a streamlined evaluation process, Hats prioritizes quality over quantity by rewarding the first submitter of a vulnerability, thus eliminating duplicate efforts and attracting top talent in web3 auditing. The process embodies Hats Finance's commitment to reducing fees, maintaining project control, and promoting high-quality security assessments, setting a new standard for decentralized security in the web3 space​​.

## VMEX Overview

No description available.

## Competition Details


- Type: A public audit competition hosted by VMEX
- Duration: 2 weeks
- Maximum Reward: $67,501
- Submissions: 59
- Total Payout: $33,007.99 distributed among 8 participants.

## Scope of Audit

No scope available.

## High severity issues


- **Incorrect Validation of aToken in IncentivesController Allows Impersonation and Reward Theft**

  The identified issue lies in the `IncentivesController.handleAction()` where there's no proper checks to ascertain that `msg.sender` is actually a valid `aToken`. This provides scope for anyone to impersonate an `aToken` and steal rewards from the `IncentivesController`. The issue demonstrates an attack scenario with a contract, where the attacker impersonates an `aToken` and makes calls to steal rewards. This happens because while handling the action, the system doesn't check whether the acting aToken is the same as the existing aToken. The attacker then withdraws the stolen rewards out of the impersonated contract.

The recommended fix is to ensure that the caller of `IncentivesController.handleAction()` is indeed an existing `aToken`. This could potentially be done within `ExternalRewardsDistributor.stakingExists()`. The reported issue has been acknowledged and a proposed change to the corresponding accounting has been made so that the reward contract is stored per `aToken`, which is expected to resolve the access control issue.


  **Link**: [Issue #14](https://github.com/hats-finance/VMEX-0x050183b53cf62bcd6c2a932632f8156953fd146f/issues/14)


- **VMEX Team's LP Share Price Calculation Method Fails for Velo Stable Pools**

  The issue points to a potentially significant flaw in the VMEX protocol when using Velo LP tokens, a lending protocol asset. The problem relates to the calculation of the LP share price in the VelodromeOracle library. The formula they used does consider spot reserve manipulation, but it struggles when applied to the two types of pools supported by Velodrome: stable pools (SPs) and variable pools (VPs). 

While VPs follow Uniswap's 'xy=k' curve, SPs adhere to the 'x³y + y³x = k' curve. This difference, while seemingly minor, leads to discrepancies when a large swap is executed. The formula manages to maintain consistent LP share prices in VPs, despite significant swaps. However, the fixed 'k value' doesn't hold true in the case of SPs, making the LP share price susceptible to swing with reserves. 

An attacker exploiting this flaw could carry out the following steps: Swap X -> Y, Liquidate all positions or Borrow LP shares, Swap Y ->X, to achieve a profit equal to the liquidation fees - swap fees. The original author recommends refactoring the formula to make it dynamic. This could be achieved by fetching k from the Velodrome pool and then opting for a different calculation process for the stable pools.


  **Link**: [Issue #24](https://github.com/hats-finance/VMEX-0x050183b53cf62bcd6c2a932632f8156953fd146f/issues/24)

## Low severity issues


- **Liquidations Paused when Chainlink Oracle Goes Offline Without Fallback**

  The issue revolves around the Chainlink oracle pausing, causing asset liquidations and borrowing to freeze. The problem arises during the liquidation and borrowing calls; there's no fallback implemented, so when Chainlink is offline, these actions are halted. This can potentially lead to insolvency during critical periods. The proposed solution is to encapsulate Chainlink’s price retrieving function in a try-catch block and consider a fallback oracle. However, there's ongoing debate over best practices, noting some protocols operate without such a safeguard.


  **Link**: [Issue #3](https://github.com/hats-finance/VMEX-0x050183b53cf62bcd6c2a932632f8156953fd146f/issues/3)


- **Issue with Tokens Not Returning Bool Resulting in Contract Failure**

  This issue explains that tokens which don't return a `bool` will fail as the contract uses `approve` instead of `safeApprove`. The point of concern was noticed in the ExternalRewardDistributor.sol contract. The issue is classified as low as no tokens will be lost because the admin cannot add the token. A suggested mitigation is to use safeERC20 from OZ.


  **Link**: [Issue #5](https://github.com/hats-finance/VMEX-0x050183b53cf62bcd6c2a932632f8156953fd146f/issues/5)


- **Issue: Whitelisted Addresses Can Result in Out of Gas Error in VMEX Finance Protocol**

  In the VMEX finance loaning system, there's an issue where whitelisted addresses are allowed to create tranches and call "`claimTrancheId()`" to increase the "`totalTranches`" number. This count is used in another function, "`setAssetAllowed()`", to enable assets on the protocol. If the "`totalTranches`" count becomes high, any attempts to set assets as allowed may cause the system to exceed its gas limit due to increased loop iteration, therefore causing failure.


  **Link**: [Issue #7](https://github.com/hats-finance/VMEX-0x050183b53cf62bcd6c2a932632f8156953fd146f/issues/7)


- **VMEX Assumption of 8 Decimals in USD Feeds Can Lead to Incorrect Collateral Value Calculation**

  VMEX assumes all USD feeds have 8 decimals, however, this varies sometimes; for example, the AMPL/USD feed on mainnet uses 18 decimals. This mismatch can lead to miscalculations in value for collateral. The issue might not be widespread, but it can impact tokens supported by platforms like AAVE. Recommended solutions include normalizing prices in the `getAssetPrice()` function or verifying equal decimals of price feed to base asset within the `setAssetSources()`.


  **Link**: [Issue #13](https://github.com/hats-finance/VMEX-0x050183b53cf62bcd6c2a932632f8156953fd146f/issues/13)


- **IncentivesController.sol Needs Update on claimAllRewards for Accrued Rewards and Timestamps**

  In the IncentivesController.sol code, there's an issue where accrued rewards and rewards timestamps aren't updated when the 'claimAllRewards' function is called simply because '_batchUpdate(user, userState)' is not used within this function. Additionally, it's identified that 'reward.lastUpdateTimestamp' isn't updated correctly which leads to ineffectiveness. It's recommended to add '_batchUpdate(user, userState)' to 'claimAllRewards' function to address this issue.


  **Link**: [Issue #38](https://github.com/hats-finance/VMEX-0x050183b53cf62bcd6c2a932632f8156953fd146f/issues/38)


- **Issue with Reward Calculation in DistributionManager.sol Resulting in Gas Overpayment**

  The issue discusses a problem with the reward calculation in `configureRewards()` in `DistributionManager.sol` which can be triggered by the `EMISSION_MANAGER`. The issue arises when the same reward data is pushed to the array more than once if it's used as reward for multiple incentivized assets. It results in a double accounting of reward tokens in `_allRewards` causing issues in `IncentivesController:getPendingRewards()` and `IncentivesController:claimAllRewards()`. A recommended solution suggests avoiding pushing the same reward token to `_allRewards` more than once.


  **Link**: [Issue #49](https://github.com/hats-finance/VMEX-0x050183b53cf62bcd6c2a932632f8156953fd146f/issues/49)


- **Reentrancy Guard Ineffective for Vyper Contract Implementing Fallback via __default__**

  The issue revolves around the reentrancy Guard for Curve, which may not engage as intended with Vyper Contracts that implement a fallback via `__default__`. If this type of pool is added, reentrancy guard may become ineffective. A Proof of Concept (POC) is provided with findings that Tricrypto will not revert if a transfer with some data transpires, and a pool with just a fallback is marked as reentrancy safe. A potential solution mentioned is to enforce stricter checks for each curve pool metadata.


  **Link**: [Issue #52](https://github.com/hats-finance/VMEX-0x050183b53cf62bcd6c2a932632f8156953fd146f/issues/52)


- **Duplicated Error Messages 105 and 106 in Contracts Protocol Library**

  The issue pertains to duplicate error messages "105" and "106" in the file 'packages/contracts/contracts/protocol/libraries/helpers/Errors.sol'. The replication could potentially cause confusion as the AAVE documentation does not support duplicate codes. It needs rectification to prevent any confusion.


  **Link**: [Issue #53](https://github.com/hats-finance/VMEX-0x050183b53cf62bcd6c2a932632f8156953fd146f/issues/53)



## Conclusion

The Hats.finance audit competition sought to resolve security issues within its DeFi protocol. Two high severity problems were identified and several recommendations issued. The "Incorrect Validation of aToken" issue allowed for impersonation and reward theft. Moreover, "VMEX Team's LP Share Price Calculation Method" was found to be inadequate. Several other low severity issues, such as potential gas overpayment due to miscalculated rewards and duplicated error messages, were also identified. Many of these issues revolved around flaws in the smart contract code, but it should be noted that a productive response was made, with many of the issues being acknowledged and corresponding steps to fix them detailed.

## Disclaimer


This report does not assert that the audited contracts are completely secure. Continuous review and comprehensive testing are advised before deploying critical smart contracts./n/n
The VMEX audit competition illustrates the collaborative effort in identifying and rectifying potential vulnerabilities, enhancing the overall security and functionality of the platform.


Hats.finance does not provide any guarantee or warranty regarding the security of this project. All smart contract software should be used at the sole risk and responsibility of users.

