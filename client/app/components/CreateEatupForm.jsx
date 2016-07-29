import React from 'react';
import Button from 'react-bootstrap/lib/Button';
const RouteHandler = require('react-router').RouteHandler;

class CreateEatupForm extends React.Component {
  constructor(props) {
    super(props);


    this.state = {

    }
  }


  render () {
    return (
    <div className="container">
      <FormGroup>
      <FormControl
        id="searchTextField"
        type="text"
        placeholder="Search for a place"
        onChange={ this.props.handleSearchChange }
      />
      </FormGroup>

    </div>
  )
  }
}


export default CreateEatupForm;
