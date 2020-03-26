import React from "react";
import { withRouter,Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import {login} from '../../js/actions';
import {Form,Button,Navbar, Container} from 'react-bootstrap';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={login:false, token:undefined, email: undefined, password:undefined};
    }


    handleChange = event => {
        this.setState({ [event.target.id]: event.target.value });
      };
      
  send = e => {
    e.preventDefault();
  
    const email = this.state.email;
    const password = this.state.password;
    this.props.loginReq({ email, password });
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
        <h1 className="display-4" style={{textAlign:"center"}}>SIGN IN</h1>
        <Form>
        <Form.Group >
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="Email" id ="email" onChange={this.handleChange}/>
          
        </Form.Group>
      
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" id="password" onChange={this.handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit" style={{width:"100%"}} onClick={this.send}>
          Sign In
        </Button>
        <Link to='/signup'><Button variant="success" type="submit" style={{marginTop:"2%", float:"right"}}>
          Create Account
        </Button></Link>
       
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