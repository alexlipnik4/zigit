import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import AuthProvider from './app/common/context/AuthContext';
import './scss/main.scss'

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);
