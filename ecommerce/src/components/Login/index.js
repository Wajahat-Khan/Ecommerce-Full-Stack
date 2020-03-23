import React from "react";
import { withRouter,Link, Redirect } from "react-router-dom";
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
 
    if(login){
      return ( <Redirect to= "/" />)
    }
 
    return(
      <div>
    
        <Navbar bg="dark" variant="dark" className="nav">
        <Link to='/'> <Navbar.Brand  >Full Stack Challenge</Navbar.Brand></Link>
        </Navbar>
        <Container>
        <h1 class="display-4" style={{textAlign:"center"}}>SIGN IN</h1>
        <Form>
        <Form.Group >
          <Form.Label>Username</Form.Label>
          <Form.Control type="email" placeholder="Enter email" id ="username" onChange={this.handleChange}/>
          <Form.Text className="text-muted">
           Please enter your username
          </Form.Text>
        </Form.Group>
      
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" id="password" onChange={this.handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit" style={{width:"100%"}} onClick={this.send}>
          Submit
        </Button>
       
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