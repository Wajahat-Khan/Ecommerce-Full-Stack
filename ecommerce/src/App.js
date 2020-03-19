import React from 'react';
import './App.css';
import { Route, BrowserRouter } from "react-router-dom";
import store from "../src/js/store"
import { Provider } from 'react-redux';

import LandingPage from '../src/components/LandingPage';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Route exact path="/" component={LandingPage} />
         
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
