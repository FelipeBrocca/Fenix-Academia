import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { PlayersProvider } from './context/PlayersContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PlayersProvider>
    <App />
  </PlayersProvider>
);

