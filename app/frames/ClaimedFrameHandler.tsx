/** @jsxImportSource frog/jsx */
import { Button } from "frog";
import { ChatBox, ChatContainer } from "@/components/chat";
import { kv } from "@vercel/kv";
import { Session } from "@/types/session";
import { getInteractor } from "@/utils/neynar";
import { ErrorFrameHandler } from "@/frames/ErrorFrameHandler";
import { Text } from "@/components/shared";
import { SAFE_ADDRESS, ZORA_COLLECTION_ID, ZORA_TOKEN_ID } from "@/constants";

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
          <Text mt={0} size={39}>
            You have already claimed. You were approved for {trustAmount} DAI in credit. Mint to activate your membership, borrow from CC on Union, and pay it forward by vouching for a friend.
          </Text>
        </ChatBox>
      </ChatContainer>
    ),
    intents: [
      <Button.Link href={`https://zora.co/collect/base:${ZORA_COLLECTION_ID}/${ZORA_TOKEN_ID}`}>
        Mint
      </Button.Link>,
      <Button.Link href={"https://app.union.finance/"}>Visit Union</Button.Link>,
      <Button.Link href={`https://app.safe.global/transactions/history?safe=oeth:${SAFE_ADDRESS}`}>
        💰 View Safe
      </Button.Link>,
    ],
  })
}