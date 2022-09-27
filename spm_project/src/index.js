import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import React-Router-Dom 
import {BrowserRouter} from 'react-router-dom'; 
// Import Redux Materials
import { Provider } from 'react-redux';
import {store} from './reduxtoolkit/store';


// const store = createStore(reducers, compose(applyMiddleware(thunk)))/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Provider is from Redux, BrowserRouter is from routers */}
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
