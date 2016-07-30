import React from 'react'
import auth from '../auth'
import { Link } from 'react-router';
import MyNav from './Navbar.jsx';
import Home from './Home.jsx';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userSession: [],
      sessions: [],
      search: '',
      currentEatup: {},
      currentPlace: {},
      autocomplete: null
    }
  }

  componentWillMount() {
    auth.onChange = this.updateAuth.bind(this)
    auth.login()
    this.getUserCreatedSession();
    this.getAllSessions();
    this.getUserLocation();
  }

  updateAuth(loggedIn) {
    this.setState({
      loggedIn
    })
  }

  refresh() {
    this.getUserCreatedSession().bind(this);
    this.getAllSessions();
    this.setState(this.state);
  }

  getUserCreatedSession() {
    var that = this;
    $.ajax({
      type:'GET',
      url: 'http://localhost:3000/api/users/rsvp',
      data: ({username: auth.getToken()}),
      contentType: 'application/json'
    })
    .done(data => {
      console.log('Successfully logged in');
      this.setState({
        userSession: data
      }, () => {
        console.log('UserSessions from App ', this.state.userSession);
      });
    })
    .fail(error => {
      console.error(error);
    });
  }

  getAllSessions () {

    var that = this;

    $.ajax({
      type:'GET',
      url: 'http://localhost:3000/api/eatup',
      contentType: 'application/json',
      success: (sessions) => {
        that.setState({
          sessions: sessions
        });
      }
    });
  }

  getEatupDetails(eatupId) {
    var that = this;
    $.ajax({
      type: 'GET',
      url: `http://localhost:3000/api/eatup/${eatupId}`,
      contentType: 'application/json'
    })
    .done(details => {
      console.log('Details for EatUp', details);
      this.setState({currentEatup: details}, () => {
        console.log(`Current EatUpstate for ${eatupId} is now  ${that.state.currentEatup}`);
      });
    })
    .fail(err => {
      console.error('Error retrieving eatup details ', err);
    });
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
    this.setState({ search: e.target.value });
  }

  handleSubmit() {
    var that = this;
    var place = this.state.autocomplete.getPlace();
    this.setState({currentPlace: place}, function() {
      console.log('currentPlace is set to ', that.state.currentPlace);
    });
  }

  componentDidMount() {
    if(!this.state.loggedIn) {
      this.props.router.replace('/login');
    }
    var input = document.getElementById('searchTextField');
    var options = {componentRestrictions: {country: 'us'}};
    this.setState({ autocomplete: new google.maps.places.Autocomplete(input, options) });
  }

  render() {
    console.log('Current Eatup ', this.state.currentEatup);
    return (
      <div>
        <MyNav loggedIn = { this.state.loggedIn }
        />

        <Home data={{userSession: this.state.userSession, sessions: this.state.sessions, currentPlace: this.state.currentPlace, currentEatup: this.state.currentEatup}}
              refresh={ this.refresh.bind(this) }
              handleSearchChange={ this.handleSearchChange.bind(this) }
              handleSubmit={ this.handleSubmit.bind(this) }
              getEatupDetails={ this.getEatupDetails.bind(this) }
        />

        {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
      </div>
    )
  }
}

export default App
