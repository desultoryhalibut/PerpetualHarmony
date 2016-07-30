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


var Results = React.createClass({
    render: function() {
      console.log('Results rendering')
        return (
            <span className="glyphicon glyphicon-ok" aria-hidden="false"></span>
        );
    }
});

const ListOfEatUp = withRouter(
  React.createClass({
    componentDidMount() {
      var input = document.getElementById('searchTextField');
      var options = {componentRestrictions: {country: 'us'}};
      this.setState({ autocomplete: new google.maps.places.Autocomplete(input, options) });
    },


    getDetails(event) {
      var id = event.id;
      console.log('getDetails event id' , event.id);
    },

    getInitialState: function() {
        return { 
          confirmRSVP: false,
        };
    },
    handleSearch(event) {
      var nRoute = 'home/' + event.id;
      var nRoute = 'home/' + id;
      this.props.getEatupDetails(id);
      this.props.router.replace(nRoute);
      console.log('props and state', this.props, this.state);
    },

    rsvpToEatUp(result, rsvpId) {
      this.setState({ confirmRSVP: true });
      var eatupId = result.id;

      $.ajax({
        type: 'POST',
        url: `http://localhost:3000/api/eatup/${eatupId}/rsvp`,
        data: JSON.stringify({
          username: auth.getToken()
        }),
        contentType: 'application/json'
      })
      .done(data => {
        console.log('new RSVP data', data);
      })
      .fail(err => {
        console.log('Error RSVPing to event ', err);
      });
    },
    

    render () {

      var resultStuffs = this.props.allEatups.map((result, index) =>

        <div className="card card-block" key={index} >
          <h4 className="card-title" key={index}>{result.title}</h4>

          <div className="card-text">
            <p className="address-text"><strong>Where: </strong>{result.Restaurant.name}</p>
            <h6>{result.Restaurant.address}</h6>
            <h6>{result.startTime} - {result.endTime} {result.date}</h6>
            <h6>Hosted by: {result.User.username}</h6>
              
              { ( this.state.confirmRSVP && index === result.id ) ? <Results /> : null }
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
