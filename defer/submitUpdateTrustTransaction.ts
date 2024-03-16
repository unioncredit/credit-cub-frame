import { ethers } from "ethers";
import { DefenderRelayProvider, DefenderRelaySigner } from "@openzeppelin/defender-relay-client/lib/ethers";
import { SAFE_ADDRESS, UNION_USER_MANAGER_OPTIMISM } from "@/constants";
import USER_MANAGER_ABI from "@/abis/userManager.json";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import { defer } from "@defer/client";

const submitUpdateTrustTransaction = async(address: string, trustAmount: number) => {
  try {
    const credentials = {
      apiKey: process.env.DEFENDER_API_KEY!,
      apiSecret: process.env.DEFENDER_API_SECRET!,
    };

    const { DefenderRelaySigner, DefenderRelayProvider } = require('@openzeppelin/defender-relay-client/lib/ethers');
    const { ethers } = require('ethers');

    const amount = ethers.parseUnits(trustAmount.toString(), 'ether');
    const provider = new DefenderRelayProvider(credentials);
    const signer = new DefenderRelaySigner(credentials, provider, { speed: 'fast' });

    const userManager = new ethers.Contract(
      UNION_USER_MANAGER_OPTIMISM,
      USER_MANAGER_ABI,
      signer,
    );

    const data = await userManager.updateTrust.populateTransaction(address, amount);
    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: signer,
    })

    const safeSdk = await Safe.create({ ethAdapter, safeAddress: SAFE_ADDRESS })
    const tx = await safeSdk.createTransaction({
      transactions: [{
        ...data,
        value: BigInt(0),
      }],
    })

    const hash = await safeSdk.getTransactionHash(tx);
    await safeSdk.approveTransactionHash(hash);
    await safeSdk.executeTransaction(tx);
    console.log("safesdk transaction executed");
  } catch (err) {
    console.log("failed to create update trust transaction: " + err);
  }
};

export default defer(submitUpdateTrustTransaction);