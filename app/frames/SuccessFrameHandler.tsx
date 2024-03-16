/** @jsxImportSource frog/jsx */
import { Button } from "frog";
import { ChatBox, ChatContainer } from "@/components/chat";
import { kv } from "@vercel/kv";
import { Session } from "@/types/session";
import { getInteractor } from "@/utils/neynar";
import { ErrorFrameHandler } from "@/frames/ErrorFrameHandler";
import USER_MANAGER_ABI from "@/abis/userManager.json";
import {
  SAFE_ADDRESS,
  UNION_USER_MANAGER_OPTIMISM,
  ZORA_CHAIN_ID,
  ZORA_COLLECTION_ID,
  ZORA_TOKEN_ID,
} from "@/constants";
import { ethers } from "ethers";
import { Text } from "@/components/shared";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import { DefenderRelayProvider, DefenderRelaySigner } from "@openzeppelin/defender-relay-client/lib/ethers";

export const runtime = 'nodejs';

export const SuccessFrameHandler = async (c) => {
  const address = c.buttonValue;

  const user = getInteractor(c);
  if (!user) {
    return ErrorFrameHandler(c);
  }

  const session = ((await kv.get(`session:${user.fid}`)) ?? {}) as Session;
  const { trustAmount = 0, claimed } = session;
  if (trustAmount <= 0 || claimed) {
    return ErrorFrameHandler(c);
  }

  // submit transaction in the background to avoid frame timeout
  submitUpdateTrustTransaction(address, trustAmount);
  await kv.set(`session:${user.fid}`, { ...session, address, claimed: true })

  return c.res({
    image: (
      <ChatContainer image={"desk"}>
        <ChatBox
          padding={16}
          name={"Credit Cub"}
        >
          <Text mt={0} size={42}>
            Thank you, your ${trustAmount} in credit is on its way, backed solely by CreditCub's trust in you. Your credit may take a few minutes to arrive. Mint to activate your account.
          </Text>
        </ChatBox>
      </ChatContainer>
    ),
    intents: [
      <Button.Mint target={`eip155:${ZORA_CHAIN_ID}:${ZORA_COLLECTION_ID}:${ZORA_TOKEN_ID}`}>
        Mint
      </Button.Mint>,
      <Button.Link href={"https://app.union.finance/"}>Visit Union</Button.Link>,
      <Button.Link href={`https://app.safe.global/transactions/history?safe=oeth:${SAFE_ADDRESS}`}>
        💰 View Safe
      </Button.Link>,
    ],
  })
}

const submitUpdateTrustTransaction = async(address: string, trustAmount: number) => {
  try {
    const credentials = {
      apiKey: process.env.DEFENDER_API_KEY,
      apiSecret: process.env.DEFENDER_API_SECRET,
    };

    const { DefenderRelaySigner, DefenderRelayProvider } = require('@openzeppelin/defender-relay-client/lib/ethers');
    const { ethers } = require('ethers');

    const amount = ethers.parseUnits(trustAmount.toString(), 'ether');
    const provider = new DefenderRelayProvider(credentials);
    const signer = new DefenderRelaySigner(credentials, provider, { speed: 'fast' });

    const userManager = new ethers.Contract(
      UNION_USER_MANAGER_OPTIMISM,
      USER_MANAGER_ABI as const,
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
        value: 0n,
      }],
    })

    const hash = await safeSdk.getTransactionHash(tx);
    await safeSdk.approveTransactionHash(hash);
    await safeSdk.executeTransaction(tx);
  } catch (err) {
    console.log("failed to create update trust transaction: " + err);
  }
};