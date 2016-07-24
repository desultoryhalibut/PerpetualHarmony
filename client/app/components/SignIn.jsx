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
import { withRouter } from 'react-router'

import auth from '../auth'

// const SignIn = withRouter(
//   React.createClass({

//     getInitialState() {
//       return {
//         error: false
//       }
//     },

//     handleSubmit(event) {
//       event.preventDefault()

//       const username = this.refs.username.value
//       const pass = this.refs.pass.value

//       auth.login(username, pass, (loggedIn) => {
//         if (!loggedIn)
//           return this.setState({ error: true })

//         const { location } = this.props

//         if (location.state && location.state.nextPathname) {
//           this.props.router.replace(location.state.nextPathname)
//         } else {
//           this.props.router.replace('/')
//         }
//       })
//     },

//     render() {
//       return (
//         <form onSubmit={this.handleSubmit}>
//           <label><input ref="username" placeholder="username" defaultValue="joe@example.com" /></label>
//           <label><input ref="pass" placeholder="password" /></label> (hint: password1)<br />
//           <button type="submit">login</button>
//           {this.state.error && (
//             <p>Bad login information</p>
//           )}
//         </form>
//       )
//     }
//   })
// )

const SignIn = withRouter(
  React.createClass({
    getInitialState() {
      return {
        error: false
      }
    },

  handleSubmit(e) {
    e.preventDefault();
    const username = this.refs.username.value
    const pass = this.refs.pass.value

    auth.login(username, pass, (loggedIn) => {
      if (!loggedIn)
        return this.setState({ error: true })

      const { location } = this.props

      if (location.state && location.state.nextPathname) {
        this.props.router.replace(location.state.nextPathname)
      } else {
        this.props.router.replace('/')
      }
    })
  },

  getValidationState() {
    
  },

  render () {
    return (
      <Grid>
        <Row>
          <Col xs={7} sm={5} md={4} className="authComponent">
            <h1 className="welcome">Welcome Back</h1>
          </Col>
        </Row>
        
        <Form horizontal>
          <FormGroup>
            <Col xs={7} sm={5} md={4} className="authComponent">
              <FormControl ref="username" type="text" placeholder="Username" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col xs={7} sm={5} md={4} className="authComponent">
              <FormControl ref="password" type="password" placeholder="Password" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col xs={7} sm={5} md={4} className="authComponent">
              <Button onClick={ this.handleSubmit } type="submit" bsStyle="primary" block>Sign in</Button>
              {this.state.error && (
                <p>Bad login information</p>
              )}
            </Col>
          </FormGroup>
        </Form>
      </Grid>

    )
  }
  })
)


export default SignIn;
