import React from 'react';
import Promise from 'bluebird';
import { Link } from 'react-router';
import MyNav from './Navbar.jsx';
import MyEatups from './MyEatups.jsx';
import ListOfEatUp from './Lists.jsx';
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Tab from 'react-bootstrap/lib/Tab';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';


import auth from '../auth'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCoordinate: null,
      userSession: this.props.data.userSession,
      sessions: this.props.data.sessions
    }
  }



  render() {
    return (
      <div className="container">
        
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row className="clearfix">
            <Col sm={4}>
              <Nav bsStyle="pills" stacked>
                <NavItem eventKey="allEatups">
                  See EatUps In My Area
                </NavItem>
                <NavItem eventKey="myEatups">

                  EatUps I'm Attending
                  
                </NavItem>
              </Nav>
            </Col>
            <Col sm={8}>
              <Tab.Content animation>
                <Tab.Pane eventKey="allEatups">
                  
                  EatUps in My Area content

                  <ListOfEatUp sessions = {this.props.data.sessions} />
                </Tab.Pane>
                <Tab.Pane eventKey="myEatups">
                  EatUps I'm attending content
                  <MyEatups userSession = {this.props.data.userSession} refresh={this.props.refresh.bind(this)} />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>


      </div>
    )
  }
}

export default Home;
