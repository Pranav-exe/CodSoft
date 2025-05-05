import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Web3Provider } from './components/Web3Provider';
import App from './App';
import './index.css';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Web3Provider>
    <App />
      </Web3Provider>
    </BrowserRouter>
  </StrictMode>
);