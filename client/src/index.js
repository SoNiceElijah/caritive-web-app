import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import MainPage from './components/MainPage';
import TestRequests from './components/TestRequests';

ReactDOM.render(
  <React.StrictMode>
    <TestRequests />
  </React.StrictMode>,
  document.getElementById('root')
);
