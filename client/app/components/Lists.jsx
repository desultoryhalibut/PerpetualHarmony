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
          console.log('Rsvp successful:',data)
          this.props.refresh();
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

        <div className="card card-block" key={index} >
          <h4 className="card-title" key={index}>{result.title}</h4>
          <span><Button bsStyle="success" bsSize="xs" onClick={this.handleSearch.bind(this, result)}>Get Details</Button></span>
          <div className="card-text">
            <Grid>
              <Row className="show-grid">
                <Col md={4} mdPush={4}>
                  <p className="address-text">{result.Restaurant.name}</p> 
                  <h5>{result.Restaurant.address}</h5> 
                  <h5><strong>From: </strong> {moment(result.startTime).format("MMM Do YY")} - {moment(result.endTime).format("MMM Do YY")}</h5>
                  <h5><strong>Hosted By: </strong> {result.User.username}</h5>
                </Col>
                <Col md={4} mdPull={4}>
                  <div className="rsvpButton">
                    <Button bsStyle="success" bsSize="sm" key={index}
                    onClick= { this.rsvpToEatUp.bind(this, result) }>  { ( this.state.confirmRSVP && (result.id === this.state.RSVP) ) ? <Results /> : null } Join!</Button>
                  </div>
                </Col>
              </Row>
            </Grid>
            
            

            
            
          </div>
        </div>
        )
      return (
        <div>
          
          <ul className="list-group eatupsList">
            {resultStuffs.reverse()}
          </ul>
        </div>
      )
    }
  })
)

export default ListOfEatUp;
