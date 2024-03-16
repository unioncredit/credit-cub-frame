/** @jsxImportSource frog/jsx */
import { Button } from "frog";
import { ChatBox, ChatContainer } from "@/components/chat";
import { ZORA_CHAIN_ID, ZORA_COLLECTION_ID, ZORA_TOKEN_ID } from "@/constants";
import { getAddresses, getInteractor } from "@/utils/neynar";
import { ErrorFrameHandler } from "@/frames/ErrorFrameHandler";
import { AddressType } from "@/types/neynar";

export const DeniedFrameHandler = async (c) => {
  return c.res({
    image: (
      <ChatContainer>
        <ChatBox
          name={"Credit Cub"}
          content={"Sorry, you are not worthy of credit at this time. Claim your Free Mint below."}
        />
      </ChatContainer>
    ),
    intents: [
      <Button.Mint target={`eip155:${ZORA_CHAIN_ID}:${ZORA_COLLECTION_ID}:${ZORA_TOKEN_ID}`}>
        Mint
      </Button.Mint>
    ],
  })
}