
import React from 'react';
var DateTimeField = require('react-bootstrap-datetimepicker');
import { Button, Popover, Tooltip, Modal, OverlayTrigger, FieldGroup, Checkbox, Radio, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
const CreateEatup = React.createClass({
  getInitialState() {
    return { showModal: false,
             start: new Date(),
             end: new Date(),
            };
  },
  componentDidMount() {
    var input = document.getElementById('searchTextField');
    var options = {componentRestrictions: {country: 'us'}};
    this.setState({ autocomplete: new google.maps.places.Autocomplete(input, options) });
  },
  // form field handlers
  handleTitle(e) {
    console.log(this.state);
    this.setState({ 
      title: e.target.value
    });
  },
  handleWhere(e) {
    console.log(this.state);
    this.setState({ 
      where: e.target.value
    });
  },
  handleStart(newStart) {
    console.log(this.state);
    this.setState({ 
      start: newStart
    });
  },
   handleEnd(newEnd) {
    console.log(this.state);
    this.setState({ 
      end: newEnd
    });
  },
   handleDetails(e) {
    console.log(this.state);
    this.setState({ 
      details: e.target.value
    });
  },
  // events
   onSubmit: function(e) {
    console.log('Submit Pressed: ', this.refs);
    console.log(this.state);
  },
  close() {
    this.setState({ showModal: false });
  },
  open() {
    this.setState({ showModal: true });
  },
  render() {
    // popovers, form instructions
    const title = (
      <Popover id="modal-popover" title="Name your EatUp">
        e.g. Quick Picnic in the Park
      </Popover>
    );
    const where = (
      <Popover id="modal-popover" title="Pick a place! ">
        This field autcompletes using google places. e.g. Yerba Buena Park
      </Popover>
    );
    const start = (
      <Popover id="modal-popover" title="When the action begins!">
        Pick a start time so your friends know when to join you.
      </Popover>
    );
    const end = (
      <Popover id="modal-popover" title="When you may have to sadly part ways.">
        Pick an estimated end time.
      </Popover>
    );
    const details = (
      <Popover id="modal-popover" title="Anything else you want to add!">
        e.g. We'll meet outside Hack Reactor and walk from there.
      </Popover>
    );
    return (
      <div>
        <Button bsStyle="primary" bsSize="large" onClick={this.open}>
          Create a new EatUp
        </Button>
        <Modal bsSize="large" show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Create a new EatUp</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId="formBasicText">
                <ControlLabel><OverlayTrigger overlay={title}><a href="#">Event Title</a></OverlayTrigger></ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.title}
                  placeholder="Name your EatUp"
                  onChange={this.handleTitle}
                />
                <ControlLabel><OverlayTrigger overlay={where}><a href="#">Where is your EatUp?</a></OverlayTrigger></ControlLabel>
                <FormControl
                  id="searchTextField"
                  type="text"
                  value={this.state.where}
                  placeholder="Choose a Location"
                  onChange={this.handleWhere}
                />
                <ControlLabel><OverlayTrigger overlay={start}><a href="#">Estimated Start Time</a></OverlayTrigger></ControlLabel>
                <DateTimeField 
                  dateTime={this.state.start}
                  format="YYYY-MM-DD"
                  type="text"
                  value={this.state.start}
                  defaultText="Choose a start time"
                  onChange={this.handleStart}
                />
                <ControlLabel><OverlayTrigger overlay={end}><a href="#">Estimated End Time</a></OverlayTrigger></ControlLabel>
                <DateTimeField 
                  dateTime={this.state.end}
                  format="YYYY-MM-DD"
                  type="text"
                  value={this.state.end}
                  defaultText="Choose an end time"
                  onChange={this.handleEnd}
                />
                <ControlLabel><OverlayTrigger overlay={details}><a href="#">Extra Details?</a></OverlayTrigger></ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.details}
                  placeholder="Name your EatUp"
                  onChange={this.handleDetails}
                />
              </FormGroup>
              <div style={{maxWidth: 350, margin: '0 auto 10px'}}>
                <Button bsStyle="success" bsSize="large" type="submit" onClick={this.onSubmit} block>
                  Submit
                </Button>
              </div>
            </form>
          </Modal.Body>
          
          <Modal.Footer>
            
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});
export default CreateEatup