import { createRoot } from 'react-dom/client';

const App: React.FC = () => {
  return <div>Hello, world!</div>;
};

const root = createRoot(document.getElementById('root')!);

root.render(<App />);
