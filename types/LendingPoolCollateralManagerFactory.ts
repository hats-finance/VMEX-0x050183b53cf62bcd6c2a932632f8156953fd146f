/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { LendingPoolCollateralManager } from "./LendingPoolCollateralManager";

export class LendingPoolCollateralManagerFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<LendingPoolCollateralManager> {
    return super.deploy(
      overrides || {}
    ) as Promise<LendingPoolCollateralManager>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): LendingPoolCollateralManager {
    return super.attach(address) as LendingPoolCollateralManager;
  }
  connect(signer: Signer): LendingPoolCollateralManagerFactory {
    return super.connect(signer) as LendingPoolCollateralManagerFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LendingPoolCollateralManager {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as LendingPoolCollateralManager;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "collateral",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "principal",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "debtToCover",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "liquidatedCollateralAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "liquidator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "receiveAToken",
        type: "bool",
      },
    ],
    name: "LiquidationCall",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "reserve",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "ReserveUsedAsCollateralDisabled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "reserve",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "ReserveUsedAsCollateralEnabled",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "collateralAsset",
        type: "address",
      },
      {
        internalType: "address",
        name: "debtAsset",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "trancheId",
        type: "uint64",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "debtToCover",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "receiveAToken",
        type: "bool",
      },
    ],
    name: "liquidationCall",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526000805534801561001457600080fd5b50613270806100246000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063ee125ca014610030575b600080fd5b61004361003e366004612bd0565b61005a565b604051610051929190612fe8565b60405180910390f35b6001600160a01b03831660009081526036602090815260408083206001600160401b038816845290915281206060906100916128e3565b6040805180820182526001600160a01b03808a1682526001600160401b038b1660208084018290528451808201865287548152600092835260388252858320603990925294909120546034546100f09560359490939291166037610920565b9091929350909192509091509050816101400181815250506000603560008c6001600160a01b03166001600160a01b0316815260200190815260200160002060008a6001600160401b03166001600160401b0316815260200190815260200160002090506000603560008c6001600160a01b03166001600160a01b0316815260200190815260200160002060008b6001600160401b03166001600160401b0316815260200190815260200160002090506101aa8982610fa7565b60408501819052602085018290526101408501516101cf9285928592899290916110bb565b6102008501526101e0840181905260009060098111156101ff57634e487b7160e01b600052602160045260246000fd5b600981111561021e57634e487b7160e01b600052602160045260246000fd5b1461023c57826101e001518361020001519550955050505050610915565b6004808301546001600160a01b031661018085018190526040516370a0823160e01b815290916370a0823191610274918d9101612d68565b60206040518083038186803b15801561028c57600080fd5b505afa1580156102a0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102c49190612c6f565b8352604083015160208401516102e791611388916102e1916111f7565b9061120c565b6060840181905288116102fa5787610300565b82606001515b83608001818152505061031f82828e8e876080015188600001516112b3565b6101208501819052610100850191909152608084015111156103475761012083015160808401525b8661040b576101808301516040516370a0823160e01b81526000916001600160a01b038f16916370a082319161037f91600401612d68565b60206040518083038186803b15801561039757600080fd5b505afa1580156103ab573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103cf9190612c6f565b905083610100015181101561040957600560405180604001604052806002815260200161343560f01b815250965096505050505050610915565b505b610414816115f9565b82608001518360400151106104a857600681015460808401516001830154604051637a94c56560e11b81526001600160a01b039093169263f5298aca92610471928e92600160801b9091046001600160801b031690600401612dea565b600060405180830381600087803b15801561048b57600080fd5b505af115801561049f573d6000803e3d6000fd5b505050506105b0565b60408301511561053457600681015460408481015160018401549151637a94c56560e11b81526001600160a01b039093169263f5298aca92610501928e929091600160801b90046001600160801b031690600401612dea565b600060405180830381600087803b15801561051b57600080fd5b505af115801561052f573d6000803e3d6000fd5b505050505b6005810154604084015160808501516001600160a01b0390921691639dc29fac918c9161056091611776565b6040518363ffffffff1660e01b815260040161057d929190612dd1565b600060405180830381600087803b15801561059757600080fd5b505af11580156105ab573d6000803e3d6000fd5b505050505b600481015460808401516105d39183918e916001600160a01b0316906000611782565b8615610756578261018001516001600160a01b03166370a08231336040518263ffffffff1660e01b815260040161060a9190612d68565b60206040518083038186803b15801561062257600080fd5b505afa158015610636573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061065a9190612c6f565b61016084015261018083015161010084015160405163f866c31960e01b81526001600160a01b039092169163f866c3199161069b918d913391600401612d7c565b600060405180830381600087803b1580156106b557600080fd5b505af11580156106c9573d6000803e3d6000fd5b5050505082610160015160001415610751573360009081526036602090815260408083206001600160401b038e1684529091529020600783015461071a908290600160a01b900460ff166001611bd5565b60405133906001600160a01b038f16907e058a56ea94653cdf4f152d227ace22d4c00ad99e2a43f58cb7d9e3feb295f290600090a3505b6107fa565b61075f826115f9565b61018083015161010084015161077c9184918f9190600090611782565b6101808301516101008401516001840154604051636b81068560e11b81526001600160a01b039093169263d7020d0a926107c7928e923392916001600160801b031690600401612da0565b600060405180830381600087803b1580156107e157600080fd5b505af11580156107f5573d6000803e3d6000fd5b505050505b82516101008401511415610865576007820154610824908590600160a01b900460ff166000611bd5565b886001600160a01b03168c6001600160a01b03167f44c58d81365b66dd4b1a7f36c25aa97b8c71c361ee4937adc1a00000227db5dd60405160405180910390a35b6004810154608084015161088b916001600160a01b038e81169233929190911690611c61565b886001600160a01b03168b6001600160a01b03168d6001600160a01b03167fe413a321e8681d831f4dbccbca790d2952b56f977908e45be37335533e0052868660800151876101000151338d6040516108e7949392919061300f565b60405180910390a46000604051806040016040528060028152602001611a1b60f11b81525095509550505050505b965096945050505050565b6000806000806000610930612991565b8c516001600160a01b03166102a082015260208d01516001600160401b03166102c082015261095e8b611cbf565b1561097c576000806000806000199550955095509550955050610f98565b60006101008201525b888161010001511015610ef7576101008101516109a3908c90611cc4565b6109ac57610ede565b896000826101000151815260200190815260200160002060009054906101000a90046001600160a01b03168161020001906001600160a01b031690816001600160a01b03168152505060008c60008361020001516001600160a01b03166001600160a01b031681526020019081526020016000206000836102c001516001600160401b03166001600160401b031681526020019081526020016000209050886001600160a01b0316631a9dffb38960008561020001516001600160a01b03166001600160a01b0316815260200190815260200160002060009054906101000a900460ff166040518263ffffffff1660e01b8152600401610aac9190612e14565b60206040518083038186803b158015610ac457600080fd5b505afa158015610ad8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610afc9190612bb4565b6001600160a01b03166102808301526102c08201516007820154600160a81b90046001600160401b03908116911614610b505760405162461bcd60e51b8152600401610b4790612ece565b60405180910390fd5b610b5981611d1f565b5060a0860181905260e08601929092525060c0840191909152610b7d90600a6130b3565b8260400181815250508161028001516001600160a01b031663b3596f078361020001516040518263ffffffff1660e01b8152600401610bbc9190612d68565b60206040518083038186803b158015610bd457600080fd5b505afa158015610be8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c0c9190612c6f565b602083015260e082015115801590610c305750610100820151610c30908d90611d4a565b15610d71576004808201546102a08401516040516370a0823160e01b81526001600160a01b03909216926370a0823192610c6b929101612d68565b60206040518083038186803b158015610c8357600080fd5b505afa158015610c97573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cbb9190612c6f565b6060830181905260408301516020840151610ce092610cda9190611db0565b90611dbc565b610260830181905260088201541015610cff5760088101546102608301525b610260820151610140830151610d14916111f7565b61014083015260c0820151610260830151610d3f91610d339190611db0565b610180840151906111f7565b61018083015260e0820151610260830151610d6a91610d5e9190611db0565b6101a0840151906111f7565b6101a08301525b610100820151610d82908d90611dc8565b15610edc5760058101546102a08301516040516370a0823160e01b81526001600160a01b03909216916370a0823191610dbd91600401612d68565b60206040518083038186803b158015610dd557600080fd5b505afa158015610de9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e0d9190612c6f565b608083015260068101546102a08301516040516370a0823160e01b8152610ea6926001600160a01b0316916370a0823191610e4b9190600401612d68565b60206040518083038186803b158015610e6357600080fd5b505afa158015610e77573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e9b9190612c6f565b6080840151906111f7565b6080830181905260408301516020840151610ed592610ec99291610cda91611db0565b610160840151906111f7565b6101608301525b505b6101008101805190610eef826131e3565b905250610985565b600081610140015111610f0b576000610f20565b610140810151610180820151610f2091611dbc565b610180820152610140810151610f37576000610f4c565b6101408101516101a0820151610f4c91611dbc565b6101a08201819052610140820151610160830151610f6992611e13565b61012082018190526101408201516101608301516101808401516101a090940151919850965091945090925090505b97509750975097509792505050565b60058101546040516370a0823160e01b815260009182916001600160a01b03909116906370a0823190610fde908790600401612d68565b60206040518083038186803b158015610ff657600080fd5b505afa15801561100a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061102e9190612c6f565b60068401546040516370a0823160e01b81526001600160a01b03909116906370a0823190611060908890600401612d68565b60206040518083038186803b15801561107857600080fd5b505afa15801561108c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110b09190612c6f565b915091509250929050565b600060606110c888611e41565b15806110da57506110d887611e41565b155b156111015750506040805180820190915260018152601960f91b6020820152600690610915565b670de0b6b3a764000085106111335750506040805180820190915260028152611a1960f11b6020820152600490610915565b60008061113f8a611e51565b11801561116e5750600789015460408051602081019091528854815261116e91600160a01b900460ff16611d4a565b90508061119857505060408051808201909152600280825261343360f01b60208301529150610915565b841580156111a4575083155b156111cd5750506040805180820190915260028152610d0d60f21b602082015260039150610915565b50506040805180820190915260028152611a1b60f11b602082015260009890975095505050505050565b60006112038284613035565b90505b92915050565b6000821580611219575081155b1561122657506000611206565b81611234600261271061304d565b611240906000196131a0565b61124a919061304d565b83111560405180604001604052806002815260200161068760f31b815250906112865760405162461bcd60e51b8152600401610b479190612e3c565b5061271061129560028261304d565b61129f8486613181565b6112a99190613035565b611203919061304d565b6000806000806112c1612a72565b6034546001600160a01b038a8116600090815260376020526040808220549051631a9dffb360e01b815291939290921691631a9dffb3916113089160ff1690600401612e14565b60206040518083038186803b15801561132057600080fd5b505afa158015611334573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113589190612bb4565b60405163b3596f0760e01b815290915081906001600160a01b0382169063b3596f0790611389908e90600401612d68565b60206040518083038186803b1580156113a157600080fd5b505afa1580156113b5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113d99190612c6f565b6040808501919091526034546001600160a01b038c811660009081526037602052839020549251631a9dffb360e01b8152911691631a9dffb3916114239160ff1690600401612e14565b60206040518083038186803b15801561143b57600080fd5b505afa15801561144f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114739190612bb4565b60405163b3596f0760e01b81529092508291506001600160a01b0382169063b3596f07906114a5908d90600401612d68565b60206040518083038186803b1580156114bd57600080fd5b505afa1580156114d1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114f59190612c6f565b60608401525061150690508b611d1f565b5060c085015260208401525061151d90508a611e5c565b60a08201819052611573906115429061153790600a6130b3565b604084015190611db0565b610cda83602001516102e18560c00151600a61155e91906130b3565b606087015161156d908e611db0565b90611db0565b608082018190528610156115de578592506115d781602001516115d16115ae8460c00151600a6115a391906130b3565b606086015190611db0565b610cda8560a00151600a6115c291906130b3565b604087015161156d908a611db0565b90611e66565b91506115e9565b806080015192508691505b5090999098509650505050505050565b60008160040160009054906101000a90046001600160a01b03166001600160a01b03166307da06036040518163ffffffff1660e01b815260040160206040518083038186803b15801561164b57600080fd5b505afa15801561165f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116839190612bb4565b905060008260060160009054906101000a90046001600160a01b03166001600160a01b031663b1bf962d6040518163ffffffff1660e01b815260040160206040518083038186803b1580156116d757600080fd5b505afa1580156116eb573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061170f9190612c6f565b60018401546003850154919250600160801b8082046001600160801b03908116939216910464ffffffffff1660008061174b8887868887611f30565b90925090506001600160a01b03871661176c5761176c88878785858861208d565b5050505050505050565b600061120382846131a0565b600485810154604080516307da060360e01b815290516000936001600160a01b03909316926307da060392808201926020929091829003018186803b1580156117ca57600080fd5b505afa1580156117de573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118029190612bb4565b6001600160a01b0316146118205761181b858585612332565b611bce565b611828612aaf565b60058601546001600160a01b031680825260408051637b98f4df60e11b8152815163f731e9be92600480840193919291829003018186803b15801561186c57600080fd5b505afa158015611880573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118a49190612c87565b60c083015260408083019190915260018701546006880154825163b1bf962d60e01b8152925161194f93600160801b9093046001600160801b0316926001600160a01b039092169163b1bf962d916004808301926020929190829003018186803b15801561191157600080fd5b505afa158015611925573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119499190612c6f565b90612519565b60e082015261195c612afd565b6040518060c00160405280876001600160a01b03168152602001866001600160a01b0316815260200185815260200184815260200161199d896000016125b6565b81526020016119ab896125c1565b9052600788015460408085015160e086015160c087015192516308a80b0960e31b81529495506001600160a01b03909316936345405848936119f293879392600401612f58565b60606040518083038186803b158015611a0a57600080fd5b505afa158015611a1e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a429190612caa565b60a0850152608084015260608301819052604080518082019091526002815261353360f01b6020820152906001600160801b031015611a945760405162461bcd60e51b8152600401610b479190612e3c565b506080820151604080518082019091526002815261353560f01b6020820152906001600160801b031015611adb5760405162461bcd60e51b8152600401610b479190612e3c565b5060a08201516040805180820190915260028152610d4d60f21b6020820152906001600160801b031015611b225760405162461bcd60e51b8152600401610b479190612e3c565b506060820151600288018054608085015160038b0180546001600160801b03199081166001600160801b038085169190911790925560a08801519316818616178116600160801b84831681029190911790945560018c01546040516001600160a01b038d16967f804c9b842b2748a22bb64b345453a3de7ca54a6ca45ce00d415894979e22897a96611bc39691959491938083169391900490911690612fb9565b60405180910390a250505b5050505050565b604080518082019091526002815261373760f01b602082015260808310611c0f5760405162461bcd60e51b8152600401610b479190612e3c565b50611c1b826002613181565b611c26906001613035565b81611c32576000611c35565b60015b60ff16901b611c45836002613181565b611c50906001613035565b8454600190911b1916179092555050565b611cb9846323b872dd60e01b858585604051602401611c8293929190612d7c565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b0319909316929092179091526125cc565b50505050565b511590565b60006080821060405180604001604052806002815260200161373760f01b81525090611d035760405162461bcd60e51b8152600401610b479190612e3c565b50611d0f826002613181565b925190921c600316151592915050565b5461ffff80821692601083901c821692602081901c831692603082901c60ff169260409290921c1690565b60006080821060405180604001604052806002815260200161373760f01b81525090611d895760405162461bcd60e51b8152600401610b479190612e3c565b50611d95826002613181565b611da0906001613035565b925190921c600116151592915050565b60006112038284613181565b6000611203828461304d565b60006080821060405180604001604052806002815260200161373760f01b81525090611e075760405162461bcd60e51b8152600401610b479190612e3c565b50611da0826002613181565b600082611e235750600019611e3a565b611e3783611e31868561120c565b906126b0565b90505b9392505050565b5467010000000000000016151590565b5460101c61ffff1690565b5460301c60ff1690565b604080518082019091526002815261035360f41b602082015260009082611ea05760405162461bcd60e51b8152600401610b479190612e3c565b506000611eae60028461304d565b9050612710611ebf826000196131a0565b611ec9919061304d565b84111560405180604001604052806002815260200161068760f31b81525090611f055760405162461bcd60e51b8152600401610b479190612e3c565b508281611f1461271087613181565b611f1e9190613035565b611f28919061304d565b949350505050565b600285015460009081906001600160801b03168585821561205e576000611f57848861276a565b9050611f63818a612519565b604080518082019091526002815261353160f01b60208201529093506001600160801b03841115611fa75760405162461bcd60e51b8152600401610b479190612e3c565b5060018b0180546001600160801b0319166001600160801b038516179055891561205c5760028b0154600090611fed90600160801b90046001600160801b0316896127aa565b9050611ff9818a612519565b6040805180820190915260028152611a9960f11b60208201529093506001600160801b0384111561203d5760405162461bcd60e51b8152600401610b479190612e3c565b505060018b0180546001600160801b03808516600160801b0291161790555b505b600399909901805464ffffffffff60801b1916600160801b4264ffffffffff1602179055989650505050505050565b612095612b45565b61209e876125b6565b6101408201526120ad876125c1565b6101608201526101408101511580156120c95750610160810151155b156120d4575061232a565b8660050160009054906101000a90046001600160a01b03166001600160a01b031663797743386040518163ffffffff1660e01b815260040160806040518083038186803b15801561212457600080fd5b505afa158015612138573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061215c9190612cd7565b64ffffffffff1661018085015260a08401528252602082015261217f8686612519565b608082015261218e8684612519565b606082015260a08101516101808201516121b0919064ffffffffff85166127b3565b60c0820181905260208201516121c591612519565b604082018190526080820151825160608401516121f093926121ea92909183916111f7565b90611776565b60e08201819052610140820151612207919061120c565b61010082018190521561227f57600480880154610100830151604051637df5bd3b60e01b81526001600160a01b0390921692637df5bd3b9261224c9291899101613001565b600060405180830381600087803b15801561226657600080fd5b505af115801561227a573d6000803e3d6000fd5b505050505b6122b08161016001516102e16122a584610140015161271061177690919063ffffffff16565b60e08501519061120c565b61012082018190521561232857600480880154610120830151604051637178125560e11b81526001600160a01b039092169263e2f024aa926122f59291899101613001565b600060405180830381600087803b15801561230f57600080fd5b505af1158015612323573d6000803e3d6000fd5b505050505b505b505050505050565b60008360040160009054906101000a90046001600160a01b03166001600160a01b03166307da06036040518163ffffffff1660e01b815260040160206040518083038186803b15801561238457600080fd5b505afa158015612398573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906123bc9190612bb4565b905060006123c9856125c1565b9050600061244d6123dc61271084611776565b846001600160a01b0316639f934c706040518163ffffffff1660e01b815260040160206040518083038186803b15801561241557600080fd5b505afa158015612429573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102e19190612c6f565b604080518082019091526002815261353360f01b60208201529091506001600160801b038211156124915760405162461bcd60e51b8152600401610b479190612e3c565b506002860180546001600160801b0319166001600160801b038381169190911790915560018701546040516001600160a01b038816927f804c9b842b2748a22bb64b345453a3de7ca54a6ca45ce00d415894979e22897a92612509928692600092839281831692600160801b90920490911690612fb9565b60405180910390a2505050505050565b6000821580612526575081155b1561253357506000611206565b8161254b60026b033b2e3c9fd0803ce800000061304d565b612557906000196131a0565b612561919061304d565b83111560405180604001604052806002815260200161068760f31b8152509061259d5760405162461bcd60e51b8152600401610b479190612e3c565b506b033b2e3c9fd0803ce800000061129560028261304d565b5460401c61ffff1690565b5460501c61ffff1690565b6125de826001600160a01b03166128a2565b6125fa5760405162461bcd60e51b8152600401610b4790612f21565b600080836001600160a01b0316836040516126159190612d4c565b6000604051808303816000865af19150503d8060008114612652576040519150601f19603f3d011682016040523d82523d6000602084013e612657565b606091505b5091509150816126795760405162461bcd60e51b8152600401610b4790612e4f565b805115611cb957808060200190518101906126949190612c53565b611cb95760405162461bcd60e51b8152600401610b4790612e84565b604080518082019091526002815261035360f41b6020820152600090826126ea5760405162461bcd60e51b8152600401610b479190612e3c565b5060006126f860028461304d565b9050670de0b6b3a764000061270f826000196131a0565b612719919061304d565b84111560405180604001604052806002815260200161068760f31b815250906127555760405162461bcd60e51b8152600401610b479190612e3c565b508281611f14670de0b6b3a764000087613181565b60008061277e4264ffffffffff8516611776565b9050611f2861278b6128d3565b6301e1338061279a8785611db0565b6127a4919061304d565b906111f7565b60006112038383425b6000806127c78364ffffffffff8616611776565b9050806127de576127d66128d3565b915050611e3a565b60006127eb6001836131a0565b90506000600283116127fe576000612809565b6128096002846131a0565b9050600061281b6301e133808961304d565b905060006128298280612519565b905060006128378284612519565b90506000600261284b8461156d8a8a611db0565b612855919061304d565b90506000600661286b8461156d89818d8d611db0565b612875919061304d565b9050612892816127a4848161288a8a8e611db0565b6127a46128d3565b9c9b505050505050505050505050565b600080826001600160a01b0316803b806020016040519081016040528181526000908060200190933c511192915050565b6b033b2e3c9fd0803ce800000090565b60405180610220016040528060008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160006001600160a01b031681526020016000151581526020016000600281111561297d57634e487b7160e01b600052602160045260246000fd5b815260200160008152602001606081525090565b604051806102e0016040528060006001600160401b03168152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160001515815260200160006001600160a01b031681526020016000151581526020016000151581526020016000815260200160006001600160a01b0316815260200160006001600160a01b0316815260200160006001600160401b031681525090565b6040518060e00160405280600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081525090565b60405180610100016040528060006001600160a01b03168152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081525090565b6040518060c0016040528060006001600160a01b0316815260200160006001600160a01b03168152602001600081526020016000815260200160008152602001600081525090565b604051806101a00160405280600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600064ffffffffff1681525090565b600060208284031215612bc5578081fd5b8151611e3a81613214565b60008060008060008060c08789031215612be8578182fd5b8635612bf381613214565b95506020870135612c0381613214565b945060408701356001600160401b0381168114612c1e578283fd5b93506060870135612c2e81613214565b92506080870135915060a0870135612c458161322c565b809150509295509295509295565b600060208284031215612c64578081fd5b8151611e3a8161322c565b600060208284031215612c80578081fd5b5051919050565b60008060408385031215612c99578182fd5b505080516020909101519092909150565b600080600060608486031215612cbe578283fd5b8351925060208401519150604084015190509250925092565b60008060008060808587031215612cec578384fd5b845193506020850151925060408501519150606085015164ffffffffff81168114612d15578182fd5b939692955090935050565b60008151808452612d388160208601602086016131b7565b601f01601f19169290920160200192915050565b60008251612d5e8184602087016131b7565b9190910192915050565b6001600160a01b0391909116815260200190565b6001600160a01b039384168152919092166020820152604081019190915260600190565b6001600160a01b03948516815292909316602083015260408201526001600160801b03909116606082015260800190565b6001600160a01b03929092168252602082015260400190565b6001600160a01b0393909316835260208301919091526001600160801b0316604082015260600190565b6020810160028310612e3657634e487b7160e01b600052602160045260246000fd5b91905290565b6000602082526112036020830184612d20565b6020808252818101527f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564604082015260600190565b6020808252602a908201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6040820152691bdd081cdd58d8d9595960b21b606082015260800190565b60208082526033908201527f63616c63756c617465557365724163636f756e7444617461207472616e6368656040820152720496420646f6573206e6f74206c696e6520757606c1b606082015260800190565b6020808252601f908201527f5361666545524332303a2063616c6c20746f206e6f6e2d636f6e747261637400604082015260600190565b84516001600160a01b0390811682526020808701519091169082015260408086015190820152606080860151908201526080808601519082015260a0948501519481019490945260c084019290925260e08301526101008201526101200190565b948552602085019390935260408401919091526001600160801b03908116606084015216608082015260a00190565b600083825260406020830152611e376040830184612d20565b918252602082015260400190565b93845260208401929092526001600160a01b031660408301521515606082015260800190565b60008219821115613048576130486131fe565b500190565b60008261306857634e487b7160e01b81526012600452602481fd5b500490565b80825b600180861161307f57506130aa565b818704821115613091576130916131fe565b8086161561309e57918102915b9490941c938002613070565b94509492505050565b600061120360001984846000826130cc57506001611e3a565b816130d957506000611e3a565b81600181146130ef57600281146130f957613126565b6001915050611e3a565b60ff84111561310a5761310a6131fe565b6001841b915084821115613120576131206131fe565b50611e3a565b5060208310610133831016604e8410600b8410161715613159575081810a83811115613154576131546131fe565b611e3a565b613166848484600161306d565b808604821115613178576131786131fe565b02949350505050565b600081600019048311821515161561319b5761319b6131fe565b500290565b6000828210156131b2576131b26131fe565b500390565b60005b838110156131d25781810151838201526020016131ba565b83811115611cb95750506000910152565b60006000198214156131f7576131f76131fe565b5060010190565b634e487b7160e01b600052601160045260246000fd5b6001600160a01b038116811461322957600080fd5b50565b801515811461322957600080fdfea26469706673582212208c99eb2999dc530ee29cae18c01fcbfa0240aaf8fd4a210fdc35d7012100ad7764736f6c63430008000033";
