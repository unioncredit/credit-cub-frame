/** @jsxImportSource frog/jsx */
import { Button } from "frog";
import { ChatBox, ChatContainer } from "@/components/chat";

export const ErrorFrameHandler = (c) => {
  return c.res({
    image: (
      <ChatContainer>
        <ChatBox
          name={"Credit Cub"}
          content={"Sorry an error occurred, please try again shortly."}
        />
      </ChatContainer>
    ),
    intents: [
      <Button.Reset>🏠 Take me home</Button.Reset>,
    ],
  })
}