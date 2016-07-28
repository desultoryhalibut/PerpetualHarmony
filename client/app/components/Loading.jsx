import React from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Button from 'react-bootstrap/lib/Button';
import { Link, withRouter } from 'react-router'

import auth from '../auth'

const Loading = withRouter(
  React.createClass({
    getInitialState() {
      return {
        error: false,
        username: '',
        password: '',
        confirmedPassword: ''
      }
    },

    onUserNameChange(event) {
      this.setState({
        username: event.target.value
      });
    },

    onPasswordChange(event) {
      this.setState({
        password: event.target.value
      })
    },

    onConfPasswordChange(event) {
      this.setState({
        confirmedPassword: event.target.value
      })
    },

    handleSignUpSubmit(e) {
      e.preventDefault();
      if (this.state.password === this.state.confirmedPassword) {
        console.log('The passwords match!');
        auth.signup(this.state.username, this.state.password, (loggedIn) => {
          if (!loggedIn) {
            console.log('Not loggedin')
            return this.setState({ error: true })
          }

          const { location } = this.props

          if (location.state && location.state.nextPathname) {
            this.props.router.replace(location.state.nextPathname)
          } else {
            this.props.router.replace('/home')
          }
        })
      } else {
        console.log('Your passwords don\'t match. Get your act together!')
      }
    },

    getPasswordValidationState() {
      const length = this.state.password.length;
      if (length > 7) return 'success';
      else if (length > 4) return 'warning';
      else if (length > 0) return 'error';
    },

    getConfPasswordValidationState() {
      const password = this.state.password;
      const confPassword = this.state.confirmedPassword;
      if (confPassword.length > 0 && password === confPassword) return 'success';
      else if(confPassword.length > 0) return 'error';
    },


    handleLogInSubmit(e) {
      e.preventDefault();

      auth.login(this.state.username, this.state.password, (loggedIn) => {
        if (!loggedIn) {
          console.log('Not loggedin')
          return this.setState({ error: true })
        }

        const { location } = this.props

        if (location.state && location.state.nextPathname) {
          this.props.router.replace(location.state.nextPathname)
        } else {
          this.props.router.replace('/home')
        }
      })
    },

    onLoginUserNameChange(event) {
      this.setState({
        username: event.target.value
      });
    },

    onLoginPasswordChange(event) {
      this.setState({
        password: event.target.value
      })
    },

    render() {
      return (
        <Grid>
          <Form horizontal>

            <FormGroup>
              <Col xs={7} sm={5} md={4} className="authComponent">
                <FormControl type="text" placeholder="Username" onChange={this.onUserNameChange} />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword" validationState={this.getPasswordValidationState()}>
              <Col xs={7} sm={5} md={4} className="authComponent">
                <FormControl type="password" placeholder="Password" onChange={ this.onPasswordChange }/>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword" validationState={this.getConfPasswordValidationState()}>
              <Col xs={7} sm={5} md={4} className="authComponent">
                <FormControl type="password" placeholder="Confirm password" onChange={ this.onConfPasswordChange } />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col xs={7} sm={5} md={4} className="authComponent">
                <Button onClick={ this.handleSubmit } type="submit" bsStyle="primary" block>Sign up</Button>
                <br />
                <span className="signing">Already have an account? <Link to="/signin">Sign in</Link></span>
                <br />
                {this.state.error && (
                  <p>Username already exists</p>
                )}
              </Col>
            </FormGroup>
          </Form>

          <Form>

            <FormGroup>
              <Col xs={7} sm={5} md={4} className="authComponent">
                <FormControl type="text" placeholder="Username" onChange={this.onUserNameChange} />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword" validationState={this.getPasswordValidationState()}>
              <Col xs={7} sm={5} md={4} className="authComponent">
                <FormControl type="password" placeholder="Password" onChange={ this.onPasswordChange }/>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword" validationState={this.getConfPasswordValidationState()}>
              <Col xs={7} sm={5} md={4} className="authComponent">
                <FormControl type="password" placeholder="Confirm password" onChange={ this.onConfPasswordChange } />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword" validationState={this.getConfPasswordValidationState()}>
              <Col xs={7} sm={5} md={4} className="authComponent">
                <FormControl type="email" placeholder="Email" onChange={ this.onConfPasswordChange } />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col xs={7} sm={5} md={4} className="authComponent">
                <Button onClick={ this.handleSubmit } type="submit" bsStyle="primary" block>Sign up</Button>
                <br />
                <span className="signing">Already have an account? <Link to="/signin">Sign in</Link></span>
                <br />
                {this.state.error && (
                  <p>Username already exists</p>
                )}
              </Col>
            </FormGroup>

          </Form>


        </Grid>
      )
    }
  })
)

<<<<<<< 2bbe42e5f6f9e95f357cb08e3dfce90ff3cb40a0
export default Loading;
=======
export default Loading;
>>>>>>> Add lastes changes form repo
