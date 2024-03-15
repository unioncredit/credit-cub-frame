/** @jsxImportSource frog/jsx */
import { Button } from "frog";
import { ChatBox, ChatContainer } from "@/components/chat";

export const SuccessFrameHandler = (c) => {
  return c.res({
    image: (
      <ChatContainer>
        <ChatBox
          name={"Credit Cub"}
          content={"Congratulations, you now have 10 DAI in credit. Visit Union to become a member and start borrowing."}
        />
      </ChatContainer>
    ),
    intents: [
      <Button.Link href={"https://app.union.finance/"}>Visit Union</Button.Link>,
    ],
  })
}