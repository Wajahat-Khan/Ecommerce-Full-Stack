import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getProductById } from '../../js/actions';
import '../Product/Product.css';

import { Navbar, Nav, Container, Row, Image, Col, Spinner, Button, Modal } from 'react-bootstrap'
import { addChart, openModal, closeModal } from '../../js/actions/index';
import Chart from '../Chart';
import User from '../User'

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product_id: undefined, quantity: 1, size: undefined, color: undefined, missing: false
        }
    }

    componentDidMount = () => {
        this.setState({ product_id: this.props.match.params.id });
        this.props.getProductById(this.props.match.params.id);
    }
    colorFiltration = (obj) => {
        if (obj.attribute_value.attribute_id == 2)
            return (<Button id={obj.attribute_value.value} key={obj.attribute_value_id} style={{ backgroundColor: `${obj.attribute_value.value}` }} className="options" onClick={this.colorHandle}></Button>)
        return;

    }
    sizeFilteration = (obj) => {
        if (obj.attribute_value.attribute_id == 1)
            return (<Button id={obj.attribute_value.value} key={obj.attribute_value_id} variant="outline-secondary" className="options" onClick={this.sizeHandle}>{obj.attribute_value.value}</Button>)
        return;

    }
    colorHandle = e => {

        this.setState({ color: e.target.id })
    }
    sizeHandle = e => {
        this.setState({ size: e.target.id });
    }

    increase = e => {
        let { quantity } = this.state;
        quantity = quantity + 1;
        this.setState({ quantity })
    }
    decrease = e => {
        let { quantity } = this.state;
        if (quantity > 1) {
            quantity = quantity - 1;
            this.setState({ quantity })
        }
    }
    quantityInput = e => {

    }

    addChart = e => {
        const { product_id, quantity, size, color } = this.state;
        if (size === undefined || color === undefined) {
            this.setState({ missing: true });
            return;
        }
        let order_date = new Date();
        const { product } = this.props;
        let total_price = product.price * quantity;
        total_price = total_price.toFixed(2);
        this.props.addChart({ product_id, product, size, color, quantity, order_date, total_price });
    }

    chart = e => {
        this.props.openModal()
    }
    render() {
        const { product } = this.props;
        if (product == null) {
            return (
                <div className="spin"><Spinner animation="grow" size="lg" /></div>
            )
        }

        return (
            <div>
                <Navbar bg="dark" variant="dark" className="nav">
                    <Link to='/'> <Navbar.Brand  >Full Stack Challenge</Navbar.Brand></Link>
                    <Nav className="navbar-nav navbar-center">
                        <Link to="/"><Button variant="outline-danger" className=" mr-sm-2"  >Home</Button></Link>
                        <Button className="chart-checkout" variant="outline-warning" className=" mr-sm-2" onClick={this.chart}>Chart</Button>
                        <Link to="/checkout"><Button className="chart-checkout" variant="outline-danger" >Checkout</Button></Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <User />
                    </Navbar.Collapse>
                </Navbar>
                <Chart show={this.props.modal} close={this.props.closeModal} />

                <Container fluid>
                    <Row>
                        <Col md={4}>
                            <Image className="product-img" src={`http://localhost:3002/${product.image}`} />
                        </Col>
                        <Col>
                            <h3 className="display-4">{product.name}</h3>
                            <p>{product.description}</p>
                            <p style={{ color: "red" }}>${product.price}</p>
                            <b> Colors</b>
                            <Row>{
                                product.product_attributes.map(this.colorFiltration)
                            }</Row>
                            <b>Sizes</b>
                            <Row>{
                                product.product_attributes.map(this.sizeFilteration)
                            }</Row>
                            <b>Quantity</b>
                            <Row >
                                <div className="input-group">
                                    <input type="button" defaultValue="-" className="button-minus" data-field="quantity" onClick={this.decrease} />
                                    <input type="number" step="1" value={this.state.quantity} name="quantity" className="quantity-field" onChange={this.quantityInput} />
                                    <input type="button" defaultValue="+" className="button-plus" data-field="quantity" onClick={this.increase} />
                                </div>

                            </Row>
                            <Row>
                                
                                <Button variant="outline-success" className="options" onClick={this.addChart}>Add To Cart</Button>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <Modal show={this.state.missing} onHide={() => { this.setState({ missing: false }) }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Missing Value</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Please select the Size and Color!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { this.setState({ missing: false }) }}>
                            OK
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>

        )
    }
}

  
const mapDispatchToProps = dispatch => {
    return {
        getProductById: payload => dispatch(getProductById(payload)),
        addChart: payload => dispatch(addChart(payload)),
        openModal: payload => dispatch(openModal(payload)),
        closeModal: payload => dispatch(closeModal(payload))
    }
}
const mapStateToProps = state => {
    return { product: state.product, chart: state.chart, modal: state.modal }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Product))