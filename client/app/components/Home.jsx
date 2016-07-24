
import React from 'react';
import Promise from 'bluebird';
import { Link } from 'react-router';
import MyNav from './Navbar.jsx';
import MyEatups from './MyEatups.jsx';
import ListOfEatUp from './Lists.jsx';
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      selectedCoordinate: null,
      userSession: [],
      sessions: [],
      key: 1
    }
  }

  componentWillMount() {
    this.getUserCreatedSession();
    this.getAllSessions();
  }

  componentDidMount() {
    var input = document.getElementById('searchTextField');
    var options = {componentRestrictions: {country: 'us'}};   
    this.setState({ autocomplete: new google.maps.places.Autocomplete(input, options) });
  }

  handleSearchChange(e) {
    this.setState({ search: e.target.value })
  }

  handleSubmit() {
    // post this.state.search to database

    var place = this.state.autocomplete.getPlace();
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/sessions/createMeetUp',
      //How do we get the actual username
      data: JSON.stringify({username: 'Dan', locationName: place.name, locationAddress: place.formatted_address}),
      contentType: 'application/json',
      success: (data) => {
        this.getAllSessions();
        this.getUserCreatedSession();
        this.setState(this.state); 
      }
    });
  }

  getUserCreatedSession() {
    $.ajax({
      type:'GET',
      url: 'http://localhost:3000/sessions/userSessions',
      data: ({username: 'Dan'}),
      contentType: 'application/json',
      success: (userSession) => {
        this.setState({
          userSession: userSession
        });
      }
    });
  };

  getAllSessions () {
      $.ajax({
        type:'GET',
        url: 'http://localhost:3000/sessions/allSessions',
        success: (sessions) => {
          this.setState({
            sessions: sessions
          });
        }
      })
  }

  render() {
    return (
      //Defines the nav bar and different routes depending on clicks
      <div>
        <MyNav handleSearchChange={ this.handleSearchChange.bind(this) } 
               handleSubmit={ this.handleSubmit.bind(this) } />
        <Grid>
          <Row>
            <Col xs={6} md={5} className="allEatups">
              <ListOfEatUp sessions = {this.state.sessions} />
            </Col>
            <Col xs={3} md={3} className="myEatups well">
              <MyEatups userSession = {this.state.userSession} />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }

}

export default Home;
