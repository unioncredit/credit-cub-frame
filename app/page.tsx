import { getFrameMetadata } from "frog/next";
import type { Metadata } from "next";
import Image from "next/image";

import styles from "./page.module.css";
import CreditLedger from "@/components/ledger/Table";
import { kv } from "@vercel/kv";
import { Session } from "@/types/session";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const frameTags = await getFrameMetadata(
    `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api`,
  );
  return {
    title: "Credit Cub's Credit Club",
    description: 'Share this website on Farcaster to see if you are eligible to receive up to $4269 in credit from a real imaginary bear.',
    other: frameTags,
  };
}

export default async function Home() {
  const data = await Promise.all((await kv.smembers("global:ledger")).map(fid =>
    kv.get(`session:${fid}`)
  )) as Session[];

  return (
    <main className={styles.main}>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/creditcub.png"
          alt="The Credit Cub"
          width={384}
          height={384}
          priority
        />

        <h1 className={styles.header}>
          Welcome to Credit Cub's Credit Club!
        </h1>

        <p className={styles.text}>
          Share this page on Farcaster to see if you are eligible to receive up to $4269 in credit from a real imaginary bear.
        </p>

        <a className={styles.button} target="_blank" rel="noopener"
           href="https://github.com/unioncredit/credit-cub-frame">
          <span className="d-none d-sm-inline"> View on GitHub </span>
          <svg className={styles.githubLogo} viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            <path
              d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
          </svg>
        </a>

        <h2 id="ledger" className={styles.header} style={{ marginTop: 48 }}>The Legder</h2>
        <CreditLedger rows={data} />
      </div>

      <a className={styles.promo} target="_blank" rel="noopener" href="https://union.finance/">
        Made with ❤️ by Union
      </a>
    </main>
  );
}
