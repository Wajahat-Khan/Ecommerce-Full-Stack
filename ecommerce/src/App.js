import React from 'react';
import './App.css';
import { Route, BrowserRouter } from "react-router-dom";
import store from "../src/js/store"
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';


import LandingPage from '../src/components/LandingPage';
import Login from '../src/components/Login'

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={Login} />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
