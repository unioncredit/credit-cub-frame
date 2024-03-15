/** @jsxImportSource frog/jsx */

export const ChatContainer = ({ children }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'flex-end',
      background: 'white',
      height: '100%',
      textAlign: 'center',
      width: '100%',
      padding: '16px',
    }}
  >
    {children}
  </div>
);