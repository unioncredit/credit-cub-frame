/** @jsxImportSource frog/jsx */
import { Button } from "frog";
import { ChatBox, ChatContainer } from "@/components/chat";
import { kv } from "@vercel/kv";
import { Session } from "@/types/session";
import { getInteractor } from "@/utils/neynar";
import { ErrorFrameHandler } from "@/frames/ErrorFrameHandler";
import { Text } from "@/components/shared";
import { ZORA_COLLECTION_ID, ZORA_TOKEN_ID } from "@/constants";

export const ClaimedFrameHandler = async (c: any) => {
  const user = getInteractor(c);
  if (!user) {
    return ErrorFrameHandler(c);
  }

  let { address, trustAmount = 0 } = ((await kv.get(`session:${user.fid}`)) ?? {}) as Session;

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
      <Button.Link href={address ? `https://app.union.finance/profile/opt:${address}` : "https://app.union.finance/"}>
        {address ? "Your account" : "Visit Union"}
      </Button.Link>,
      <Button.Link href={`${process.env.NEXT_PUBLIC_URL!}#ledger`}>
        🏦 View Ledger
      </Button.Link>,
    ],
  })
}