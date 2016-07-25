
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
    }
  }

  componentWillMount() {
    this.getAllSessions();
    this.getUserCreatedSession();
    this.getUserLocation();
  }

  googlePlaces() {
    var input = document.getElementById('searchTextField');
    var options = {radius: 5000, types: 'establishment'};
    var location = {latitude: this.state.location.lat, longitude: this.state.location.long}

    this.setState({ autocomplete: new google.maps.places.Autocomplete(input, location, options)});
  }

  getUserLocation() {
    var that = this;

    if (navigator.geolocation) {
      console.log('Geolocation is supported!');
      var geoSuccess = function(position) {
        that.setState({location: {lat: position.coords.latitude, long: position.coords.longitude}});
        that.googlePlaces();
      };
      navigator.geolocation.getCurrentPosition(geoSuccess);
    }
    else {
      console.log('Geolocation is not supported for this Browser/OS version yet.');
    }
  }

  handleSearchChange(e) {
    this.setState({ search: e.target.value })
  }

  refresh() {
    this.getAllSessions();
    this.getUserCreatedSession();
    this.setState(this.state); 
  }

  handleSubmit() {
    var place = this.state.autocomplete.getPlace();
    
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/sessions/createMeetUp',
      //How do we get the actual username
      data: JSON.stringify({username: 'Dan', locationName: place.name, locationAddress: place.formatted_address}),
      contentType: 'application/json',
      success: (data) => {
        this.refresh();
      }
    });
  }

  getUserCreatedSession() {
    
    $.ajax({
      type:'GET',
      url: 'http://localhost:3000/sessions/userSessions',
      data: ({username: 'Dan'}),
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
      contentType: 'application/json',
      success: (sessions) => {
        this.setState({
          sessions: sessions
        });
      }
    });
  }

  render() {
    return (
      <div>
        <MyNav handleSearchChange={ this.handleSearchChange.bind(this) } 
               handleSubmit={ this.handleSubmit.bind(this) } />
        <Grid>
          <Row>
            <Col xs={6} md={5} className="allEatups">
              <ListOfEatUp sessions = {this.state.sessions} />
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
