/** @jsxImportSource frog/jsx */
import { Button } from "frog";
import { ChatBox, ChatContainer } from "@/components/chat";
import { Text } from "@/components/shared";

export const ErrorFrameHandler = (c) => {
  return c.res({
    image: (
      <ChatContainer image={"reading"}>
        <ChatBox name={"Credit Cub"}>
          <Text mt={0} size={48}>
            Sorry an error occurred, please try again shortly.
          </Text>
        </ChatBox>
      </ChatContainer>
    ),
    intents: [
      <Button.Reset>🏠 Take me home</Button.Reset>,
    ],
  })
}