import { fetchQuery } from "@airstack/frames";
import { TRUST_ERC20_ADDRESSES } from "@/constants";
import { base, mainnet } from "viem/chains";

export const getErc20BalancesForUser = async (address: string): Promise<Record<string, number>> => {
  const { data, error } = await fetchQuery(
    `
          query ($ownerAddress: Identity!, $ethTokenAddresses: [Address!], $baseTokenAddresses: [Address!]) {
            Ethereum: TokenBalances(
              input: {filter: {owner: {_eq: $ownerAddress}, tokenType: {_eq: ERC20}, tokenAddress: {_in: $ethTokenAddresses}}, blockchain: ethereum, limit: 50}
            ) {
              TokenBalance {
                amount
                token {
                  address
                  name
                  symbol
                }
              }
            }
            Base: TokenBalances(
              input: {filter: {owner: {_eq: $ownerAddress}, tokenType: {_eq: ERC20}, tokenAddress: {_in: $baseTokenAddresses}}, blockchain: base, limit: 50}
            ) {
              TokenBalance {
                amount
                token {
                  address
                  name
                  symbol
                }
              }
            }
          }
    `,
    {
      ownerAddress: address,
      ethTokenAddresses: TRUST_ERC20_ADDRESSES[mainnet.id],
      baseTokenAddresses: TRUST_ERC20_ADDRESSES[base.id],
    },
  );

  if (error) {
    throw new Error(error);
  }

  let balances: Record<string, number> = {};
  const ethers = require('ethers');
  const ethereumData = data.Ethereum.TokenBalance;
  if (ethereumData?.length > 0) {
    ethereumData.forEach((balance) => {
      const ether = parseFloat(ethers.utils.formatUnits(balance.amount, 18));
      const token = balance.token;

      if (balances[token.symbol]) {
        balances[token.symbol] += ether
      } else {
        balances[token.symbol] = ether
      }
    })
  }

  const baseData = data.Base.TokenBalance;
  if (baseData?.length > 0) {
    baseData.forEach((balance) => {
      const ether = parseFloat(ethers.utils.formatUnits(balance.amount, 18));
      const token = balance.token;

      if (balances[token.symbol]) {
        balances[token.symbol] += ether
      } else {
        balances[token.symbol] = ether
      }
    })
  }

  return balances;
};