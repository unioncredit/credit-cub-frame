import { InteractorAddress } from "@/types/neynar";
import { NeynarUser } from "frog/middlewares";
import { fidIsFollowedBy } from "@/lib/farcaster";
import { CREDITCUB_FID, KINGJACOB_FID, TRUST_ERC20_PRICES } from "@/constants";
import { getErc20BalancesForUser } from "@/lib/erc20";
import { fetchTrustlines } from "@unioncredit/data";

export const getMaxTrustAmountForAddresses = async (sybilScore: number, user: NeynarUser, addresses: InteractorAddress[]): Promise<number> => {
  const amounts = await Promise.all(addresses.map(addr => getTrustAmount(sybilScore, user, addr)));
  return Math.max(...amounts);
};

const getTrustAmount = async (sybilScore: number, user: NeynarUser, address: InteractorAddress): Promise<number> => {
  const score = await getTrustScore(user, address);
  const final = score + (sybilScore - 1);

  switch (true) {
    case (final >= 16):
      return 4269;
    case (final >= 10):
      return 420;
    case (final >= 5):
      return 42;
    case (final >= 1):
      return 4;
  }

  return 0;
};

const getTrustScore = async (user: NeynarUser, address: InteractorAddress): Promise<number> => {
  const [
    erc20Score,
    vouchScore,
    userFollowsCreditCub,
    userFollowsKingJacob,
    kingJacobFollowsUser,
  ] = await Promise.all([
    getErc20BalanceScore(address.full),
    getUnionVouchScore(address.full),
    fidIsFollowedBy(CREDITCUB_FID, [user.fid]),
    fidIsFollowedBy(KINGJACOB_FID, [user.fid]),
    fidIsFollowedBy(user.fid, [KINGJACOB_FID]),
  ]);

  let score = erc20Score + vouchScore;
  if (userFollowsCreditCub) {
    score += 1;
  }
  if (userFollowsKingJacob && kingJacobFollowsUser) {
    score += 1;
  }

  return score;
};

const getErc20BalanceScore = async (address: string): Promise<number> => {
  const balances = await getErc20BalancesForUser(address);

  let sum = 0;
  for (const symbol in balances) {
    const price = TRUST_ERC20_PRICES[symbol];
    const value = balances[symbol] * price;
    sum += value;
  }

  switch (true) {
    case (sum >= 42690):
      return 4;
    case (sum >= 4269):
      return 3;
    case (sum >= 420):
      return 2;
    case (sum >= 42):
      return 1;
  }

  return 0;
};

const getUnionVouchScore = async (address: string): Promise<number> => {
  const vouches = await fetchTrustlines(undefined, undefined, {
    "borrower": address,
  });

  if (vouches.length < 3) {
    return 0;
  }

  const ethers = require("ethers");
  const amounts = vouches.map(v => parseFloat(ethers.utils.formatUnits(v.amount, 18)));
  amounts.sort((a, b) => a > b ? 0 : 1);

  const median = amounts[Math.floor(amounts.length / 2)];
  switch (true) {
    case (median >= 4269):
      return 4;
    case (median >= 420):
      return 3;
    case (median >= 42):
      return 2;
    case (median >= 4):
      return 1;
  }

  return 0;
};