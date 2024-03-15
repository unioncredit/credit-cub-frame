/** @jsxImportSource frog/jsx */

import { Frog } from 'frog'
import { handle } from 'frog/next'
import { start } from "@/frames/start";

const app = new Frog({
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

app.frame('/', start)

export const GET = handle(app)
export const POST = handle(app)
