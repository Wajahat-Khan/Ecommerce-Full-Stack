import React from "react";
import { withRouter, Link } from "react-router-dom";

import {Button,Modal} from 'react-bootstrap';


class OrderComplete extends React.Component {
   
    render(){
            return(<Modal
                show={this.props.show}
                dialogClassName="modal-90w"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Chart
            </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                       Are you sure, you want to place an order?

                </Modal.Body>
                <Modal.Footer>
                <Link to="/"><Button variant="warning" onClick={this.props.close}>NO</Button></Link>
                <Link to="/"><Button variant="success" onClick={this.props.ordered_items}>YES</Button></Link>
                </Modal.Footer>
            </Modal>)
        }
    //     

}

 
  export default (withRouter(OrderComplete))