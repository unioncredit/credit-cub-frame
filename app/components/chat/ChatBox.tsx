/** @jsxImportSource frog/jsx */
import React from "react";

type Props = {
  padding?: number;
  children: React.ReactNode;
}

export const ChatBox = ({ padding = 24, children }: Props) => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        border: '1px solid black',
        height: '30%',
        padding: `${padding}px`,
        position: 'relative',
        background: 'white',
        flexDirection: 'column',
      }}
    >
      {/*<Text*/}
      {/*  m={0}*/}
      {/*  size={42}*/}
      {/*  align={'left'}*/}
      {/*  style={{*/}
      {/*    top: 0,*/}
      {/*    color: 'white',*/}
      {/*    background: 'blue',*/}
      {/*    position: 'absolute',*/}
      {/*    transform: 'translateY(-100%)',*/}
      {/*    border: '1px solid black',*/}
      {/*    padding: '8px',*/}
      {/*  }}*/}
      {/*>*/}
      {/*  {name}*/}
      {/*</Text>*/}

      {children}
    </div>
  )
};