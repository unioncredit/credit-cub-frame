/** @jsxImportSource frog/jsx */
import { Button } from "frog";
import { ChatBox, ChatContainer } from "@/components/chat";
import { kv } from "@vercel/kv";
import { Session } from "@/types/session";
import { getInteractor } from "@/utils/neynar";
import { ErrorFrameHandler } from "@/frames/ErrorFrameHandler";
import { Text } from "@/components/shared";

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
      <Button.Mint target={`eip155:8453:0xf5a3b6dee033ae5025e4332695931cadeb7f4d2b:1`}>
        Mint
      </Button.Mint>,
    ],
  })
}