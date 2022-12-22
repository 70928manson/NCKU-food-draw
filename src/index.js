import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/modules/reset.module.scss';
import App from './App';

import 'bootstrap/dist/css/bootstrap.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //React.StrictMode
  <>
    <App />
  </>
);