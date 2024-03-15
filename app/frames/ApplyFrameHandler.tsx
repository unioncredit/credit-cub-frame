/** @jsxImportSource frog/jsx */
import { Button } from "frog";
import { ChatBox, ChatContainer } from "@/components/chat";
import { ZORA_CHAIN_ID, ZORA_COLLECTION_ID, ZORA_TOKEN_ID } from "@/constants";

export const ApplyFrameHandler = (c) => {

  // todo: calculate using trust algorithm
  const calculatedCreditAmount = Math.floor(Math.random() * 2);
  const notGrantedCredit = calculatedCreditAmount <= 0;

  return c.res({
    image: (
      <ChatContainer>
        <ChatBox
          name={"Credit Cub"}
          content={
            notGrantedCredit
              ? "Sorry, you are not worthy of credit at this time. Claim your Free Mint below."
              : "Congratulations! I have approved you for 10 DAI in credit. Select the address below that you want to be credited."
          }
        />
      </ChatContainer>
    ),
    intents: notGrantedCredit ? [
      <Button.Mint target={`eip155:${ZORA_CHAIN_ID}:${ZORA_COLLECTION_ID}:${ZORA_TOKEN_ID}`}>
        Mint
      </Button.Mint>
    ] : [
      <Button value="apply">🟣 0x12345</Button>,
    ],
  })
}