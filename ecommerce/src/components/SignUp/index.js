import React from "react";
import { withRouter,Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import {signUp} from '../../js/actions';
import {Form,Button,Navbar, Container} from 'react-bootstrap';

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state={name:undefined, email:undefined, password: undefined, repass:undefined};
    }


    handleChange = event => {
        this.setState({ [event.target.id]: event.target.value });
      };
      
  send = e => {
    e.preventDefault();
    
    const name = this.state.name;
    const password = this.state.password
    const email = this.state.email;
    const repass = this.state.repass;
    if(password===repass){
        this.props.signUp({ name, email,password });
    }
    
    };
render(){
    const {signup}=this.props;

    if(signup){
      return ( <Redirect to= "/" />)
    }
    return(
      <div>
    
        <Navbar bg="dark" variant="dark" className="nav">
        <Link to='/'> <Navbar.Brand  >Full Stack Challenge</Navbar.Brand></Link>
        </Navbar>
        <Container>
        <h1 className="display-4" style={{textAlign:"center"}}>SIGN UP</h1>
        <Form>
        <Form.Group >
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" id ="name" onChange={this.handleChange}/>
         
        </Form.Group>
        
        <Form.Group >
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" id ="email" onChange={this.handleChange}/>
          
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" id="password" onChange={this.handleChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Re-Type Password</Form.Label>
          <Form.Control type="password" placeholder="Re-type Password" id="repass" onChange={this.handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit" style={{width:"100%"}} onClick={this.send}>
          Sign Up
        </Button>
       
       
      </Form>
      </Container>
      </div>
    )
  }
}

const mapDispatchToProps=dispatch=>{
    return {signUp: payload => dispatch(signUp(payload)) }   
}
const mapStateToProps = state => {
    return { signup:state.signup}
  }
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(SignUp))