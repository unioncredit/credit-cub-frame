/** @jsxImportSource frog/jsx */
import { Button } from "frog";
import { ChatBox, ChatContainer } from "@/components/chat";
import { ZORA_COLLECTION_ID, ZORA_TOKEN_ID } from "@/constants";
import { Text } from "@/components/shared";

export const SybilFailedFrameHandler = async (c: any) => {
  return c.res({
    image: (
      <ChatContainer image={"reading"}>
        <ChatBox>
          <Text mt={8} size={48}>
            Sorry, You weren't approved, maybe add an address with an ENS and try again 😉
          </Text>
        </ChatBox>
      </ChatContainer>
    ),
    intents: [
      <Button.Link href={`https://zora.co/collect/base:${ZORA_COLLECTION_ID}/${ZORA_TOKEN_ID}`}>
        Mint
      </Button.Link>,
    ],
  })
}