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
            console.log('Not loggedin');
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
        <div>
          <div className="homepage-hero-module">
            <div className="video-container">
                <div className="filter"></div>
                <video autoPlay loop className="fillWidth">
                  <source src="./assets/Coffee-Shot/Mp4/Coffee-Shot.mp4" type="video/mp4" />
                  <source src="./assets/Coffee-Shot/Ogv/Coffee-Shot.ogv" type="video/webm" />
                </video>
                <div className="poster hidden">
                  <img src="/assets/Coffee-Shot/Snapshots/Coffee-Shot.jpg" alt="" />
                </div>
            </div>
        </div>
        <div className="credentials-container">
          <div className="tab-options">
            <span className="active">Login</span>
            <span className="inactive">Sign up</span>
          </div>

          <form className="form-group" action="index.html" method="post" id="login">
            <input className="form-control" type="text" name="name" placeholder="Username" onChange={this.onLoginUserNameChange} />
            <input className="form-control" type="password" name="name" placeholder="Password" onChange={ this.onLoginPasswordChange } />
            <button className="btn" type="button" name="button" onClick={ this.handleLogInSubmit }>Log Me In</button>
          </form>

          <form className="form-group" action="index.html" method="post" id="signup">
            <input className="form-control" type="text" name="name" placeholder="Username" onChange={ this.onPasswordChange } />
            <input className="form-control" type="password" name="name" placeholder="Password"validationState={this.getConfPasswordValidationState()} />
            <input className="form-control" type="text" name="name" placeholder="Email" onChange={ this.onPasswordChange } />
            <button className="btn" type="button" name="button" onClick={ this.handleSignUpSubmit }>Sign Me Up</button>
          </form>
        </div>
        </div>
      )
    }
  })
)

<<<<<<< 2bbe42e5f6f9e95f357cb08e3dfce90ff3cb40a0
export default Loading;
=======
export default Loading;
>>>>>>> Add lastes changes form repo
