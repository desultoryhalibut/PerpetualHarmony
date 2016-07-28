import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import MyNav from './Navbar.jsx';
<<<<<<< 1888fa67a23bce06b6555486f23243d7c80bda3e
import auth from '../auth';
const RouteHandler = require('react-router').RouteHandler;  


=======
const RouteHandler = require('react-router').RouteHandler;  

>>>>>>> Update files
class EatupDetails extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
<<<<<<< 1888fa67a23bce06b6555486f23243d7c80bda3e
      loggedIn: auth.loggedIn()
    }
  }

  componentWillMount() {
    // auth.onChange = this.updateAuth.bind(this)
    auth.login()
  }

  //write function to grab place details from database using this.props.params.eatupdetails (index/unique identifier)
  
=======

    }
  }

  //write function to grab place details from database using this.props.params.eatupdetails (index/unique identifier)

>>>>>>> Update files


  render () {
    var queryParams = this.props.location.query;
    console.log('this.props',this.props.params.eatupdetails)
    return(
<<<<<<< 1888fa67a23bce06b6555486f23243d7c80bda3e
      <div>
      <MyNav loggedIn = { this.state.loggedIn }
      />
      <div className="container">

        <h1>Eatup details</h1>
        <ul> 
          <li>{this.props.params.eatupdetails}</li>
        </ul>

    </div>
    </div>
    ) 
=======
    <div className="container">
      <MyNav loggedIn = { this.state.loggedIn }
      />

      <h1>Eatup details</h1>
      <ul>
        <li>{this.props.params.eatupdetails}</li>
      </ul>

    </div>
  )
>>>>>>> Update files
  }
}


<<<<<<< 1888fa67a23bce06b6555486f23243d7c80bda3e
export default EatupDetails;
=======
export default EatupDetails;
>>>>>>> Update files
