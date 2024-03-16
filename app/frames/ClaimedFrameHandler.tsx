/** @jsxImportSource frog/jsx */
import { Button } from "frog";
import { ChatBox, ChatContainer } from "@/components/chat";
import { kv } from "@vercel/kv";
import { Session } from "@/types/session";
import { getInteractor } from "@/utils/neynar";
import { ErrorFrameHandler } from "@/frames/ErrorFrameHandler";

export const ClaimedFrameHandler = async (c) => {
  const user = getInteractor(c);
  if (!user) {
    return ErrorFrameHandler(c);
  }

  let { trustAmount = 0 } = ((await kv.get(`session:${user.fid}`)) ?? {}) as Session;

  return c.res({
    image: (
      <ChatContainer>
        <ChatBox
          name={"Credit Cub"}
          content={`You have already claimed. You were approved for ${trustAmount} DAI in credit. Visit Union to become a member and start borrowing.`}
        />
      </ChatContainer>
    ),
    intents: [
      <Button.Link href={"https://app.union.finance/"}>Visit Union</Button.Link>,
    ],
  })
}