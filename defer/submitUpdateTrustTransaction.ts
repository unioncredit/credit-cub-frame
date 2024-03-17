import { ethers } from "ethers";
import { DefenderRelayProvider, DefenderRelaySigner } from "@openzeppelin/defender-relay-client/lib/ethers";
import { SAFE_ADDRESS, UNION_USER_MANAGER_OPTIMISM } from "@/constants";
import USER_MANAGER_ABI from "@/abis/userManager.json";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import { defer } from "@defer/client";

const submitUpdateTrustTransaction = async(address: string, trustAmount: number) => {
  console.log("Submitting update trust transaction...");
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

    console.log({ data });
    const safeSdk = await Safe.create({ ethAdapter, safeAddress: SAFE_ADDRESS })
    console.log("Created safeSdk instance");

    const tx = await safeSdk.createTransaction({
      transactions: [{
        ...data,
        value: BigInt(0),
      }],
    })
    console.log("Created safe transaction");

    const hash = await safeSdk.getTransactionHash(tx);
    console.log("Created safe transaction hash");

    await safeSdk.approveTransactionHash(hash);

    // note: defender relay provider doesn't properly implement confirmations,
    // so we can't use .wait() here
    await new Promise(r => setTimeout(r, 6000));
    console.log("Approved safe transaction hash");

    await safeSdk.executeTransaction(tx);
    console.log("Safe transaction executed!");
  } catch (err) {
    console.log("Failed to create update trust transaction: " + err);
  }
};

export default defer(submitUpdateTrustTransaction);