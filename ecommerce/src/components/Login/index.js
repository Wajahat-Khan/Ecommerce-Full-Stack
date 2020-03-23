import React from "react";
import { withRouter,Link } from "react-router-dom";
import { connect } from 'react-redux';
import {login} from '../../js/actions';
import {Form,Button,Navbar, Container} from 'react-bootstrap';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={login:false, token:undefined, username: undefined, password:undefined};
    }


    handleChange = event => {
        this.setState({ [event.target.id]: event.target.value });
      };
      
  send = e => {
    e.preventDefault();
  
    const username = this.state.username;
    const password = this.state.password;
    this.props.loginReq({ username, password });
    };
render(){
    const {login}=this.props;
    const {token}=this.props;
 
    if(Login==="false"){
      return (<div>
        <Navbar bg="dark" variant="dark" className="nav">
        <Link to='/'> <Navbar.Brand  >Full Stack Challenge</Navbar.Brand></Link>
    </Navbar>
    <h2>Already Logged In</h2>
    </div>)
    }
    return(
      <div>
        <Navbar bg="dark" variant="dark" className="nav">
        <Link to='/'> <Navbar.Brand  >Full Stack Challenge</Navbar.Brand></Link>
        </Navbar>
        <Container>
        <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="email" placeholder="Enter email" id ="username" onChange={this.handleChange}/>
          <Form.Text className="text-muted">
           Please enter your username
          </Form.Text>
        </Form.Group>
      
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" id="password" onChange={this.handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit"  onClick={this.send}>
          Submit
        </Button>
        <Form.Text className="text-muted">
           Login {login}
          </Form.Text>
      </Form>
      </Container>
      </div>
    )
  }
}

const mapDispatchToProps=dispatch=>{
    return {loginReq: payload => dispatch(login(payload)) }   
}
const mapStateToProps = state => {
    return { token: state.token, login:state.login}
  }
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Login))