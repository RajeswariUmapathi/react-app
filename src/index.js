import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './js/login.js';
import Home from './js/homePage.js';

ReactDOM.render(
	<Router>
		<div>
			<Route path="/" exact component={Login} />
			<Route path="/home" component={Home} />
		</div>
	</Router>
, document.getElementById('root'));
