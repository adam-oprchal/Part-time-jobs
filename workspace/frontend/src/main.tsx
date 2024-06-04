import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import CssBaseline from '@mui/material/CssBaseline'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <CssBaseline />
    <App />
  </StrictMode>
);
