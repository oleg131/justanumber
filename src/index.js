import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'pikaday/css/pikaday.css';
import './index.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
