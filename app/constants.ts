import { base, mainnet } from "viem/chains";

export const ZORA_COLLECTION_ID = "0xc523faf3f5a4cb391670ee0a9fba84f844920056";
export const ZORA_CHAIN_ID = "8453";
export const ZORA_TOKEN_ID = "1";

export const DWR_FID = 3;
export const KINGJACOB_FID = 1002;
export const VITALIK_FID = 5650;
export const CREDITCUB_FID = 384385;

export const SAFE_ADDRESS = "0x4C7768794f38096b8977C7a9E64b85dd63031d27";
export const NOUNS_NFT_ADDRESS = "0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03";
export const COINBASE_INDEXER_ADDRESS = "0x2c7eE1E5f416dfF40054c27A62f7B357C4E8619C";
export const COINBASE_VERIFIED_ACCOUNT_SCHEMA_ID = "0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9";
export const UNION_USER_MANAGER_OPTIMISM = "0x8E195D65b9932185Fcc76dB5144534e0f3597628";

export const TRUST_ERC20_ADDRESSES = {
  [mainnet.id]: [
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // USDC
    "0x6b175474e89094c44da98b954eedeac495271d0f", // DAI
    "0xdac17f958d2ee523a2206206994597c13d831ec7", // USDT
    "0x4d224452801aced8b2f0aebe155379bb5d594381", // APECOIN
  ],
  [base.id]: [
    "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913", // USDC
    "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb", // DAI
  ]
};

export const TRUST_ERC20_PRICES: Record<string, number> = {
  "USDC": 1,
  "DAI": 1,
  "USDT": 1,
  "APE": 2.2,
  "ETH": 3740.96,
};
