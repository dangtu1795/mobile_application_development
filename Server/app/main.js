import React from 'react';
import {Router} from 'react-router';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import {browserHistory}  from 'react-router';
import routes from './routes';

let history = createHistory();

ReactDOM.render(<Router history={browserHistory}>{routes}</Router>, document.getElementById('app'));