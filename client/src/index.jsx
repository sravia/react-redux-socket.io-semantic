import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { RootRouter } from './routers/RootRouter';
import configureStore from './store/configureStore';
import 'semantic-ui-css/semantic.min.css';
import './assets/styles.scss';

const store = configureStore();

render(
  <Provider store={store}>
    <RootRouter />
  </Provider>,
  document.getElementById('root')
);
