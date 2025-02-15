// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19; 

import {ICurvePool, ICurvePool2} from "../../interfaces/ICurvePool.sol"; 
import {IERC20Detailed} from "../../dependencies/openzeppelin/contracts/IERC20Detailed.sol"; 
import {vMath} from "./libs/vMath.sol"; 
import {Errors} from "../libraries/helpers/Errors.sol";
import {Address} from "../../dependencies/openzeppelin/contracts/Address.sol";
//import "hardhat/console.sol";

//used for all curveV1 amd V2 tokens, no need to redeploy
library CurveOracle {
	function try_remove_liquidity_3(address curve_pool) internal returns(bool){
    	uint[3] memory amounts = [uint(0), uint(0), uint(0)];
		try ICurvePool(curve_pool).remove_liquidity(0, amounts) returns(uint256[3] memory) {
			return true;
		} catch {
			try ICurvePool2(curve_pool).remove_liquidity(0, amounts) {
				return true;
			} catch {
				return false;
			}
		}
	}
	function try_remove_liquidity_2(address curve_pool) internal returns(bool){
    	uint[2] memory amounts = [uint(0), uint(0)];
		try ICurvePool(curve_pool).remove_liquidity(0, amounts) returns(uint256[2] memory) {
			return true;
		} catch {
			try ICurvePool2(curve_pool).remove_liquidity(0, amounts) {
				return true;
			} catch {
				return false;
			}
		}
	}

	function try_remove_liquidity_one_coin(address curve_pool) internal returns(bool){
		try ICurvePool(curve_pool).remove_liquidity_one_coin(0,1,0) {
			return true;
		} catch {
			try ICurvePool2(curve_pool).remove_liquidity_one_coin(0,1,0) returns(uint256){
				return true;
			} catch {

				return false;
			}
		}
	}

	// function try_admin_fees(address curve_pool) internal returns(bool){
	// 	try ICurvePool(curve_pool).claim_admin_fees() {
	// 		return true;
    //     } catch {
	// 		try ICurvePool(curve_pool).withdraw_admin_fees() {
	// 			return true;
	// 		} catch {
	// 			return false;
	// 		}
    //     }
	// }

	/**
     * @dev Helper to prevent read-only re-entrancy attacks with virtual price. Only needed if the underlying has ETH.
     * @param curve_pool The curve pool address (not the token address!)
     **/
	function check_reentrancy(address curve_pool, uint256 num_tokens) internal {
		//makerdao uses remove_liquidity to trigger reentrancy lock
		// if(try_admin_fees(curve_pool)){
		// 	return;
		// }
		// address owner = ICurvePool(curve_pool).owner();
		// if(Address.isContract(owner)) {
		// 	if(try_admin_fees(owner)){
		// 		return;
		// 	}
		// }
		if(try_remove_liquidity_one_coin(curve_pool)){
			return;
		}
		if(num_tokens==2 && try_remove_liquidity_2(curve_pool)){
			return;
		}
		if(num_tokens==3 && try_remove_liquidity_3(curve_pool)){
			return;
		}
		uint[3] memory amounts = [uint(0), uint(0), uint(0)];
		ICurvePool2(curve_pool).remove_liquidity(0, amounts);
		revert(Errors.VO_REENTRANCY_GUARD_FAIL);
	}
	
	/**
     * @dev Calculates the value of a curve v1 lp token
     * @param curve_pool The curve pool address (not the token address!)
     * @param prices The price of the underlying assets in the curve pool
     * @param checkReentrancy Whether reentrancy check is needed
     **/
	function get_price_v1(address curve_pool, uint256[] memory prices, bool checkReentrancy) internal returns(uint256) {
	//prevent read-only reentrancy -- possibly a better way than this
		assert(prices.length > 1);
		
		if(checkReentrancy){
			check_reentrancy(curve_pool, prices.length);
		}
		uint256 virtual_price = ICurvePool(curve_pool).get_virtual_price();

		uint256 minPrice = vMath.min(prices);
		
		
		uint256 lp_price = calculate_v1_token_price(
			virtual_price,
			minPrice
		);	
		
		return lp_price; 	
		
	}

	//where virtual price is the price of the pool in USD
	//returns lp_value = virtual price * weighted average(prices); 
	function calculate_v1_token_price(
		uint256 virtual_price,
		uint256 minPrice
	) internal pure returns(uint256) {
		// divide by virtual price decimals, which is always 18 for all existing curve pools.
		return (virtual_price * minPrice) / 1e18; //decimals equal to the number of decimals in chainlink price
	}

	/**	
     * @dev Calculates the value of a curve v2 lp token (not pegged)
     * @param curve_pool The curve pool address (not the token address!)
     * @param prices The price of the underlying assets in the curve pool
     * @param checkReentrancy Whether reentrancy check is needed
     **/
	function get_price_v2(address curve_pool, uint256[] memory prices, bool checkReentrancy) internal returns(uint256) {
		if(checkReentrancy){
			check_reentrancy(curve_pool, prices.length);
		}
        uint256 virtual_price = ICurvePool(curve_pool).get_virtual_price();

		uint256 lp_price = calculate_v2_token_price(
			uint8(prices.length),
			virtual_price,
			prices
		);	
		
		return lp_price; 	
		
	}
	
	//returns n_token * vp * (p1 * p2 * p3) ^1/n	
	//n should only ever be 2 or 3 for v2 pools
	//returns the lp_price scaled by 1e36, so scale down by 1e18
	function calculate_v2_token_price(
		uint8 n,
		uint256 virtual_price,
		uint256[] memory prices
	) internal pure returns(uint256) {
		uint256 product = vMath.product(prices); 
		uint256 geo_mean = vMath.nthroot(n, product); 
		return (n * virtual_price * geo_mean) / 1e18; 
	}

}