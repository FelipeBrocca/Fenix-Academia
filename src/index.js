import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css';
import { LoginProvider } from './context/LoginContext';
import { PlayersProvider } from './context/PlayersContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <LoginProvider>
            <PlayersProvider>
                <App />
            </PlayersProvider>
        </LoginProvider>
    </StrictMode>
);

