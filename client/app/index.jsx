import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory } from 'react-router';

import App from './components/App.jsx';
import Loading from './components/Loading.jsx';
import Home from './components/Home.jsx';
import EatupDetails from './components/EatupDetails.jsx';
import Logout from './components/Logout.jsx';
import auth from './auth'

const requireAuth = (nextState, replace) => {
  console.log('are we logging in?',auth.loggedIn())
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

document.addEventListener('DOMContentLoaded', function() {
  //Defines the routes for app and renders different components
  ReactDOM.render((
  <Router history={ hashHistory }>

    <Route path="/" component={App} onEnter={requireAuth} />
    <Route path="/login" component={Loading} />
      <div className="container">
        <Route path="home" component={Home} onEnter={requireAuth} />
        <Route path="home/:eatupdetails" component={EatupDetails} />
        <Route path="logout" component={Loading} />
      </div>
  </Router>
  ), document.getElementById('app'));
});
