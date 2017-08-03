import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { AppContainer } from 'react-hot-loader';
import ReduxPromise from 'redux-promise';
import rootReducer from './src/reducers/index';
import App from './src/components/app';

const store = createStore(
  rootReducer,
  applyMiddleware(ReduxPromise)
);



  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
    document.getElementById('root')
  );

