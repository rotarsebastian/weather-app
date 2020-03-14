import React, { Component } from 'react';
import Header from './components/header/Header';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import DifferentCities from './pages/different-cities/DifferentCities';
import Home from './pages/home/Home';

export default class App extends Component{

  render() {
    return (
      <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/different-cities" component={props => <DifferentCities {...props} />} />
          <Route path="/map" component={props => <Home {...props} />} />
          <Route exact path="/">
            <Redirect to="/map" />
          </Route>
        </Switch>
      </div>
    </Router>
    );
  }
}
