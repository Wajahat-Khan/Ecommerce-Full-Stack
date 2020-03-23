import React from "react";
import { Modal, Button, Row, Col, Image } from 'react-bootstrap';
import { withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux';
import '../Chart/Chart.css'
import { updateChart, openModal,closeModal } from '../../js/actions';

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
        this.props.updateChart(chart);
        this.forceUpdate();

    
    }
    decrease = e =>{
        const {chart}=this.props;
        let index=parseInt(e.target.id);
        if(chart[index].quantity>1){
        chart[index].quantity-=1;
        this.props.updateChart(chart);
        this.forceUpdate();
        }
    }
    quantityInput =e =>{
        console.log(e.target.id)
    }
    removeProduct =e=>{
        const {chart}=this.props;
        let index=parseInt(e.target.id);
       chart.splice(index,1);
        this.props.updateChart(chart);
        this.forceUpdate();
    }
    render() {
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
                        <table>
                             <col width="150"></col>
                            <col width="20"></col>
                            <col width="20"></col>
                            <col width="100"></col>
                            <col width="20"></col>
                            <tr>
                                <th>Item</th>
                                <th>Size</th>
                                <th>Color</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                            {
                                chart.map((ch,i)=>(
                                    
                                    <tr key={ch.product_id}>
                                       
                                        <td key={ch.product.name}>
                                        <Row>
                                        <Col md={3}>
                                        <Image className="chart-img" src="https://thestore.pk/image/data/PSL/%5E27B55BDA5A8A2F5DAE03EDEC5574AAB5F58C19383084404102%5Epimgpsh_fullsize_distr.jpg" />
                                        </Col>
                                        <Col className="prod-details">
                                         <h2 style={{marginLeft:"2%"}}>{ch.product.name}</h2>
                                         <Button variant="outline-danger" id={i} className="options" onClick={this.removeProduct}>Remove</Button>
                                         </Col>
                                         
                                        </Row>
                                        </td>

                                        <td key={ch.size}>
                                        <h2 >{ch.size}</h2>
                                        </td>
                                        
                                        <td key={ch.color}>
                                        <h2 >{ch.color}</h2>
                                        </td>

                                        <td className="chart-q" key={i}> 
                                        <div className="input-group">
                                    <input type="button" id={i} value="-" className="button-minus" data-field="quantity" onClick={this.decrease} />
                                    <input type="number" id={i} step="1" value={ch.quantity} name="quantity" className="quantity-field" onChange={this.quantityInput}/>
                                    <input type="button" id={i} value="+" className="button-plus" data-field="quantity"  onClick={this.increase}/>
                                </div>
                                        </td>
                                        <td key={ch.total_price}>
                                        <h2 >{ch.total_price}</h2>
                                        </td>
                                    </tr>
                                ))
                            }
                           
                        </table>
                    </Modal.Body>
                    <Modal.Footer>
                        
                        <Button variant="warning" onClick={this.props.checkout}>Close</Button>
                    </Modal.Footer>
                </Modal>
            );
        }

    }

}
const mapDispatchToProps = dispatch => {
    return {
        updateChart: payload => dispatch(updateChart(payload)),
        
    }
}
const mapStateToProps = state => {
    return { chart: state.chart, modal:state.modal }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Chart))
