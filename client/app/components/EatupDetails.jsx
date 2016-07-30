import React from 'react';
import { Button, Grid, Row, Col, Image, Jumbotron, ListGroup, ListGroupItem, Panel, FieldGroup, Glyphicon } from 'react-bootstrap';

import CommentsContainer from './CommentsContainer.jsx';

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
    console.log('EatUp Detail currentEatup ', this.props.currentEatup);

    var restaurant = this.props.currentEatup.Restaurant;
    var commentsUrl = `/api/eatup/${this.props.currentEatup.id.toString()}/comment`;

    var usernames = this.props.currentEatupRSVPs.map((user) => {
      return (
        <div>
          {user.User.username}
        </div>
      );
    });

    const gridInstance = (
      <Grid>
          <Row className="title">

            <Col md={1}></Col>
            <Col md={2}><Image src={restaurant.photo} responsive /></Col>
            <Col md={8}>
              <h1>{this.props.currentEatup.title}</h1>
              <h4><Glyphicon glyph="time" /> formatted: {this.props.currentEatup.startTime}</h4>
            </Col>
            <Col md={1}></Col>
          </Row>

        <Row><Col md={12}><br/></Col></Row>
        <Row className="details-container">

            <Col md={1}></Col>
            <Col md={10}>

              <Panel header="When?" bsStyle="success">
                  <h4>Start: {this.props.currentEatup.startTime}  End: {this.props.currentEatup.endTime}</h4>
              </Panel>

              <Panel header="Where?" bsStyle="success">
                  <h4>{restaurant.name}</h4>
                  <h5><Glyphicon glyph="map-marker"/> {restaurant.address}</h5>
              </Panel>

              <Panel header="Who's eating?" bsStyle="success">
                  {usernames}
              </Panel>

              <Panel header="Anything else?" bsStyle="success">
                  <h4>{this.props.currentEatup.description}</h4>
              </Panel>

            </Col>
            <Col md={1}></Col>
        </Row>

        <Row>
          <Col md={1}></Col>
          <Col md={8}>
            <CommentsContainer url={commentsUrl} currentEatupComments={this.props.currentEatupComments}/>
          </Col>
          <Col md={1}></Col>

        </Row>

    </Grid>

    );

    return(
      <div>

        <div className="container">

          {gridInstance}

        </div>
      </div>
    )
  }
}

export default EatupDetails;
