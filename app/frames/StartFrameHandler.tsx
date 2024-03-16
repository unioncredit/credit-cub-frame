/** @jsxImportSource frog/jsx */
import { Button } from "frog";
import { ChatBox, ChatContainer } from "@/components/chat";
import { Text } from "@/components/shared";

export const StartFrameHandler = async (c) => {
  return c.res({
    action: '/apply',
    image: (
      <ChatContainer image={"lobby"}>
        <ChatBox name={"Credit Cub"}>
          <Text m={0} size={48} weight={600}>
            Welcome to Credit Cub's Credit Club!
          </Text>

          <Text mt={32} size={48}>
            You are first in line, how may I help you?
          </Text>
        </ChatBox>
      </ChatContainer>
    ),
    intents: [
      <Button value="apply">Apply for credit</Button>,
    ],
  })
}