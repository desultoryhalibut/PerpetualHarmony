import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import moment from 'moment';
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
      // var nRoute = 'home/' + event.id;
      var id = event.id;
      this.setState({currentEatup: event}, () => {
        this.props.getEatupDetails(id);
        // this.props.router.replace(nRoute);
      });

    },

    rsvpToEatUp(result, rsvpId) {
      var that = this;

      this.setState({ confirmRSVP: true });
      var eatupId = result.id;

      $.ajax({
        type: 'POST',
        url: `http://localhost:3000/api/eatup/${eatupId}/rsvp`,
        data: JSON.stringify({
          username: auth.getToken()
        }),
        contentType: 'application/json',
        success: function(data) {
          that.setState({RSVP: eatupId});
          that.props.refresh();
        }
      })
      .done(data => {
        console.log('all RSVPs for user:',this.props);
      })
      .fail(err => {
        console.log('Error RSVPing to event ', err);
      });
    },

    render () {

      var resultStuffs = this.props.allEatups.map((result, index) =>

        <div className="card card-block clearfix" key={index} >

          <h4 className="card-title" key={index}>{result.title}</h4>

          <span><Button bsStyle="success" bsSize="xs" onClick={this.handleSearch.bind(this, result)}>Get Details</Button></span>
          <div className="card-text">

            <p className="address-text"><strong>Where: </strong>{result.Restaurant.name}</p>
            <h6>{result.Restaurant.address}</h6>
            <h6>{moment(result.startTime).format("llll")} - {moment(result.endTime).format("llll")}</h6>
            <h6>Hosted by: {result.User.username}</h6>

              { ( this.state.confirmRSVP && index === result.id ) ? <Results /> : null }
            <Button className="btn-primary" bsSize="xs" onClick={this.handleSearch.bind(this, result)}>Get Details</Button>
            <Button className="rsvpButton btn-primary" bsSize="sm" key={index}

            onClick= { this.rsvpToEatUp.bind(this, result) }>
            { ( this.state.confirmRSVP && (result.id === this.state.RSVP) ) ? <Results /> : null } Join!
            </Button>

          </div>
        </div>
      )
      return (
        <div>

          <h1 className="text-center eatup-headline-container">Eatups around you!</h1>

          <ul className="list-group eatupsList">
            {resultStuffs.reverse()}
          </ul>

        </div>
      )
    }
  })
)

export default ListOfEatUp;
