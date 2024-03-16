import { fetchQuery } from "@airstack/frames";

export const isNftOwnedByAddress = async (nftAddress: string, ownerAddress: string): Promise<boolean> => {
  const { data, error } = await fetchQuery(
    `
          query ($nftAddress: Address!, $ownerAddress: Identity!) {
            TokenBalances(
              input: {filter: {tokenAddress: {_eq: $nftAddress}, owner: {_eq: $ownerAddress}}, blockchain: ethereum}
            ) {
              TokenBalance {
                owner {
                  addresses
                }
              }
            }
          }
    `,
    {
      nftAddress,
      ownerAddress,
    },
  );

  if (error) {
    throw new Error(error);
  }

  const tokens = data.TokenBalances.TokenBalance;
  return !!tokens && tokens.length > 0;
}