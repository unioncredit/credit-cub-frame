/** @jsxImportSource frog/jsx */
import React from "react";
import { propsToStyles } from "@/utils/styles";

type Props = {
  children: React.ReactNode;
  size?: number;
  align?: 'left' | 'center' | 'right';
  weight?: number;
}

export const Text = ({
  size = 24,
  align = 'left',
  weight = 400,
  children,
  ...props
}: Props) => (
  <p
    style={{
      textAlign: align,
      fontSize: `${size}px`,
      fontWeight: weight,
      fontFamily: 'Radio Canada',
      ...propsToStyles(props),
    }}
  >
    {children}
  </p>
);