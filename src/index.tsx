import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';
import { ScrollTop } from './components/ScrollTop';
import ThemeCustomization from './themes';

const App = () => {
  return (
    <ThemeCustomization>
      <ScrollTop>
        <Routes />
      </ScrollTop>
    </ThemeCustomization>
  );
};

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <ReduxProvider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </ReduxProvider>
  </StrictMode>,
);
