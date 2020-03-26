import React from "react";
import { withRouter, Link} from "react-router-dom";
import { connect } from 'react-redux';
import { getConfigurations, getProducts, getProductsByCategory, searchProducts,openModal,closeModal,
  closeOrderSuccess } from '../../js/actions';
import {
  Navbar, Nav, Form, FormControl, Dropdown, DropdownButton, Spinner,
  Container,  Row, Button, Modal } from 'react-bootstrap';
import '../LandingPage/LandingPage.css';

import User from '../User';
import Chart from '../Chart';
import AllProducts from '../AllProducts';
import Paginations from '../Paginations';
import Footer from '../Footer';
class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      Gender: undefined, Color: undefined, Size: undefined, Sort: undefined, 
      categoryId: undefined, q: undefined, sortTitle:"", filterTitle:""};
  }

  componentDidMount = () => {
    this.props.getConfigurations();
  }

  search = e => {
    this.setState({ q: e.target.value });
    this.props.searchProducts({ q: e.target.value });
  }
  pagination = e => {
    const { Gender, Color, Size, Sort, categoryId } = this.state;
    let page = parseInt(e.target.text);
    this.setState({ activePage: page });
    if (categoryId) {
      this.props.getProductsByCategory({ categoryId, Gender, Color, Size, Sort, page });
    }
    else this.props.getProducts({ page, Gender, Color, Size, Sort })

  };
  paginationNext = e => {
    const { Gender, Color, Size, Sort, categoryId } = this.state;
    let page = this.state.activePage + 1;
    this.setState({ activePage: page });
    if (categoryId) {
      this.props.getProductsByCategory({ categoryId, Gender, Color, Size, Sort, page });
    }
    else this.props.getProducts({ page, Gender, Color, Size, Sort })

  };
  paginationPrevious = e => {
    const { Gender, Color, Size, Sort, categoryId } = this.state;
    if (this.state.activePage > 1) {
      let page = this.state.activePage - 1;
      this.setState({ activePage: page });
      if (categoryId) {
        this.props.getProductsByCategory({ categoryId, Gender, Color, Size, Sort, page });
      }
      else this.props.getProducts({ page, Gender, Color, Size, Sort })
    }
  };

  handleFilter = (ek, e) => {

    if (ek == "clear") {
      this.setState({ [e.target.id]: undefined }, () => {
        this.validateFilter();

      });
    }
    else {
      this.setState({ [e.target.id]: ek }, () => {
        this.validateFilter();
      });
    }
  }
  validateFilter = (v) => {
    const { Gender, Color, Size, Sort, categoryId } = this.state;
    if (categoryId) {
      this.props.getProductsByCategory({ categoryId, Gender, Color, Size, Sort });
    }
    else this.props.getProducts({ Gender, Color, Size, Sort })
  }



  categoryHandler = categoryId => {
    const { Gender, Color, Size, Sort } = this.state;
    if (categoryId == "clear") {
      this.setState({ categoryId: undefined });
      this.props.getProducts({ Gender, Color, Size, Sort })
    } else {
      this.setState({ categoryId: categoryId });
      this.props.getProductsByCategory({ categoryId, Gender, Color, Size, Sort });
    }
  }


  render() {
    const { attributes,categories,modal,openModal,closeModal,closeOrderSuccess,order_success } = this.props;
    const { activePage } = this.state;
  
    return (
      <div className="major">
        <Navbar bg="dark" variant="dark" onSelect={this.categoryHandler}>
          <Link to='/'> <Navbar.Brand  >Full Stack Challenge</Navbar.Brand></Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto header">
              {
                categories.map(c => (
                  <Nav.Link key={c.category_id} eventKey={c.category_id} id={c.category_id}>{c.name}</Nav.Link>
                ))
              }
              <Nav.Link eventKey="clear">All Products</Nav.Link>
            </Nav>

          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
          <Button className="chart-checkout" variant="outline-warning" className=" mr-sm-2" onClick={openModal}>Chart</Button>
            <User />
          </Navbar.Collapse>
        </Navbar>
        <Chart show={modal} close={closeModal} />
        <Modal show={order_success} onHide={closeOrderSuccess}>
                    <Modal.Header closeButton>
                        <Modal.Title>Congratulations!!!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Your Order has been placed Successfully</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeOrderSuccess}>
                            OK
                        </Button>

                    </Modal.Footer>
                </Modal>
        <br></br>
        <div className="filter-row">
          <Container fluid>
            <Row className="justify-content-md-center">
            
              <h3 className="text-muted">Filters</h3>
              {
                attributes.map(f => (
                  <DropdownButton key={f.attribute_id} title={f.name} variant="info" className="filters" onSelect={this.handleFilter}>
                    {f.attribute_values.map(v => (
                      <Dropdown.Item key={v.attribute_value_id} eventKey={v.attribute_value_id} id={f.name} >{v.value}</Dropdown.Item>
                    ))
                    }
                    <Dropdown.Item key="clear" eventKey='clear' id={f.name} className="clear">Clear</Dropdown.Item>
                  </DropdownButton>
                ))
              }


              <h3 className="sort text-muted" >Sort</h3>
              <DropdownButton id="dropdown-basic-button" title="Sort By" variant="info" className="filters" onSelect={this.handleFilter}>
                <Dropdown.Item id="Sort" key="DESC" eventKey='DESC'>High Price</Dropdown.Item>
                <Dropdown.Item id="Sort" key="AESC" eventKey='AESC'>Low Price</Dropdown.Item>
                <Dropdown.Item id="Sort" key="clear" eventKey='clear' className="clear">Clear</Dropdown.Item>
              </DropdownButton>

              <Form inline className="filters">
                <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.search} />
              </Form>
            
            </Row>
          </Container>
        </div>

        <Paginations activePage={activePage} pagination={this.pagination} paginationNext={this.paginationNext} paginationPrevious={this.paginationPrevious} />
        <div>
        <AllProducts />
        </div>
       <Footer />  
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getConfigurations: payload => dispatch(getConfigurations(payload)),
    getProducts: payload => dispatch(getProducts(payload)),
    getProductsByCategory: payload => dispatch(getProductsByCategory(payload)),
    searchProducts: payload => dispatch(searchProducts(payload)),
    closeModal: payload => dispatch(closeModal(payload)),
    openModal: payload => dispatch(openModal(payload)),
    closeOrderSuccess:payload => dispatch(closeOrderSuccess(payload))
  }
}
const mapStateToProps = state => {
  return { categories: state.categories, attributes: state.attributes, attributes_values: state.attributes_values,modal: state.modal, order_success:state.order_success }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LandingPage))