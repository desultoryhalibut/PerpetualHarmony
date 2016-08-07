import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import moment from 'moment';

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
      data: JSON.stringify({userId: eatupToDelete.userId, eatupId: eatupToDelete.eatupId}),
      contentType: 'application/json',
      success: (data) => {
        console.log('Successful delete. this was deleted:',data);
        this.props.refresh();
      }
    });
  }


  render () {

    var userRSVPs = this.props.userRSVPs.map((result, index) =>

      <div className="card card-block clearfix" >
        <p className="card-title myEatUp" >{result.Eatup.title}</p>
        <div className="card-text">

          <p>{moment(result.startTime).format("llll")} - {moment(result.endTime).format("llll")}</p>
          <p>{result.Eatup.description}</p>

          <Button className="deleteButton" bsStyle="danger" bsSize="xsmall" key={index}
          onClick= { this.onSessionDelete.bind(this, index, this.props) }>Delete</Button>

        </div>
      </div>
    )

    return (
      <div>
        <h1 className='text-center eatup-headline-container'>Your EatUps </h1>
        <ul className='list-group eatupsList'>
          {userRSVPs.reverse()}
        </ul>
      </div>
    )
  }
}


export default MyEatups;
