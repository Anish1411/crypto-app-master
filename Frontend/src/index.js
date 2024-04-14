import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './app/store';

// import 'antd/dist/antd.css';
import 'antd/dist/reset.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </BrowserRouter> */}
  </React.StrictMode>
);
