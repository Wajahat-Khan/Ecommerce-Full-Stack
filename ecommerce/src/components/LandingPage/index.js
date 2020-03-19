import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import {getConfigurations} from '../../js/actions';

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
        <ul>
  {categories.map(el => (
      <li key={el.category_id}>{el.name}</li>
    ))}
  </ul>
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