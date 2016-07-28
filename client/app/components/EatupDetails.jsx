import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import MyNav from './Navbar.jsx';
const RouteHandler = require('react-router').RouteHandler;  

class EatupDetails extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      
    }
  }

  //write function to grab place details from database using this.props.params.eatupdetails (index/unique identifier)
  


  render () {
    var queryParams = this.props.location.query;
    console.log('this.props',this.props.params.eatupdetails)
    return(
    <div>
    <MyNav loggedIn = { this.state.loggedIn }

           
    />
    <h1>Eatup details</h1>
    <ul> 
      <li>{this.props.params.eatupdetails}</li>
    </ul>
    
    </div>
  ) 
  }
}


export default EatupDetails;