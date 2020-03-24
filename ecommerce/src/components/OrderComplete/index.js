import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux';
import {Button,Modal} from 'react-bootstrap';


import {addOrderedItem} from '../../js/actions';

class OrderComplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
 
    render(){
    
            return(<Modal
                {...this.props}
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
                    <Button variant="warning" onClick={this.props.close}>NO</Button>
                    <Link to="/"><Button variant="success" onClick={this.props.ordered_items}>YES</Button></Link>
                </Modal.Footer>
            </Modal>)
        }
    //     

}
const mapDispatchToProps = dispatch => {
    return {
      addOrderedItem: payload => dispatch(addOrderedItem(payload)) } 
  }
  const mapStateToProps = state => {
      return { chart:state.chart, order_id:state.order_id}
  }
  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderComplete))