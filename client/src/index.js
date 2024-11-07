import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App'; // App already contains the Router
import store from './store';
import './styles/global.css';

ReactDOM.render(
  <Provider store={store}>
    <App /> {/* No need for BrowserRouter here */}
  </Provider>,
  document.getElementById('root')
);
