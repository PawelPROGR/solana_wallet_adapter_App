import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Wallet from './provider/walletProvider';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Wallet>
      <App />
    </Wallet>
  </React.StrictMode>
);

reportWebVitals();

