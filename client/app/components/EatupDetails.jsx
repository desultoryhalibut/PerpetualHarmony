import React from 'react';
import { Button, Grid, Row, Col, Image, Jumbotron, ListGroup, ListGroupItem, Panel, FieldGroup, Glyphicon } from 'react-bootstrap';

var moment = require('moment');

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

  render () {
    console.log('EatUp Detail currentEatup ', this.props.currentEatup);

    var restaurant = this.props.currentEatup.Restaurant;
    var commentsUrl = `/api/eatup/${this.props.currentEatup.id.toString()}/comment`;

    var startTime = moment(this.props.currentEatup.startTime).format('llll');
    var endTime = moment(this.props.currentEatup.endTime).format('llll');

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
              <h4><Glyphicon glyph="time" /> {startTime}</h4>
            </Col>
            <Col md={1}></Col>
          </Row>

          <Row className="details-container">
            <Col md={6}>
              <Panel header="Who's Eating?" className="users-panel clearfix">
                {usernames}
              </Panel>
            </Col>
            <Col md={6}>
              <Col md={8}>
                <Panel header="When?" bsStyle="success">
                    <h4><span>Start: {startTime}  </span><br />
                    <span>   End: {endTime}</span></h4>
                </Panel>
              </Col>

              <Col md={4}>
                <Panel header="Anything else?" bsStyle="success">
                    <h4>{this.props.currentEatup.description}</h4>
                </Panel>
              </Col>

            </Col>
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
