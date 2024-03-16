/** @jsxImportSource frog/jsx */
import { Button } from "frog";
import { ChatBox, ChatContainer } from "@/components/chat";
import { kv } from "@vercel/kv";
import { Session } from "@/types/session";
import { getInteractor } from "@/utils/neynar";
import { ErrorFrameHandler } from "@/frames/ErrorFrameHandler";
import { Text } from "@/components/shared";
import { SAFE_ADDRESS, ZORA_CHAIN_ID, ZORA_COLLECTION_ID, ZORA_TOKEN_ID } from "@/constants";

export const ClaimedFrameHandler = async (c: any) => {
  const user = getInteractor(c);
  if (!user) {
    return ErrorFrameHandler(c);
  }

  let { trustAmount = 0 } = ((await kv.get(`session:${user.fid}`)) ?? {}) as Session;

  return c.res({
    image: (
      <ChatContainer image={"desk"}>
        <ChatBox padding={16}>
          <Text mt={0} size={42}>
            You have already claimed. You were approved for {trustAmount} DAI in credit. Visit Union to become a member and start borrowing.
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