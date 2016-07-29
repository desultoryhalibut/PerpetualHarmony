import React from 'react';
import auth from '../auth';
import { Link, withRouter } from 'react-router';

class Logout extends React.Component {
  componentDidMount() {
    auth.logout();
    console.log(this.props);
  }

  render() {
    return <p>You are now logged out</p>
  }
}

export default Logout
