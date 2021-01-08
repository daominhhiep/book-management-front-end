// import 'bootstrap/dist/css/bootstrap.min.css';
import 'babel-polyfill';
import { render } from 'react-dom';
import React from "react";
import {Provider} from 'react-redux';
import configureStore from './configureStore'
import routes from './routes'

const store = configureStore()
render((
    <Provider store={store}>
        {routes}
    </Provider>
), document.getElementById('app'))



