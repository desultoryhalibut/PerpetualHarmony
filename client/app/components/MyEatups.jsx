import React from 'react';
import Button from 'react-bootstrap/lib/Button'

class MyEatups extends React.Component {
	constructor(props) {
    super(props);
  }


  onSessionDelete(index, props) {
    var sessionToDelete = props.userSession[index];

    $.ajax({
      type:'DELETE',
      url: 'http://localhost:3000/api/eatup',
      data: JSON.stringify({userId: sessionToDelete.creatorId, sessionId: sessionToDelete.id}),
      contentType: 'application/json',
      success: () => {
        console.log('Successful delete');
        this.props.refresh();
      }
    });
  }


  render () {

<<<<<<< 1888fa67a23bce06b6555486f23243d7c80bda3e
<<<<<<< 2bbe42e5f6f9e95f357cb08e3dfce90ff3cb40a0
    var userCreatedSessions = this.props.userSession.map((result, index) => 
=======
    var userCreatedSessions = this.props.userSession.map((result, index) =>
>>>>>>> Add lastes changes form repo
=======
    var userCreatedSessions = this.props.userSession.map((result, index) => 
>>>>>>> Update files
      <div className="card card-block" >
        <p className="card-title myEatUp" >{result.sessionname}</p>

        <Button className="deleteButton" bsStyle="danger" bsSize="xsmall" key={index}
        onClick= { this.onSessionDelete.bind(this, index, this.props) }>Delete</Button>
      </div>
      )

    return (
      <div>
        <h2>Your EatUps</h2>
        <ul className='list-group eatupsList'>
          {userCreatedSessions}
        </ul>
      </div>
  	)
  }
}


export default MyEatups;