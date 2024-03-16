import { COINBASE_INDEXER_ADDRESS, COINBASE_VERIFIED_ACCOUNT_SCHEMA_ID } from "@/constants";

export const isAddressVerified = async (address: string): Promise<boolean> => {
  const ethers = require('ethers');
  const provider = new ethers.JsonRpcProvider(process.env.BASE_RPC_URL);
  const indexer = new ethers.Contract(
    COINBASE_INDEXER_ADDRESS,
    [
      'function getAttestationUid(address,bytes32) public view returns (bytes32)'
    ],
    provider,
  );

  const attestationUid = await indexer.getAttestationUid(address, COINBASE_VERIFIED_ACCOUNT_SCHEMA_ID);
  return attestationUid !== "0x0000000000000000000000000000000000000000000000000000000000000000";
}