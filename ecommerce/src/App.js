import React from 'react';
import './App.css';
import { Route, BrowserRouter } from "react-router-dom";
import store from "../src/js/store"
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';


import LandingPage from '../src/components/LandingPage';
import Login from '../src/components/Login'
import SignUp from '../src/components/SignUp'
import Product from '../src/components/Product'
import Checkout from '../src/components/Checkout';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/products/:id" component={Product} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/checkout" component={Checkout} />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
