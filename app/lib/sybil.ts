import { InteractorAddress } from "@/types/neynar";
import { NeynarUser } from "frog/middlewares";
import { getEnsDomain } from "@/lib/ens";
import { dateIsYearAgo, dateIsYearAway } from "@/utils/date";
import { fidIsFollowedBy } from "@/lib/farcaster";
import { DWR_FID, KINGJACOB_FID, NOUNS_NFT_ADDRESS, VITALIK_FID } from "@/constants";
import { isNftOwnedByAddress } from "@/lib/nft";
import { isAddressVerified } from "@/lib/coinbase";

export const getMaxSybilScoreForAddresses = async (user: NeynarUser, addresses: InteractorAddress[]): Promise<number> => {
  const scores = await Promise.all(addresses.map(addr => getSybilScore(user, addr)));
  return Math.max(...scores);
}

const getSybilScore = async (user: NeynarUser, address: InteractorAddress): Promise<number> => {
  let score = 0;

  const [
    domain,
    isFollowedByVip,
    isNounsHolder,
    isCoinbaseVerified,
  ] = await Promise.all([
    getEnsDomain(address.full),
    fidIsFollowedBy(user.fid, [VITALIK_FID, DWR_FID, KINGJACOB_FID]),
    isNftOwnedByAddress(NOUNS_NFT_ADDRESS, address.full),
    isAddressVerified(address.full),
  ]);

  if (!domain) {
    return 0;
  }

  if (domain.name && domain.avatar) {
    score += 1;
  }
  if (dateIsYearAgo(domain.createdAt) && dateIsYearAway(domain.expiry)) {
    score += 1;
  }
  if (user.activeStatus === "active") {
    score += 1;
  }
  if (user.fid < 1500) {
    score += 1;
  }
  if (isNounsHolder) {
    score += 1;
  }
  if (isFollowedByVip) {
    score += 1;
  }
  if (isCoinbaseVerified) {
    score +=1 ;
  }

  return score;
}