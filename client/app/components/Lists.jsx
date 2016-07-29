import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Checkbox from 'react-bootstrap/lib/Checkbox';

import auth from '../auth'
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { Router, Route, Link, hashHistory, withRouter } from 'react-router';

const ListOfEatUp = withRouter(
  React.createClass({
    componentDidMount() {
      var input = document.getElementById('searchTextField');
      var options = {componentRestrictions: {country: 'us'}};
      this.setState({ autocomplete: new google.maps.places.Autocomplete(input, options) });
    },

    handleSearch(event) {
      var nRoute = 'home/' + event.id;
      this.props.router.replace(nRoute);
    },

    rsvpToEatUp(result) {
      
      var eatupId = result.id;
      console.log('auth.getToken',auth.getToken());
      //insert post request here
      $.ajax({
        url: 'api/eatup/'+eatupId+'/rsvp',
        method: 'POST',
        data: JSON.stringify({ username: auth.getToken() }),
        contentType: 'application/json', 
        success: function(data) {
          console.log('Successfully RSVPd:',data)
        }
      })
    },

    render () {
      var resultStuffs = this.props.sessions.map((result,index) => 

        <div className="card card-block" key={index} >
          <h4 className="card-title" key={index}>{result.title}</h4>
          <div className="card-text">
            <p>{result.Restaurant.address}</p>
            <p>{result.startTime} - {result.endTime} {result.date}</p>
            <p>Hosted by: {result.User.username}</p>
            <Button bsStyle="success" bsSize="xs" onClick={this.handleSearch.bind(this, result)}>Get Details</Button>
            <Button className="rsvpButton" bsStyle="success" bsSize="sm" key={index}
            onClick= { this.rsvpToEatUp.bind(this, result) }>Join!</Button>
          </div>
        </div>
        )
      return (
        <div>
          <h1>EatUps around you!</h1>
          <ul className="list-group eatupsList">
            {resultStuffs}
          </ul>
        </div>
      )
    }
  })
)

export default ListOfEatUp;
