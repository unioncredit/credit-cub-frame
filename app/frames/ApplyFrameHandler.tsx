/** @jsxImportSource frog/jsx */
import { Button } from "frog";
import { ChatBox, ChatContainer } from "@/components/chat";
import { getAddresses, getInteractor } from "@/utils/neynar";
import { ClaimedFrameHandler, DeniedFrameHandler, ErrorFrameHandler } from "@/frames";
import { AddressType } from "@/types/neynar";
import { getMaxSybilScoreForAddresses } from "@/lib/sybil";
import { getMaxTrustAmountForAddresses } from "@/lib/trust";
import { kv } from "@vercel/kv";
import { Session } from "@/types/session";

export const ApplyFrameHandler = async (c) => {
  const user = getInteractor(c);
  if (!user) {
    return ErrorFrameHandler(c);
  }

  let { claimed, trustAmount = 0 } = ((await kv.get(`session:${user.fid}`)) ?? {}) as Session;
  if (claimed) {
    return ClaimedFrameHandler(c);
  }

  if (trustAmount <= 0) {
    const addresses = getAddresses(user).filter(a => a.type !== AddressType.Custody);
    if (addresses.length <= 0) {
      console.log(`[${user.fid}] user denied for not having a connected address`);
      return DeniedFrameHandler(c);
    }

    try {
      const sybilScore = await getMaxSybilScoreForAddresses(user, addresses);
      if (sybilScore <= 0) {
        console.log(`[${user.fid}] user denied for failing sybil test`);
        return DeniedFrameHandler(c);
      }

      trustAmount = await getMaxTrustAmountForAddresses(sybilScore, user, addresses);
      if (trustAmount <= 0) {
        console.log(`[${user.fid}] user denied as no trust amount approved`);
        return DeniedFrameHandler(c);
      }

      await kv.set(`session:${user.fid}`, {
        sybilScore,
        trustAmount,
      });
    } catch (error) {
      console.error(error);
      return ErrorFrameHandler(c);
    }
  }

  return c.res({
    action: "/success",
    image: (
      <ChatContainer>
        <ChatBox
          name={"Credit Cub"}
          content={`Congratulations! I have approved you for ${trustAmount} DAI in credit. Select the address below that you want to be credited.`}
        />
      </ChatContainer>
    ),
    intents: getAddresses(user).map(({ full, short, type }) => (
      <Button value={full}>{type === AddressType.Custody ? "🟣" : "🟢"} {short}</Button>
    )),
  });
};