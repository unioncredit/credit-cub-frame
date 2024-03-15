/** @jsxImportSource frog/jsx */
import { Button } from "frog";
import { ChatBox, ChatContainer } from "@/components/chat";

export const start = (c) => {
  return c.res({
    image: (
      <ChatContainer>
        <ChatBox
          name={"Pheonix"}
          content={"KYM is the greatest site for documenting memes lol! Look at all the evidence they have there!"}
        />
      </ChatContainer>
    ),
    intents: [
      <Button value="apply">Apply for credit</Button>,
    ],
  })
}