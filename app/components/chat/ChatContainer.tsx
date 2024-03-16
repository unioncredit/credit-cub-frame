/** @jsxImportSource frog/jsx */
import React from "react";

interface Props {
  image: "desk" | "lobby" | "reading";
  children: React.ReactNode;
}

export const ChatContainer = ({ image, children }: Props) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'flex-end',
      backgroundImage: `url(${process.env.NEXT_PUBLIC_URL!}/${image}.jpg)`,
      backgroundPosition: 'center',
      backgroundSize: '100%',
      height: '100%',
      textAlign: 'center',
      width: '100%',
      padding: '16px',
    }}
  >
    {children}
  </div>
);
