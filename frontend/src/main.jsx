import App from './App.jsx';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import store from './redux/store.js';
import {Provider} from 'react-redux';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer} from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
);
