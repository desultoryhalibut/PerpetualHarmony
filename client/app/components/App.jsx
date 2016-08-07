import React from 'react'
import auth from '../auth'
import { Link } from 'react-router';
import MyNav from './Navbar.jsx';
import Home from './Home.jsx';
import EatupDetails from './EatupDetails.jsx';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userRSVPs: [],
      allEatups: [],
      search: '',
      currentEatup: null,
      currentEatupRSVPs: [],
      currentEatupComments: [],
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
    this.getUserCreatedSession.bind(this)();
    this.getAllSessions();
    this.setState(this.state);
  }

  getUserCreatedSession() {
    var that = this;
    $.ajax({
      type:'GET',
      url: 'http://localhost:3000/api/users/rsvp',
      data: {username: auth.getToken()},
      contentType: 'application/json'
    })
    .done(data => {
      console.log('Successfully logged in');
      this.setState({
        userRSVPs: data
      }, () => {
        console.log('userRSVPs from App ', this.state.userRSVPs);
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
        console.log('Success in retrieving all eatups:',sessions);
        that.setState({
          allEatups: sessions
        });
      }
    });
  }

  getEatupDetails(eatupId) {
    var that = this;

    // Retrieves Eatup Details
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

    //Retrieve RSVPs for specified Eatup
    $.ajax({
      type: 'GET',
      url: `http://localhost:3000/api/eatup/${eatupId}/rsvp`,
      contentType: 'application/json'
    })
    .done(rsvps => {
      console.log('RSVPs for EatUp', rsvps);

      this.setState({currentEatupRSVPs: rsvps}, () => {
        console.log(`currentEatupRSVPs for ${eatupId} is now  ${that.state.currentEatup}`);
      });
    })
    .fail(err => {
      console.error('Error retrieving eatup RSVPs ', err);
    });

    //Retrieve COMMENTS for specified Eatup
    $.ajax({
      type: 'GET',
      url: `http://localhost:3000/api/eatup/${eatupId}/comment`,
      contentType: 'application/json'
    })
    .done(comments => {
      console.log('COMMENTS for EatUp', comments);

      this.setState({currentEatupComments: comments}, () => {
        console.log(`currentEatupComments for ${eatupId} is now  ${that.state.currentEatup}`);
      });
    })
    .fail(err => {
      console.error('Error retrieving eatup comments ', err);
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

  resetState() {
    this.setState({currentEatup: null});
  }

  render() {
    var partial;

    if(!this.state.currentEatup) {
      partial = <Home data={{refresh: this.refresh.bind(this), userRSVPs: this.state.userRSVPs, allEatups: this.state.allEatups, currentPlace: this.state.currentPlace, currentEatup: this.state.currentEatup}}
            refresh={ this.refresh.bind(this) }
            handleSearchChange={ this.handleSearchChange.bind(this) }
            handleSubmit={ this.handleSubmit.bind(this) }
            getEatupDetails={ this.getEatupDetails.bind(this) }
      />;
    } else {
      partial = <EatupDetails currentEatup={this.state.currentEatup} currentEatupRSVPs={this.state.currentEatupRSVPs}
      currentEatupComments={this.state.currentEatupComments}
      />
    }

    return (
      <div>

        <MyNav loggedIn = { this.state.loggedIn } resetState={this.resetState.bind(this)}/>

        { partial }


      </div>
    )
  }
}

export default App
