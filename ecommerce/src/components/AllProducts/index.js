import React from "react";
import { withRouter,Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import {Button,Container, Col, Row,Image,Card, Spinner} from 'react-bootstrap';
import Footer from '../Footer';

class AllProducts extends React.Component {
    constructor(props) {
      super(props);
    }
render()
{
    const {products}=this.props;
    if(products.length===0){
        return (
          <div className="spin"><Spinner animation="grow" size="lg"/></div>
          )}
      
    return(
      <div>
        <Container fluid>
        <Row className="justify-content-md-center">
          { 
           products.map(p=>(
               <Col md={2} sm={3} className="products" key={p.product_id}>
                <Card key={p.product_id}><Card.Body>
                <Link to={`/products/${p.product_id}`}>
                  <Row className="justify-content-md-center">
                <Image className="product-image" src={`http://localhost:3002/${p.image}`} />
                  </Row></Link>
                  <Row className="justify-content-md-center">{p.name}</Row>
               <Row className="justify-content-md-center">${p.price}</Row>
               <Row className="justify-content-md-center"><Link to={`/products/${p.product_id}`}><Button variant="info">Buy Now</Button></Link></Row>
                </Card.Body></Card>
               </Col>
               ))
         }
         
         </Row>
       </Container>
       <Footer />
       </div>
    )
}

}
const mapStateToProps = state => {
    return { products: state.products }
  }
export default connect(mapStateToProps)(withRouter(AllProducts))