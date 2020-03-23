import React from "react";
import { withRouter, Link,Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import '../Checkout/Checkout.css';


class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount = () => {}

    render(){
        if(this.props.login==="false"){
            return(<Redirect to="/login" />)
        }
        return(<h2>hello</h2>)
    }
}

const mapDispatchToProps = dispatch => {
    return { 
    }
}
const mapStateToProps = state => {
    return { login: state.login}
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout))