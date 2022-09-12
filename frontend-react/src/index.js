import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./Styles/formStyle.css";
import "./Styles/buttonStyle.css";
import "./Styles/invoiceFormStyle.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);