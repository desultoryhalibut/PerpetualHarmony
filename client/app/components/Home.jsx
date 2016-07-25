import React from 'react';
import Promise from 'bluebird';
import { Link } from 'react-router';
import MyNav from './Navbar.jsx';
import MyEatups from './MyEatups.jsx';
import ListOfEatUp from './Lists.jsx';
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import auth from '../auth'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCoordinate: null,
      userSession: [],
      sessions: [],
    }
  }

  componentWillMount() {
    this.getAllSessions();
    this.getUserCreatedSession();
  }

  getUserCreatedSession() {
    
    $.ajax({
      type:'GET',
      url: 'http://localhost:3000/sessions/userSessions',
      data: ({username: auth.getToken()}),
      contentType: 'application/json',
      success: (userSession) => {
        this.setState({
          userSession: userSession
        });
      }
    });
  }

  getAllSessions () {

    $.ajax({
      type:'GET',
      url: 'http://localhost:3000/sessions/allSessions',
      contentType: 'application/json',
      success: (sessions) => {
        console.log(auth.getToken());
        console.log('Sessions: ', sessions);
        this.setState({
          sessions: sessions
        });
      }
    });
  }

  render() {
    
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={6} md={5} className="allEatups">
              <ListOfEatUp sessions = {this.state.sessions} username={this.state.token} />
            </Col>
            <Col xs={3} md={3} className="myEatups well">
              <MyEatups userSession = {this.state.userSession} onDelete={this.refresh.bind(this)} />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Home;
