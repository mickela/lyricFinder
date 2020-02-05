import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layouts/Navbar';
import Index from './components/layouts/Index';
import './App.css';
import './bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Index} ></Route>
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
