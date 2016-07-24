import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory } from 'react-router';

import App from './components/App.jsx';
import Home from './components/Home.jsx';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';
import Logout from './components/Logout.jsx';
import auth from './auth'

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/signin',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

class AppRouter extends React.Component {

  render () {

    return (
      //Defines the routes for app and renders different components
      <Router history={ hashHistory }>
        <Route path="/" component={App}>
          <Route path="/home" component={Home} onEnter={requireAuth}></Route>
          <Route path="signin" component={SignIn}></Route>
          <Route path="logout" component={Logout}></Route>
          <Route path="signup" component={SignUp}></Route>
        </Route>
      </Router>
    )
  }
}

ReactDOM.render(<AppRouter />, document.getElementById('app'));
