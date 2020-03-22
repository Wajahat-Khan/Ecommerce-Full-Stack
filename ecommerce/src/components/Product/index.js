import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getProductById } from '../../js/actions';
import '../Product/Product.css';

import { Navbar, Container, Row, Image, Col, Spinner, Button } from 'react-bootstrap'


class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: undefined, colors: [], sizes: [], genders: [], Gender: undefined, Color: undefined, Size: undefined,
            quantity:1, size:undefined, color:undefined
        }
    }

    componentDidMount = () => {
        this.setState({ id: this.props.match.params.id });
        this.props.getProductById(this.props.match.params.id);
    }
    colorFiltration = (obj) => {
        if (obj.attribute_value.attribute_id == 2)
            return (<Button id= {obj.attribute_value_id} style={{ backgroundColor: `${obj.attribute_value.value}` }} className="options" onClick={this.colorHandle}></Button>)
        return;

    }
    sizeFilteration = (obj) => {
        if (obj.attribute_value.attribute_id == 1)
            return (<Button id = {obj.attribute_value_id} variant="outline-secondary" className="options" onClick={this.sizeHandle}>{obj.attribute_value.value}</Button>)
        return;

    }
    colorHandle= e=>{
        this.setState({color:e.target.id})
    }
    sizeHandle=e=>{
        this.setState({size:e.target.id},()=>{console.log(this.state)
        })
            }
    increase = e =>{
        let {quantity}=this.state;
        quantity=quantity+1;
        this.setState({quantity})
    }
    decrease = e =>{
        let {quantity}=this.state;
        quantity=quantity-1;
        this.setState({quantity})
    }

    render() {
        const { product } = this.props;

        if (!product) {
            return (
                <div className="spin"><Spinner animation="grow" size="lg" /></div>
            )
        }

        return (
            <div>
                <Navbar bg="dark" variant="dark" className="nav">
                    <Link to='/'> <Navbar.Brand  >Full Stack Challenge</Navbar.Brand></Link>
                </Navbar>
                <Container fluid>
                    <Row>
                        <Col md={4}>
                            <Image className="product-img" src="https://thestore.pk/image/data/PSL/%5E27B55BDA5A8A2F5DAE03EDEC5574AAB5F58C19383084404102%5Epimgpsh_fullsize_distr.jpg" />
                        </Col>
                        <Col>
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p style={{color:"red"}}>${product.price}</p>
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
                                    <input type="button" value="-" className="button-minus" data-field="quantity" onClick={this.decrease} />
                                    <input type="number" step="1" value={this.state.quantity} name="quantity" className="quantity-field" />
                                    <input type="button" value="+" className="button-plus" data-field="quantity"  onClick={this.increase}/>
                                </div>

                            </Row>
                            <Row>
                            <Button variant="outline-success" className="options">Add To Cart</Button>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>

        )
    }
}

const mapDispatchToProps = dispatch => {
    return { getProductById: payload => dispatch(getProductById(payload)) }
}
const mapStateToProps = state => {
    return { product: state.product }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Product))