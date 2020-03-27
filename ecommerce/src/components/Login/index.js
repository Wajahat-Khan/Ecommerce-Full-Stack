import React from "react";
import { withRouter,Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import {login} from '../../js/actions';
import {Form,Button,Navbar, Container} from 'react-bootstrap';
import Error from '../Error';
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={login:false, token:undefined, email: undefined, password:undefined,validated:false};
    }


    handleChange = event => {
        this.setState({ [event.target.id]: event.target.value });
      };
      
  send = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    this.setState({validated:true})
  
    const email = this.state.email;
    const password = this.state.password;
    this.props.loginReq({ email, password });
    };
render(){
    const {login,error}=this.props;
    const{validated}=this.state;
 
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
        <Form noValidate validated={validated} onSubmit={this.send}>
        <Form.Group >
          <Form.Label>Email</Form.Label>
          <Form.Control required type="text" placeholder="Email" id ="email" onChange={this.handleChange}/>
          
        </Form.Group>
      
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" placeholder="Password" id="password" onChange={this.handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit" style={{width:"100%"}}>
          Sign In
        </Button>
        <Link to='/signup'><Button variant="success" type="submit" style={{marginTop:"2%", float:"right"}}>
          Create Account
        </Button></Link>
       
      </Form>
      </Container>
      <Error show={error}/>
      </div>
    )
  }
}

const mapDispatchToProps=dispatch=>{
    return {loginReq: payload => dispatch(login(payload)) }   
}
const mapStateToProps = state => {
    return { token: state.token, login:state.login, error:state.error}
  }
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Login))