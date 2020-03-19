import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import {getConfigurations} from '../../js/actions';
import { Navbar, Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap';

class LandingPage extends React.Component{
    constructor(props){
        super(props);
        this.state={products:[]};
    }

    componentDidMount=()=>{
        this.props.getConfigurations();
    }
render(){
    const {products}=this.props;
    const {attributes}=this.props;
    const {attributes_values}=this.props;
    const {categories}=this.props;
    return(
        <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">Full Stack Challenge</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      {
          categories.map(c=>(
            <Nav.Link href="#" key={c.category_id}>{c.name}</Nav.Link>
          ))
      }
      <Nav.Link href="#">All Products</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
    )
  }
}

const mapDispatchToProps=dispatch=>{
    return {getConfigurations: payload => dispatch(getConfigurations(payload)) }   
}
const mapStateToProps = state => {
    return { products: state.products,categories:state.categories, attr:state.attributes,attr_value:state.attributes_values }
  }
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(LandingPage))