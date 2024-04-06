import { FC } from 'react';
import { createRoot } from 'react-dom/client';

const App: FC = () => {
  return <div>Hello, world!</div>;
};

const root = createRoot(document.getElementById('root')!);

root.render(<App />);
