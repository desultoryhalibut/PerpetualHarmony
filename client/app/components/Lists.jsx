import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { Router, Route, Link, hashHistory } from 'react-router';

class ListOfEatUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    var input = document.getElementById('searchTextField');
    var options = {componentRestrictions: {country: 'us'}};
    this.setState({ autocomplete: new google.maps.places.Autocomplete(input, options) });
  }

  handleSearch(event) {
    // var transitionTo = Router.transitionTo;
    console.log(event.id);
    window.location='/#/home/' + event.id;
  }

  rsvpToEatUp(index,props) {
    var eatupToCreate = index;

    console.log('this.state.autocomplete',this.state.autocomplete, 'this.props:',this.props) //this.props produces all eatups. access them by using index

    $.ajax({
      type:'POST',
      url: 'http://localhost:3000/api/eatup/:id/rsvp',  //TO CHANGE
      data: JSON.stringify({userId: eatupToCreate.creatorId}),   //TO CHANGE
                            // sessionId: eatupToCreate.id}),   TO CHANGE
      contentType: 'application/json',
      success: (data) => {
        // console.log('Successfully created ',data);
        // this.setState(this.state);
        // this.props.refresh();
      }
    });
  }


  render () {
    var resultStuffs = this.props.sessions.map((result,index) =>

      <div className="card card-block" key={index} >
        <h4 className="card-title" key={index}>{result.title}</h4>
        <div className="card-text">
          <p>{result.address}</p>
          <p>{result.startTime} - {result.endTime}</p>
          <p>Hosted by: {result.User.username}</p>
          <Button bsStyle="success" bsSize="xs" onClick={this.handleSearch.bind(this, result)}>Get Details</Button>
          <Button className="rsvpButton" bsStyle="success" bsSize="sm" key={index}
          onClick= { this.rsvpToEatUp.bind(this, index, this.props) }>RSVP</Button>
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
}

export default ListOfEatUp;
