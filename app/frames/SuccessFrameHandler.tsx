/** @jsxImportSource frog/jsx */
import { Button } from "frog";
import { ChatBox, ChatContainer } from "@/components/chat";
import { kv } from "@vercel/kv";
import { Session } from "@/types/session";
import { getInteractor } from "@/utils/neynar";
import { ErrorFrameHandler } from "@/frames/ErrorFrameHandler";
import USER_MANAGER_ABI from "@/abis/userManager.json";
import { UNION_USER_MANAGER_OPTIMISM } from "@/constants";
import { ethers } from "ethers";

export const runtime = 'nodejs';

export const SuccessFrameHandler = async (c) => {
  const address = c.buttonValue;

  const user = getInteractor(c);
  if (!user) {
    return ErrorFrameHandler(c);
  }

  const session = ((await kv.get(`session:${user.fid}`)) ?? {}) as Session;
  const { trustAmount = 0 } = session;
  if (trustAmount <= 0) {
    return ErrorFrameHandler(c);
  }

  const credentials = {
    apiKey: process.env.DEFENDER_API_KEY,
    apiSecret: process.env.DEFENDER_API_SECRET,
  };

  const { DefenderRelaySigner, DefenderRelayProvider } = require('@openzeppelin/defender-relay-client/lib/ethers');
  const { ethers } = require('ethers');

  const amount = ethers.utils.parseUnits(trustAmount.toString(), 'ether');
  const provider = new DefenderRelayProvider(credentials);
  const signer = new DefenderRelaySigner(credentials, provider, { speed: 'fast' });
  const userManager = new ethers.Contract(
    UNION_USER_MANAGER_OPTIMISM,
    USER_MANAGER_ABI,
    signer,
  );

  await kv.set(`session:${user.fid}`, { ...session, address, claimed: true })
  userManager.updateTrust(address, amount);

  return c.res({
    image: (
      <ChatContainer>
        <ChatBox
          name={"Credit Cub"}
          content={`Congratulations, you now have ${trustAmount} DAI available to borrow. Visit Union to become a member and start borrowing.`}
        />
      </ChatContainer>
    ),
    intents: [
      <Button.Link href={"https://app.union.finance/"}>Visit Union</Button.Link>,
    ],
  })
}