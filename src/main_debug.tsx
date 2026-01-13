import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log("DEBUG: Testing App.tsx import");

try {
    const root = document.getElementById('root')!;
    createRoot(root).render(<App />);
} catch (e) {
    console.error("DEBUG ERROR:", e);
}
