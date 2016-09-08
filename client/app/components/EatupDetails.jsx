import React from 'react';
import { Button, Grid, Row, Col, Image, Jumbotron, ListGroup, ListGroupItem, Panel, FieldGroup, Glyphicon } from 'react-bootstrap';
import CommentsContainer from './CommentsContainer.jsx';
import MyNav from './Navbar.jsx';
import auth from '../auth';

const RouteHandler = require('react-router').RouteHandler;
const moment = require('moment');

export default class EatupDetails extends React.Component {

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

    const creatorInfo = {
      name: this.props.currentEatup.User.username,
      email: this.props.currentEatup.User.email
    };
    const restaurant = this.props.currentEatup.Restaurant;
    const commentsUrl = `/api/eatup/${this.props.currentEatup.id.toString()}/comment`;
    const startTime = moment(this.props.currentEatup.startTime).format('llll');
    const endTime = moment(this.props.currentEatup.endTime).format('llll');
    const usernames =  (this.props.currentEatupRSVPs.map((user) => {
      let imgUrl = `http://lorempixel.com/50/50/people/${Math.floor(Math.random()*10)}`;

      return (
        <div>
          <img src={imgUrl} className="user-image"/>
          {user.User.username}
        </div>
      );
    }));

    const gridInstance = (
      <Grid>
        <Row>
          <Col md={4} className="center">
            <Panel header={this.props.currentEatup.title} className="details-panel" bsStyle="primary">
              <div className="details-image center">
                <Image src={restaurant.photo} />

              </div>
              <Panel header="Contact Info"  className="users-panel clearfix center">
                <p><strong>EatUp Leader</strong>: {creatorInfo.name}</p>
                <p><strong>E-mail</strong>: {creatorInfo.email}</p>
              </Panel>
              <Panel header="Who's Eating?" className="users-panel clearfix center">
                {usernames}
              </Panel>
            </Panel>
          </Col>
          <Col md={7}>
            <Panel header="Come join this EatUp!" className="details-panel" bsStyle="primary">
              <h1 className="details-heading">{this.props.currentEatup.title}</h1>
              <h4><Glyphicon glyph="time" /> {startTime}</h4>

              <Panel header="What are the details?" className="details-detail">
                <h4><span><strong>Start Time</strong>: {startTime}  </span><p />
                <span><strong>End Time</strong>:  {endTime}</span></h4>
                <br/>
                <h4><strong>Description</strong>:
                <br/>{this.props.currentEatup.description}</h4>
              </Panel>

              <Panel header="Leave a comment or question">
                <CommentsContainer url={commentsUrl} currentEatupComments={this.props.currentEatupComments}/>
              </Panel>

            </Panel>
          </Col>
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
