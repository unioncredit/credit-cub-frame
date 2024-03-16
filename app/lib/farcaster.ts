import { fetchQuery } from "@airstack/frames";

export const fidIsFollowedBy = async (fid: number, followerFids: number[]): Promise<boolean> => {
  const { data, error } = await fetchQuery(
    `
          query ($fid: String!, $followerFids: [String!]) {
            Socials(
              input: {blockchain: ethereum, filter: {dappName: {_eq: farcaster}, userId: {_eq: $fid}}}
            ) {
              Social {
                userId
                dappName
                profileName
                followers(input: {filter: {followerProfileId: {_in: $followerFids}}}) {
                  Follower {
                    id
                  }
                }
              }
            }
          }
    `,
    {
      fid: fid.toString(),
      followerFids: followerFids.map(f => f.toString()),
    },
  );

  if (error) {
    throw new Error(error);
  }

  const socials = data.Socials.Social;
  if (!socials || socials.length <= 0) {
    return false;
  }

  const followers = socials[0].followers.Follower;
  return !!followers && followers.length > 0;
};