/** @jsxImportSource frog/jsx */
import { Button } from "frog";
import { ChatBox, ChatContainer } from "@/components/chat";
import { kv } from "@vercel/kv";
import { Session } from "@/types/session";
import { getInteractor } from "@/utils/neynar";
import { ErrorFrameHandler } from "@/frames/ErrorFrameHandler";
import { ZORA_COLLECTION_ID, ZORA_TOKEN_ID } from "@/constants";
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

  // submit transaction via https://defer.run/ to avoid frame timeout
  await submitUpdateTrustTransaction(address, trustAmount);
  await kv.set(`session:${user.fid}`, { ...session, address, claimed: true })
  await kv.sadd("global:ledger", user.fid);

  return c.res({
    image: (
      <ChatContainer image={"desk"}>
        <ChatBox padding={16}>
          <Text mt={0} size={36}>
            Thank you, your ${trustAmount} in credit is on its way, backed solely by CreditCub's trust in you. Mint to activate your membership, borrow from CC on Union, and pay it forward by vouching for a friend.
          </Text>
        </ChatBox>
      </ChatContainer>
    ),
    intents: [
      <Button.Link href={`https://zora.co/collect/base:${ZORA_COLLECTION_ID}/${ZORA_TOKEN_ID}`}>
        Mint
      </Button.Link>,
      <Button.Link href={`https://app.union.finance/profile/opt:${address}`}>Your account</Button.Link>,
      <Button.Link href={`${process.env.NEXT_PUBLIC_URL!}#ledger`}>
        🏦 View Ledger
      </Button.Link>,
    ],
  })
}