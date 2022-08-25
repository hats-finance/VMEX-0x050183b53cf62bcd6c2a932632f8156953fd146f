"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockParaSwapAugustusRegistryFactory = void 0;
const contracts_1 = require("@ethersproject/contracts");
class MockParaSwapAugustusRegistryFactory extends contracts_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(augustus, overrides) {
        return super.deploy(augustus, overrides || {});
    }
    getDeployTransaction(augustus, overrides) {
        return super.getDeployTransaction(augustus, overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static connect(address, signerOrProvider) {
        return new contracts_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.MockParaSwapAugustusRegistryFactory = MockParaSwapAugustusRegistryFactory;
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "augustus",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "augustus",
                type: "address",
            },
        ],
        name: "isValidAugustus",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
const _bytecode = "0x60a060405234801561001057600080fd5b5060405161017c38038061017c83398101604081905261002f91610044565b60601b6001600160601b031916608052610072565b600060208284031215610055578081fd5b81516001600160a01b038116811461006b578182fd5b9392505050565b60805160601c60ef61008d60003960006052015260ef6000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063fb04e17b14602d575b600080fd5b603c60383660046082565b6050565b6040516047919060ae565b60405180910390f35b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0390811691161490565b6000602082840312156092578081fd5b81356001600160a01b038116811460a7578182fd5b9392505050565b90151581526020019056fea264697066735822122010d3caee004dce0a050c40b5eb15a47c09887b16c319f2c5d61432fb5cc20acf64736f6c63430008000033";
