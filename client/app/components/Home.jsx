import React from 'react';
import Promise from 'bluebird';
import { Link } from 'react-router';
import MyNav from './Navbar.jsx';
import MyEatups from './MyEatups.jsx';
import ListOfEatUp from './Lists.jsx';
// import CalendarExample from './Calendar.jsx';
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Tab from 'react-bootstrap/lib/Tab';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import auth from '../auth';



class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCoordinate: null,
      userSession: this.props.data.userSession,
      sessions: this.props.data.sessions
    }

  }
  componentDidMount() {
    auth.login();
    var input = document.getElementById('searchTextField');
    var options = {componentRestrictions: {country: 'us'}};
    this.setState({ autocomplete: new google.maps.places.Autocomplete(input, options) });

  }


  render() {
    if (!this.state.userSession) {
      return (<div>Loading Page...</div>)
    }
    return (
      <div className="container">
      <div className="head">

        <FormGroup>
           <FormControl
              id="searchTextField"
              type="text"
              placeholder="Search for a place"
              onChange={ this.props.handleSearchChange }
            />
        </FormGroup>
        {' '}
        <Button type="submit" onClick={ this.props.handleSubmit } bsStyle="success">Create EatUp</Button>
        </div>

        <Tab.Container id="left-tabs-example" defaultActiveKey="allEatups">
          <Row className="clearfix">
            <Col sm={4}>
              <Nav bsStyle="pills" stacked>
                <NavItem eventKey="allEatups">
                  See EatUps In My Area
                </NavItem>
                <NavItem eventKey="myEatups">
                  EatUps I'm Attending
                </NavItem>
                <NavItem eventKey="calendar">
                  Calendar
                </NavItem>
              </Nav>
            </Col>
            <Col sm={8}>
              <Tab.Content animation>
                <Tab.Pane eventKey="allEatups">
                  <ListOfEatUp sessions = {this.props.data.sessions} />
                
                </Tab.Pane>
                <Tab.Pane eventKey="myEatups">
                  
                  <MyEatups userSession = {this.props.data.userSession} refresh={this.props.refresh.bind(this)} />
                </Tab.Pane>
                <Tab.Pane eventKey="calendar">
                  
                  
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
