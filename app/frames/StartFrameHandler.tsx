/** @jsxImportSource frog/jsx */
import { Button } from "frog";
import { ChatBox, ChatContainer } from "@/components/chat";

export const StartFrameHandler = (c) => {
  return c.res({
    action: '/apply',
    image: (
      <ChatContainer>
        <ChatBox
          name={"Credit Cub"}
          content={"Hi, I'm Credit Cub! You can apply for credit below and I will decide if you are worthy."}
        />
      </ChatContainer>
    ),
    intents: [
      <Button value="apply">Apply for credit</Button>,
    ],
  })
}