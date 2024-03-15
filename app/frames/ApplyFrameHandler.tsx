/** @jsxImportSource frog/jsx */
import { Button } from "frog";
import { ChatBox, ChatContainer } from "@/components/chat";
import { ZORA_CHAIN_ID, ZORA_COLLECTION_ID, ZORA_TOKEN_ID } from "@/constants";
import { getAddresses, getInteractor } from "@/utils/neynar";
import { ErrorFrameHandler } from "@/frames/ErrorFrameHandler";
import { AddressType } from "@/types/neynar";

export const ApplyFrameHandler = (c) => {
  const user = getInteractor(c);
  if (!user) {
    return ErrorFrameHandler(c);
  }

  // todo: calculate using trust algorithm
  const calculatedCreditAmount = Math.floor(Math.random() * 2);
  const isGrantedCredit = calculatedCreditAmount <= 0;

  return c.res({
    image: (
      <ChatContainer>
        <ChatBox
          name={"Credit Cub"}
          content={
            isGrantedCredit
              ? "Congratulations! I have approved you for 10 DAI in credit. Select the address below that you want to be credited."
              : "Sorry, you are not worthy of credit at this time. Claim your Free Mint below."
          }
        />
      </ChatContainer>
    ),
    intents: isGrantedCredit ? getAddresses(user).map(({ full, short, type }) => (
      <Button value={full}>{type === AddressType.Custody ? '🟣' : '🟢'} {short}</Button>
    )) : [
      <Button.Mint target={`eip155:${ZORA_CHAIN_ID}:${ZORA_COLLECTION_ID}:${ZORA_TOKEN_ID}`}>
        Mint
      </Button.Mint>
    ],
  })
}