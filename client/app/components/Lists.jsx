import React from 'react';

class ListOfEatUp extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    var resultStuffs = this.props.sessions.map(result => <li className="list-group-item"> <span className="listing">{result.sessionname}</span> <br /> {result.address} <br /> Hosted by: {result.User.username}</li>)

    return (
      <div>
        <h1>EatUps around you!</h1>
        <ul className="list-group eatupsList">
          {resultStuffs}
        </ul>
      </div>
    )
  }
}

export default ListOfEatUp;