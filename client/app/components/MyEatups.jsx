import React from 'react';
import Button from 'react-bootstrap/lib/Button'

class MyEatups extends React.Component {
	constructor(props) {
    super(props);
  }

  onSessionDelete(index, props) {
    console.log(props.userSession[index]);
    console.log(props.userSession[index].sessionname);

    var sessionToDelete = props.userSession[index];


    console.log('the session to delete', sessionToDelete);

    console.log(sessionToDelete.creatorId);

    $.ajax({
      type:'DELETE',
      url: 'http://localhost:3000/sessions/deleteMeetUp',
      data: JSON.stringify({userId: sessionToDelete.creatorId, sessionId: sessionToDelete.id}),
      contentType: 'application/json',
      success: () => {
        console.log('success');
      }
    });
  }


  render () {
    var userCreatedSessions = this.props.userSession.map((result, index) => 
      <li className="list-group-item"> {result.sessionname} 
      <Button className="deleteButton" bsStyle="danger" bsSize="xsmall" 
      onClick= { this.onSessionDelete.bind(this, index, this.props) }>Delete</Button>
      </li>
      )

    return (
      <div>
        <h2>Your Eatups</h2>
        {userCreatedSessions}
      </div>
  	)
  }
}


export default MyEatups;