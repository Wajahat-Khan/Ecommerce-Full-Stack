import React from "react";
import { Modal, Button, Row, Col, Image } from 'react-bootstrap';
import { withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux';
import '../Chart/Chart.css'

class Chart extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
    }
    componentDidMount = () => {

    }
    emptyChart = () => {
        return (
            <Modal
                size="lg"
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
                    <h1>No Items to show</h1>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    render(props) {
        const { chart } = this.props;
        if (chart.length === 0) {
            return this.emptyChart();
        } else {
            return (
                <Modal
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
                        <Row>
                            <Col md={4}><b>Item</b></Col>
                            <Col md={1} className="header"><b>Size</b></Col>
                            <Col md={4} className="header"><b>Quantity</b></Col>
                            <Col md={1} className="header"><b>Price</b></Col>
                        </Row >
                        {
                            chart.map((ch,i) => (
                                <div>
                                    <Row >
                                        <Col md={4}>
                                            <Row>
                                                <Col md={4}>
                                                    <Image className="chart-img" src="https://thestore.pk/image/data/PSL/%5E27B55BDA5A8A2F5DAE03EDEC5574AAB5F58C19383084404102%5Epimgpsh_fullsize_distr.jpg" />
                                                </Col><Col md={8}>   {ch.product.name}
                                                </Col></Row>
                                        </Col>
                                        <Col md={1} className="header">{ch.size}</Col>
                                        <Col md={4} >
                                            <div className="chart-quantity">
                                                <div className="input-group">
                                                    <input type="button" value="-" className="button-minus" data-field="quantity" />
                                                    <input type="number" step="1" value={ch.quantity} name="quantity" className="quantity-field" />
                                                    <input type="button" value="+" className="button-plus" data-field="quantity" />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={1} className="header">{ch.total_price}</Col>
                                    </Row>
                                    <br></br>
                                </div>

                            ))
                        }

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            );
        }

    }

}
const mapDispatchToProps = dispatch => {
    return {
    }
}
const mapStateToProps = state => {
    return { chart: state.chart }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Chart))
