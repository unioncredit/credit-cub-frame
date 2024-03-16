/** @jsxImportSource frog/jsx */
import { Button } from "frog";
import { ChatBox, ChatContainer } from "@/components/chat";
import { kv } from "@vercel/kv";
import { Session } from "@/types/session";
import { getInteractor } from "@/utils/neynar";
import { ErrorFrameHandler } from "@/frames/ErrorFrameHandler";
import { SAFE_ADDRESS, ZORA_CHAIN_ID, ZORA_COLLECTION_ID, ZORA_TOKEN_ID } from "@/constants";
import { Text } from "@/components/shared";
import submitUpdateTrustTransaction from "../../defer/submitUpdateTrustTransaction";

export const runtime = 'edge';
export const maxDuration = 30;
export const dynamic = "force-dynamic";

export const SuccessFrameHandler = async (c: any) => {
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
  console.log("submitting tx");
  await submitUpdateTrustTransaction(address, trustAmount);
  await kv.set(`session:${user.fid}`, { ...session, address, claimed: true })

  return c.res({
    image: (
      <ChatContainer image={"desk"}>
        <ChatBox
          padding={16}
         
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