import React from "react";
import { connect } from 'react-redux';
import { Link} from "react-router-dom";

import {Navbar, Button} from 'react-bootstrap';
import {signOut} from '../../js/actions/index';

class User extends React.Component {
    constructor(props) {
        super(props);
        
    }
    render(){
        const{login,customer_name} = this.props;
        if(login){
            return(
            <div>
                <Button variant="outline-success" className=" mr-sm-2" onClick={this.props.signOut} >Sign Out</Button>
                <Navbar.Text>
      Signed in as: <a >{customer_name}</a>
    </Navbar.Text>
            </div>)
        }
        else{
            return( <Link to='/login'><Button variant="outline-success" className=" mr-sm-2" >Log In</Button></Link>)
        }
    }
}
const mapDispatchToProps = dispatch => {
    return { signOut: payload => dispatch(signOut(payload))
    }
}
const mapStateToProps = state => {
    return { login: state.login, customer_name:state.customer_name}
}
export default connect(mapStateToProps,mapDispatchToProps)(User)