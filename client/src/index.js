import React from 'react';
import { render } from 'react-dom';
import RootRouter from './routers/RootRouter';
import configureStore from './store/configureStore'
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import './assets/styles.scss';

const store = configureStore();

render(
	<Provider store={store}>
        <RootRouter />
    </Provider>,
	document.getElementById('root')
);