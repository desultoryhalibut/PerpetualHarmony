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

const SignIn = withRouter(
  React.createClass({

    getInitialState() {
      return {
        error: false
      }
    },

    handleSubmit(event) {
      event.preventDefault()

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

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label><input ref="username" placeholder="username" defaultValue="joe@example.com" /></label>
          <label><input ref="pass" placeholder="password" /></label> (hint: password1)<br />
          <button type="submit">login</button>
          {this.state.error && (
            <p>Bad login information</p>
          )}
        </form>
      )
    }
  })
)


// class SignIn extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: '',
//       password: ''
//     }
//   }

//   onUserNameChange(event) {
//     this.setState({
//       username: event.target.value
//     });
//   }

//   onPasswordChange(event) {
//     this.setState({
//       password: event.target.value
//     })
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     $.ajax({
//       type:'POST',
//       url: 'http://localhost:3000/users/signIn',
//       data: JSON.stringify({username: this.state.username, password: this.state.password}),
//       contentType: 'application/json',
//       success: (username) => {
//         console.log('success');
//       }
//     });
//     this.props.history.push('/');
//   }

//   getValidationState() {
    
//   }

//   render () {
//     return (
//       <Grid>
//         <Row>
//           <Col xs={7} sm={5} md={4} className="authComponent">
//             <h1 className="welcome">Welcome Back</h1>
//           </Col>
//         </Row>
        
//         <Form horizontal>
//           <FormGroup>
//             <Col xs={7} sm={5} md={4} className="authComponent">
//               <FormControl type="text" placeholder="Username" onChange={this.onUserNameChange.bind(this)} />
//             </Col>
//           </FormGroup>

//           <FormGroup controlId="formHorizontalPassword">
//             <Col xs={7} sm={5} md={4} className="authComponent">
//               <FormControl type="password" placeholder="Password" onChange={ this.onPasswordChange.bind(this) }/>
//             </Col>
//           </FormGroup>

//           <FormGroup>
//             <Col xs={7} sm={5} md={4} className="authComponent">
//               <Button onClick={ this.handleSubmit.bind(this) } type="submit" bsStyle="primary" block>Sign in</Button>
//             </Col>
//           </FormGroup>
//         </Form>
//       </Grid>

//     )
//   }
// }


export default SignIn;
