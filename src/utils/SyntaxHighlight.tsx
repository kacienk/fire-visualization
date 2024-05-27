// third-party
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { SyntaxHighlighterProps } from 'react-syntax-highlighter';

// ==============================|| CODE HIGHLIGHTER ||============================== //

export const SyntaxHighlight = ({ children, ...others }: SyntaxHighlighterProps) => {
  return (
    <SyntaxHighlighter
      language="javacript"
      showLineNumbers
      style={a11yDark}
      {...others}
    >
      {children}
    </SyntaxHighlighter>
  );
};
