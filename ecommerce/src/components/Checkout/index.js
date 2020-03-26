import React from "react";
import { withRouter, Link,Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import '../Checkout/Checkout.css';
import {Form,Button,Navbar, Container,Row, Col, Modal} from 'react-bootstrap';

import {addOrder,addOrderedItem,closeOrderComplete} from '../../js/actions';
import OrderComplete from "../OrderComplete";

class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {first_name:"",last_name:"",address:"",city:"",state:"",zip_code:"",region:"",
      modal:false}
    }

    handleChange = event => {
      this.setState({ [event.target.id]: event.target.value });
    };


   
    placeOrder=()=>{
  
        const{chart, customer_id} = this.props;
        const{first_name,last_name,address,city,state,zip_code,region} = this.state;
        let total_price=0;
        let order_date=chart[0].order_date;
        chart.map(p=>{
          total_price+=parseFloat(p.total_price);
        })
        total_price=total_price.toFixed(2)
        this.props.createOrder({customer_id,first_name,last_name,address,city,state,zip_code,region, order_date,total_price});
  }

  sendOrderedItems = e =>{
    const{chart,order_id}=this.props;
    if(order_id){
    chart.map(p=>{
     let product_id=p.product_id;
     let size=p.size;
     let color=p.color;
     let quantity=p.quantity;
     let total_price=p.total_price;
     this.props.addOrderedItem({order_id,product_id,size,color,quantity,total_price});

   });
}
}
deleteOrder=e=>{
  const {order_id}=this.props;
  this.props.closeOrderComplete({id:order_id});
}

    render(){
        const {login, chart,order_state}=this.props;
       
        if(login===false){
            return(<Redirect to="/login" />)
        }
        if(chart.length === 0){
          return(<Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Empty Chart</Modal.Title>
            </Modal.Header>
          
            <Modal.Body>
              <p>Please add Items in Chart to proceed for checkout</p>
            </Modal.Body>
          
            <Modal.Footer>
              <Link to="/"><Button variant="secondary">OK</Button></Link>
            </Modal.Footer>
          </Modal.Dialog>)
        }
        return(
            <div>
    
        <Navbar bg="dark" variant="dark" className="nav">
        <Link to='/'> <Navbar.Brand  >Full Stack Challenge</Navbar.Brand></Link>
        </Navbar>

        <OrderComplete show={order_state}  ordered_items={this.sendOrderedItems}  close={this.deleteOrder}/>
        
        <Container>
        <h1 class="display-4" style={{textAlign:"center"}}>CHECK OUT</h1>
       
        <Form>
        <Row>
        <Col>
        <Form.Group >
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" id ="first_name" onChange={this.handleChange}/>
        </Form.Group>
        </Col>

        <Col>
        <Form.Group >
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" id ="last_name" onChange={this.handleChange}/>
        </Form.Group>
        </Col>
        </Row>

        <Row>
        <Col>
        <Form.Group >
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" id ="address" onChange={this.handleChange}/>
        </Form.Group>
        </Col>

        <Col>
        <Form.Group >
          <Form.Label>City</Form.Label>
          <Form.Control type="text" id ="city" onChange={this.handleChange}/>
        </Form.Group>
        </Col>
        </Row>

        <Row>
        <Col>
        <Form.Group >
          <Form.Label>State</Form.Label>
          <Form.Control type="text" id ="state" onChange={this.handleChange}/>
        </Form.Group>
        </Col>

        <Col>
        <Form.Group >
          <Form.Label>Zip Code</Form.Label>
          <Form.Control type="text" id ="zip_code" onChange={this.handleChange}/>
        </Form.Group>
        </Col>
        </Row>

        <Row>
        <Col>
        <Form.Group >
          <Form.Label>Region</Form.Label>
          <Form.Control type="text" id ="region" onChange={this.handleChange}/>
        </Form.Group>
        </Col>

        <Col>
        </Col>
        </Row>
        
        <Row>
            <Col><Link to ="/"><Button variant="warning" style={{float:"left",width:"100%"}}>
          Back
        </Button></Link></Col>

       <Col><Button variant="success" style={{float:"right",width:"100%"}} onClick={this.placeOrder}>
          finish
        </Button>
       </Col>
       
        
        </Row>
      </Form>
      </Container>
      </div>
        )
    }
  }

const mapDispatchToProps = dispatch => {
  return {createOrder: payload => dispatch(addOrder(payload)),
    addOrderedItem: payload => dispatch(addOrderedItem(payload)),
    closeOrderComplete:payload => dispatch(closeOrderComplete(payload))
   }
}
const mapStateToProps = state => {
    return { login: state.login, chart:state.chart, customer_id:state.customer_id, order_id:state.order_id,
      order_state:state.order_state}
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout))