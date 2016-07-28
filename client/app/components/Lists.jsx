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


  handleSearch(event) {
    // var transitionTo = Router.transitionTo;
    console.log(event.id);
    window.location='/#/home/' + event.id;

  }

  render () {
    var resultStuffs = this.props.sessions.map((result,index) => 

      <div className="card card-block" key={index} onClick={this.handleSearch.bind(this, result)}>
        <h4 className="card-title" key={index}>{result.sessionname}</h4>
        <div className="card-text">
          <p>{result.address}</p>
          <p>Hosted by: {result.User.username}</p>
          <Button onClick={this.handleSearch.bind(this)}>Get Details</Button>
        </div>
      </div>
      )
    console.log("resultStuffs",resultStuffs)
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