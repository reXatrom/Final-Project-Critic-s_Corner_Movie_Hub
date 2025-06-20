import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { Provider } from 'react-redux';
import { store } from './store/store';
import axios from 'axios';

/** Setup axios instance for OMDb API */
export const omdbAxios = axios.create({
  baseURL: 'http://www.omdbapi.com/',
});

// Add your OMDb API key to every request automatically
omdbAxios.interceptors.request.use(config => {
  if (!config.params) {
    config.params = {};
  }
  config.params.apikey = '6014290c'; // Replace with your actual API key if different
  return config;
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  // </React.StrictMode>
);

// Measure performance (optional)
reportWebVitals();
