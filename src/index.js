import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Ensure BrowserRouter is imported

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router> {/* Wrap the entire app with BrowserRouter */}
    <App />
  </Router>
);
