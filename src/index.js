import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import myStore from './store/createStore'
import {changeCity} from './actions/climateAction'
const store=myStore()

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    
    
    , document.getElementById('root'));

