import React from 'react';

class ListOfEatUp extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    var resultStuffs = this.props.sessions.map(result => <li className="list-group-item"> {result.sessionname} </li>)
    return (
      <div>
        <h1>Eatups around {this.props.username}!</h1>
        <ul className="list-group eatupsList">
          {resultStuffs}
        </ul>
      </div>
    )
  }
}

export default ListOfEatUp;