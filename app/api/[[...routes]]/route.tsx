/** @jsxImportSource frog/jsx */

import { Frog } from "frog";
import { handle } from "frog/next";
import { neynar as nnHub } from "frog/hubs";
import { neynar as nnMiddleware } from "frog/middlewares";
import {
  ApplyFrameHandler,
  ClaimedFrameHandler,
  ErrorFrameHandler,
  StartFrameHandler,
  SuccessFrameHandler,
} from "@/frames";
import { init } from "@airstack/frames";
import { config } from "@unioncredit/data";
import { optimism } from "viem/chains";

config.set("chainId", optimism.id)
init(process.env.AIRSTACK_API_KEY);

const app = new Frog({
  hub: nnHub({apiKey: process.env.NEYNAR_API_KEY}),
  assetsPath: '/',
  basePath: '/api',
  imageOptions: {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Inter',
        weight: 400,
        source: 'google',
      },
    ],
  },
})

const neynarMiddleware = nnMiddleware({
  apiKey: process.env.NEYNAR_API_KEY,
  features: ['interactor'],
})

// todo: move this to middleware
const verified = (c, fn) => {
  if (process.env.ENV === "development" || c.verified) {
    return fn(c);
  }
  return ErrorFrameHandler(c);
}

app.frame('/', StartFrameHandler);
app.frame('/error', ErrorFrameHandler);
app.frame('/apply', neynarMiddleware, (c) => verified(c, ApplyFrameHandler));
app.frame('/success', neynarMiddleware, (c) => verified(c, SuccessFrameHandler))
app.frame('/claimed', neynarMiddleware, (c) => verified(c, ClaimedFrameHandler))

export const GET = handle(app)
export const POST = handle(app)
