import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import moment from 'moment';

class MyEatups extends React.Component {
  constructor(props) {
    super(props);
  }


  onSessionDelete(index, props) {
    var sessionToDelete = props.userRSVPs[index];

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

    var userRSVPs = this.props.userRSVPs.map((result, index) =>
      <div className="card card-block" >
        <p className="card-title myEatUp" > {result.Eatup.title} <Button bsStyle="success" bsSize="xs" onClick={this.handleSearch.bind(this, result)}>Get Details</Button></p>

        
        <div className="card-text">
          <p className="address-text">{result.Restaurant.name}</p> 
          <h5>{result.Restaurant.address}</h5> 
          <h5><strong>From: </strong> {moment(result.startTime).format("llll")} - {moment(result.endTime).format("llll")}</h5>
          <Button className="deleteButton" bsStyle="danger" bsSize="xsmall" key={index}
          onClick= { this.onSessionDelete.bind(this, index, this.props) }>Delete</Button>
        </div>
        
      </div>
    )

    return (
      <div>
        
        <ul className='list-group eatupsList'>
          {userRSVPs.reverse()}
        </ul>
      </div>
    )
  }
}


export default MyEatups;