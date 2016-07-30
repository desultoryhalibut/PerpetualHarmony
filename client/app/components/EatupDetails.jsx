import React from 'react';
import { Button, Grid, Row, Col, Image, Jumbotron, ListGroup, ListGroupItem, Panel, FieldGroup, Glyphicon } from 'react-bootstrap';

import MyNav from './Navbar.jsx';
import auth from '../auth';
const RouteHandler = require('react-router').RouteHandler;


class EatupDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: auth.loggedIn()
    }

  }

  componentWillMount() {
    // auth.onChange = this.updateAuth.bind(this)
    auth.login()
  }

  //write function to grab place details from database using this.props.params.eatupdetails (index/unique identifier)
    // var queryParams = this.props.location.query;
    // console.log('this.props',this.props.params.eatupdetails)

  render () {
    console.log('Current Eat Up in EatupDetails', this.props.currentEatup);

    var details = {
         "id":2,
         "title":"Join my meetup!",
         "startTime":"2012-12-31T19:30:45.000Z",
         "endTime":"2012-12-31T21:30:45.000Z",
         "description":"description of restaurant here",
         "createdAt":"2016-07-28T23:40:05.000Z",
         "updatedAt":"2016-07-28T23:40:05.000Z",
         "creatorId":4,
         "restaurantId":2,
         "User":{
            "id":4,
            "username":"tee",
            "password":"$2a$10$w6EOq/enUCHKQs8n1FPC7upMwgqc1FSEVs5XAQAPZTRdTx/GUuYtS",
            "email":"randomemail@gmail.com",
            "createdAt":"2016-07-28T22:06:10.000Z",
            "updatedAt":"2016-07-28T22:06:10.000Z"
         },
         "Restaurant":{
            "id":2,
            "name":"Popeyes® Louisiana Kitchen",
            "address":"1426 Fillmore St, San Francisco, CA 94115, USA",
            "latitude":null,
            "longitude":null,
            "photo":"http://www.themarsh.com/images/thumbnails/thumbnail-food-app.jpg",
            "createdAt":"2016-07-28T22:07:22.000Z",
            "updatedAt":"2016-07-28T22:07:22.000Z"
         }
      };
    var restaurant = details.Restaurant;
    /*
     <Panel header="When & Where" bsStyle="info">
       <ListGroup>
         <ListGroupItem header="When">Start: {details.startTime}  End: {details.endTime}</ListGroupItem>
       </ListGroup>
     </Panel>

       <ListGroup>
         <ListGroupItem header="When">Start: {details.startTime}  End: {details.endTime}</ListGroupItem>
         <ListGroupItem header="Location">{restaurant.name}</ListGroupItem>
         <ListGroupItem header="Address" href="#">{restaurant.address}</ListGroupItem>
         <ListGroupItem header="Who's going">[Array of profile pictures]</ListGroupItem>
         <ListGroupItem header="More information">{details.description}</ListGroupItem>
       </ListGroup>
    */

    const gridInstance = (
      <Grid>
          <Row className="title">

            <Col md={1}></Col>
            <Col md={2}><Image src={restaurant.photo} responsive /></Col>
            <Col md={8}>
              <h1>{details.title}</h1>
              <h4><Glyphicon glyph="time" /> formatted: {details.startTime}</h4>
            </Col>
            <Col md={1}></Col>
          </Row>

        <Row><Col md={12}><br/></Col></Row>
        <Row className="details-container">

            <Col md={1}></Col>
            <Col md={10}>

              <Panel header="When?" bsStyle="success">
                  <h4>Start: {details.startTime}  End: {details.endTime}</h4>
              </Panel>

              <Panel header="Where?" bsStyle="success">
                  <h4>{restaurant.name}</h4>
                  <h5><Glyphicon glyph="map-marker"/> {restaurant.address}</h5>
              </Panel>

              <Panel header="Who's eating?" bsStyle="success">
                  <h4>Array of attendee names</h4>
              </Panel>

              <Panel header="Anything else?" bsStyle="success">
                  <h4>{details.description}</h4>
              </Panel>

            </Col>
            <Col md={1}></Col>
        </Row>

        <Row>
          <Col md={1}></Col>
          <Col md={8}>
              <h3>Comments</h3>
          </Col>
          <Col md={1}></Col>

        </Row>

    </Grid>

    );

    return(
      <div>
        <MyNav loggedIn = { this.state.loggedIn }  />
        <div className="container">

          {gridInstance}

        </div>
      </div>
    )
  }
}

export default EatupDetails;
