/** @jsxImportSource frog/jsx */
import { Text } from "@/components/shared/Text";

type Props = {
  name: string;
  content: string;
}

export const ChatBox = ({ name, content }: Props) => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        border: '1px solid black',
        height: '33%',
        padding: '16px',
        position: 'relative',
      }}
    >
      <Text
        m={0}
        size={42}
        align={'left'}
        style={{
          top: 0,
          color: 'white',
          background: 'blue',
          position: 'absolute',
          transform: 'translateY(-100%)',
          border: '1px solid black',
          padding: '8px',
        }}
      >
        {name}
      </Text>

      <Text m={0} size={48} align={'left'}>
        {content}
      </Text>
    </div>
  )
};