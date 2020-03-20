import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { getConfigurations,getProducts } from '../../js/actions';
import {
  Navbar, Nav, NavDropdown, Form, FormControl, Button, Dropdown, DropdownButton, Pagination,
  Container, Col, Row,Image
} from 'react-bootstrap';
import '../LandingPage/LandingPage.css'

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [], activePage: 1, pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] };
  }

  componentDidMount = () => {
    this.props.getConfigurations();
  }
  pagination = e => {
    let temp=parseInt(e.target.text);
      this.setState({activePage:temp});
      this.props.getProducts({page:temp})
    
    };
    paginationNext= e => {
      let temp=this.state.activePage + 1;
     
      this.setState({activePage:temp});
      this.props.getProducts({page:temp})
      };
    paginationPrevious= e => {
      if(this.state.activePage>1) { 
      let temp=this.state.activePage - 1;
        this.setState({activePage:temp});
        this.props.getProducts({page:temp})
        }
      };
  render() {
    const { products } = this.props;
    const { attributes } = this.props;
    const { attributes_values } = this.props;
    const { categories } = this.props;
    const { activePage } = this.state;
    const { pages } = this.state;
    return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home" >Full Stack Challenge</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto header">
            {
              categories.map(c => (
                <Nav.Link href="#" key={c.category_id}>{c.name}</Nav.Link>
              ))
            }
            <Nav.Link href="#">All Products</Nav.Link>
          </Nav>
         
        </Navbar.Collapse>
      </Navbar>
      <br></br>
      <div className="filter-row">
      <Container fluid>
        <Row  className="justify-content-md-center">
          <h3 className="text-muted">Filters</h3>
          {
            attributes.map(f => (
              <DropdownButton  key={f.attribute_id} title={f.name} variant="info" className="filters">
                {f.attribute_values.map(v => (
                  <Dropdown.Item href="#/action-3" key={v.attribute_value_id}>{v.value}</Dropdown.Item>
                ))
                }
              </DropdownButton>
            ))
          }
        
   
          <h3 className="filters text-muted" >Sort</h3>
          <DropdownButton  id="dropdown-basic-button" title="Sort By" variant="info" className="filters">
            <Dropdown.Item >High Price</Dropdown.Item>
            <Dropdown.Item >Low Price</Dropdown.Item>

          </DropdownButton>
          <Form inline className="filters">
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Row>
        </Container>
        </div>

        <Container>
        <Row className="justify-content-md-center pagination">
          <Col></Col>
          <Col> 
          <Pagination  
          active={activePage}
           >
          <Pagination.Prev onClick={this.paginationPrevious} />
            {
              pages.map(p => (<Pagination.Item onClick={this.pagination} key={p}>{p}</Pagination.Item>))
            }
            <Pagination.Next onClick={this.paginationNext}/> 
          </Pagination>
          </Col>
          <Col></Col>
        </Row>
        </Container>
        <Container>
         <Row className="justify-content-md-center">
           { 
            products.map(p=>(
                <div className="products" key={p.product_id}>
                  <Row className="justify-content-md-center">
                  <Image className="product-image" src="https://thestore.pk/image/data/PSL/%5E27B55BDA5A8A2F5DAE03EDEC5574AAB5F58C19383084404102%5Epimgpsh_fullsize_distr.jpg" />
                  </Row>
                  <Row className="justify-content-md-center">{p.name}</Row>
                  <Row className="justify-content-md-center">${p.price}</Row>
                  <Row className="justify-content-md-center"><Button variant="info">Buy Now</Button></Row>
                </div>
            ))
          }
          
          </Row>
        </Container>

    </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return { getConfigurations: payload => dispatch(getConfigurations(payload)),
    getProducts:payload=>dispatch(getProducts(payload)) }
}
const mapStateToProps = state => {
  return { products: state.products, categories: state.categories, attributes: state.attributes, attributes_values: state.attributes_values }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LandingPage))