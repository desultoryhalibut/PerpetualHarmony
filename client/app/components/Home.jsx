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
      sessions: []
    }
  }

  componentWillMount() {
    this.getUserCreatedSession();
    this.getAllSessions();
  }

  refresh() {
    this.getUserCreatedSession();
    this.getAllSessions();
  }

  getUserCreatedSession() {
    var that = this;
    $.ajax({
      type:'GET',
      url: 'http://localhost:3000/sessions/userSessions',
      data: ({username: auth.getToken()}),
      contentType: 'application/json',
      success: (userSession) => {
        that.setState({
          userSession: userSession
        });
        this.refresh();
      }
    });
  }

  refresh() {
    this.getAllSessions();
    this.getUserCreatedSession();
    this.setState(this.state)
   }

  getAllSessions () {

    var that = this;

    $.ajax({
      type:'GET',
      url: 'http://localhost:3000/sessions/allSessions',
      contentType: 'application/json',
      success: (sessions) => {
        that.setState({
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
              <ListOfEatUp sessions = {this.state.sessions} refresh={this.refresh.bind(this)} />
            </Col>
            <Col xs={5} md={4} className="myEatups">
              <MyEatups userSession = {this.state.userSession} refresh={this.refresh.bind(this)} />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Home;
