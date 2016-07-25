import React from 'react'
import auth from '../auth'
import { Link } from 'react-router';
import MyNav from './Navbar.jsx';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: auth.loggedIn(),
      userSession: [],
      sessions: [],
      search: ''
    }
  }

  updateAuth(loggedIn) {
    this.setState({
      loggedIn
    })
  }

  componentWillMount() {
    auth.onChange = this.updateAuth.bind(this)
    auth.login()
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

  handleSubmit() {
    // post this.state.search to database
    var place = this.state.autocomplete.getPlace();
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/sessions/createMeetUp',
      //How do we get the actual username
      data: JSON.stringify({username: auth.getToken(), 
                            locationName: place.name, 
                            locationAddress: place.formatted_address}),
      contentType: 'application/json',
      success: (data) => {
        this.getUserCreatedSession();
        this.getAllSessions();
        this.setState(this.state); 
      }
    });
  }

  componentDidMount() {
    var input = document.getElementById('searchTextField');
    var options = {componentRestrictions: {country: 'us'}};   
    this.setState({ autocomplete: new google.maps.places.Autocomplete(input, options) });
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
    })
  }

  render() {
    return (
      <div>
        <MyNav loggedIn = { this.state.loggedIn }
               handleSearchChange = { this.handleSearchChange.bind(this) } 
               handleSubmit = { this.handleSubmit.bind(this) } 
        />
        {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
      </div>
    )
  }
}

export default App
