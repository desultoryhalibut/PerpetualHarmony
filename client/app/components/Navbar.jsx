import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

import auth from '../auth'

class MyNav extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const username = auth.getToken();

    return (
      <Navbar >
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to={{ pathname: '/'}}><a href="#">EatUp</a></LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>

          <Nav pullRight>
            {this.props.loggedIn ? (
              <LinkContainer to={{ pathname: '/logout'}}><NavItem eventKey={1} href="#">Welcome {username}! | Logout</NavItem></LinkContainer>
            ) : (
              <LinkContainer to={{ pathname: '/login'}}><NavItem eventKey={1} href="#">Sign in</NavItem></LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }

};

export default MyNav;
