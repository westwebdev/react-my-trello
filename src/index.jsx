
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './common/App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
    //<StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    //</StrictMode>
);

