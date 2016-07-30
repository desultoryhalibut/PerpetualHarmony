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
        email: '',
        confirmedPassword: '',
        isLoginForm: true
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
        auth.signup(this.state.username, this.state.password, this.state.email, (loggedIn) => {
          if (!loggedIn) {
            console.log('Not loggedin')
            return this.setState({ error: true })
          }

          const { location } = this.props

          if (location.state && location.state.nextPathname) {
            this.props.router.replace(location.state.nextPathname)
          } else {
            this.props.router.replace('/')
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
          this.props.router.replace('/');
        }
      })
    },

    onLoginUserNameChange(event) {
      this.setState({
        username: event.target.value
      });
    },

    onEmailChange(event) {
      this.setState({
        email: event.target.value
      });
    },

    onLoginPasswordChange(event) {
      this.setState({
        password: event.target.value
      })
    },

    onClickToggle(event) {
      var classEl = event.target.className.split(' ');
      if(classEl.indexOf('sign-btn') === -1) {
        this.setState({isLoginForm: true});
        console.log('signup');
      } else {
        this.setState({isLoginForm: false});
        console.log('login');
      }
    },

    componentWillMount() {
      if(this.props.route.path === 'logout') {
        auth.logout();
        this.props.router.replace('/login');
      }
    },

    render() {
      var partial;
      var btns;
      if(this.state.isLoginForm) {
        partial = <form className="form-group" action="index.html" method="post" >
          <input className="form-control" type="text" name="username" placeholder="Username" onChange={this.onLoginUserNameChange} />
          <input className="form-control" type="password" name="pass" placeholder="Password" onChange={ this.onLoginPasswordChange } />
          <button className="btn" type="button" name="button" onClick={ this.handleLogInSubmit }>Log Me In</button>
        </form>;
       btns = <div><span className="active login-btn" onClick={this.onClickToggle}>Login</span>
       <span className="inactive sign-btn" onClick={this.onClickToggle}>Sign up</span></div>;
      } else {
        partial = <form className="form-group" action="index.html" method="post" >
          <input className="form-control" type="text" name="username" placeholder="Username" onChange={ this.onLoginUserNameChange } />
          <input className="form-control" type="password" name="pass" placeholder="Password"onChange={ this.onLoginPasswordChange } />
          <input className="form-control" type="password" name="pass" placeholder="Confirm Password"onChange={ this.onConfPasswordChange } />
          <input className="form-control" type="email" name="email" placeholder="Email" onChange={ this.onEmailChange } />
          <button className="btn" type="button" name="button" onClick={ this.handleSignUpSubmit }>Sign Me Up</button>
        </form>;
        btns = <div><span className="inactive login-btn" onClick={this.onClickToggle}>Login</span>
        <span className="active sign-btn" onClick={this.onClickToggle}>Sign up</span></div>;
      }
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
            { btns }
          </div>
          { partial }

        </div>
        </div>
      )
    }
  })
)

export default Loading;
