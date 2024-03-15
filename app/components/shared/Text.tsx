/** @jsxImportSource frog/jsx */
import React from "react";
import { propsToStyles } from "@/utils/styles";

type Props = {
  size: number;
  align: 'left' | 'center' | 'right';
  children: React.ReactNode;
}

export const Text = ({
  size = 24,
  align = 'left',
  children,
  ...props
}: Props) => (
  <p
    style={{
      textAlign: align,
      fontSize: `${size}px`,
      ...propsToStyles(props),
    }}
  >
    {children}
  </p>
);