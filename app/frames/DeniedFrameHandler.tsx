/** @jsxImportSource frog/jsx */
import { Button } from "frog";
import { ChatBox, ChatContainer } from "@/components/chat";
import { ZORA_CHAIN_ID, ZORA_COLLECTION_ID, ZORA_TOKEN_ID } from "@/constants";
import { Text } from "@/components/shared";

export const DeniedFrameHandler = async (c: any) => {
  return c.res({
    image: (
      <ChatContainer image={"reading"}>
        <ChatBox>
          <Text mt={8} size={48}>
            I'm afraid your application has been denied.
          </Text>
          <Text mt={8} size={48} weight={600}>
            Please take a mint, they're free.
          </Text>
        </ChatBox>
      </ChatContainer>
    ),
    intents: [
      <Button.Mint target={`eip155:${ZORA_CHAIN_ID}:${ZORA_COLLECTION_ID}:${ZORA_TOKEN_ID}`}>
        Mint
      </Button.Mint>
    ],
  })
}