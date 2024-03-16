import { fetchQuery } from "@airstack/frames";
import { EnsDomain } from "@/types/ens";

export const getEnsDomain = async (address: string): Promise<EnsDomain | null> => {
  const { data, error } = await fetchQuery(
    `
          query ($address: [Address!]) {
            Domains(
              input: {filter: {resolvedAddress: {_in: $address}, isPrimary: {_eq: true}}, blockchain: ethereum}
            ) {
              Domain {
                name
                avatar
                expiryTimestamp
                createdAtBlockTimestamp
              }
            }
          }
    `,
    {
      address,
    },
  );

  if (error) {
    throw new Error(error);
  }

  const domains = data.Domains.Domain;
  if (!domains || domains.length <= 0) {
    return null;
  }

  return {
    address: address,
    name: domains[0].name,
    avatar: domains[0].avatar,
    expiry: new Date(domains[0].expiryTimestamp),
    createdAt: new Date(domains[0].createdAtBlockTimestamp),
  } as EnsDomain;
};