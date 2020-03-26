import React from "react";
import { Modal, Button, Row, Col, Image} from 'react-bootstrap';
import { withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux';
import '../Chart/Chart.css'
import { updateChart } from '../../js/actions';

class Chart extends React.Component {
    constructor(props) {
        super(props);
    }

    emptyChart = () => {
        return (
            <Modal
                size="lg"
                show={this.props.modal}
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
                   <p>Empty Cart</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    increase = e =>{
        const {chart}=this.props;
        let index=parseInt(e.target.id);
        chart[index].quantity+=1;
        chart[index].total_price=(chart[index].quantity * chart[index].product.price).toFixed(2)
        this.props.updatechart(chart);
        this.forceUpdate();
    }
    decrease = e =>{
        const {chart}=this.props;
        let index=parseInt(e.target.id);
        if(chart[index].quantity>1){
        chart[index].quantity-=1;
        chart[index].total_price=(chart[index].quantity * chart[index].product.price).toFixed(2)
        this.props.updatechart(chart);
        this.forceUpdate();
        }
    }
    quantityInput =e =>{
        
    }
    removeProduct =e=>{
        const {chart}=this.props;
        let index=parseInt(e.target.id);
       chart.splice(index,1);
        this.props.updatechart(chart);
        this.forceUpdate();
    }
    render() {
        const { chart} = this.props;
        if (chart.length === 0) {
            return this.emptyChart();
        } else {
            return (
                <Modal
                   show={this.props.modal}
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
                        
                        <Row style={{border:"1px solid black", marginBottom:"1%"}} className="center">
                            <Col md={3}><h2>Item</h2></Col>
                            <Col md={2}><h2>Size</h2></Col>
                            <Col md={2}><h2>Color</h2></Col>
                            <Col md={3}><h2>Quantity</h2></Col>
                            <Col md={1}><h2>Price</h2></Col>
                        </Row>
                            {
                                chart.map((ch,i)=>(
                                    <Row className="center prod" key={ch.product_id}>
                                    <Col md={3}>
                                        <Row >
                                            <Col md={4}>
                                            <Image className="chart-img" src={`http://localhost:3002/${ch.product.image}`} />
                                            </Col>
                                            <Col md={8}>
                                            <h3 style={{marginLeft:"2%"}}>{ch.product.name}</h3>
                                            <Button variant="outline-danger" id={i} className="options" onClick={this.removeProduct}>Remove</Button>   
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md={2} >
                                            <h3 >{ch.size}</h3>
                                    </Col>
                                    <Col md={2}>
                                            <h3 >{ch.color}</h3>
                                    </Col>
                                    <Col md={3}>
                                        <div className="center">
                                        <div className="input-group qa">
                                        <input type="button" id={i} value="-" className="button-minus qa" data-field="quantity" onClick={this.decrease} />
                                        <input type="number" id={i} step="1" value={ch.quantity} name="quantity" className="quantity-field" onChange={this.quantityInput}/>
                                        <input type="button" id={i} value="+" className="button-plus" data-field="quantity"  onClick={this.increase}/>
                                        </div>
                                        </div>
                                    </Col>
                                    <Col >
                                    <h3 className="center">{ch.total_price}</h3>
                                    </Col>
                                    </Row>
                                ))
                            }
                     
                    </Modal.Body>
                    <Modal.Footer>
                        
                        <Button variant="warning" onClick={this.props.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            );
        }

    }

}
const mapDispatchToProps = dispatch => {
    return {
        updatechart: payload => dispatch(updateChart(payload)),
        
    }
}
const mapStateToProps = state => {
    return { chart: state.chart, modal:state.modal }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Chart))
