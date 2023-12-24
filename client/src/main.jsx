import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { DarkModeProvider } from './context/DarkModeContext.jsx';
import { ErrorBoundary } from 'react-error-boundary';
import PageError from './pages/PageError.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ErrorBoundary FallbackComponent={PageError}>
            <DarkModeProvider>
                <App />
            </DarkModeProvider>
        </ErrorBoundary>
    </React.StrictMode>
);
