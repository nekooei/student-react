import React, { Component } from 'react';
import './App.css';
import NavBar from './components/items/navbar';
import StartPage from './components/pages/start';

import {Route, Switch} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <span>
        <NavBar/>
        <Switch>
          <Route exact path='/' component={StartPage} />
        </Switch>
      </span>

    );
  }
}

export default App;
