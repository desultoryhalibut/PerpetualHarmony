import React from 'react';
import Button from 'react-bootstrap/lib/Button'

class MyEatups extends React.Component {
  constructor(props) {
    super(props);
  }


  onSessionDelete(index, props) {
    var sessionToDelete = props.userRSVPs[index];
    console.log('session to delete:',sessionToDelete)
    $.ajax({
      type:'DELETE',
      url: 'http://localhost:3000/api/eatup',
      data: JSON.stringify({userId: sessionToDelete.creatorId, sessionId: sessionToDelete.id}),
      contentType: 'application/json',
      success: (data) => {

        console.log('Successful delete. this was deleted:',data);
        this.props.refresh();
      }
    });
  }


  render () {

    var userRSVPs = this.props.userRSVPs.map((result, index) =>
      <div className="card card-block" >
        <p className="card-title myEatUp" >{result.Eatup.title}</p>
        <div className="card-text">
          
          <p>{result.Eatup.startTime} - {result.Eatup.endTime} </p>
          
          <Button className="deleteButton" bsStyle="danger" bsSize="xsmall" key={index}
          onClick= { this.onSessionDelete.bind(this, index, this.props) }>Delete</Button>
        </div>
      </div>
    )

    return (
      <div>
        <h2>Your EatUps</h2>
        <ul className='list-group eatupsList'>
          {userRSVPs}
        </ul>
      </div>
    )
  }
}


export default MyEatups;