import React from "react";
import { withRouter,Link, Redirect } from "react-router-dom";
import {Row,Col} from "react-bootstrap";
import "../Footer/Footer.css"

class Footer extends React.Component{

render(){

    return(
    <div className="footer">
         <Row className="footer-elements">
            <Col>Full Stack Challenge</Col>
            <Col></Col>
            <Col>Copyright © 2020 Northbay Solutions

</Col>
        </Row>  
    </div>)
}
}
export default (withRouter(Footer))