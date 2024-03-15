/** @jsxImportSource frog/jsx */

import { Frog } from 'frog'
import { handle } from 'frog/next'
import { neynar } from "frog/hubs";
import {
  ApplyFrameHandler,
  ClaimedFrameHandler,
  ErrorFrameHandler,
  StartFrameHandler,
  SuccessFrameHandler
} from "@/frames";

const app = new Frog({
  hub: neynar({apiKey: process.env.NEYNAR_API_KEY}),
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

const verified = (c, fn) => {
  if (process.env.ENV === "development" || c.verified) {
    return fn(c);
  }
  return ErrorFrameHandler(c);
}

app.frame('/', StartFrameHandler);
app.frame('/error', ErrorFrameHandler);
app.frame('/apply', (c) => verified(c, ApplyFrameHandler));
app.frame('/success', (c) => verified(c, SuccessFrameHandler))
app.frame('/claimed', (c) => verified(c, ClaimedFrameHandler))

export const GET = handle(app)
export const POST = handle(app)
