import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css'; // This is now our main CSS file

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);