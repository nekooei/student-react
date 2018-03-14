import React, { Component } from 'react';
import './App.css';
import { Grid } from 'material-ui';
import NavBar from './components/items/navbar';
import StartPage from './components/pages/start';
import RegisterPage from './components/pages/register';
import Panel from './components/pages/panelSwitcher';
import {withStyles } from 'material-ui/styles'

import {Route, Switch} from "react-router-dom";

const style = {
  root : {
    flexGrow : 9,
    paddingTop: 110
  },
  container : {
    margin: -30
  }
};

class App extends Component {



  render() {
    const { classes } = this.props;
    return (
      <Grid className={classes.container} container>
        <div className={classes.root}>
          <NavBar/>
          <Switch>
            <Route exact path='/' component={StartPage} />
            <Route path='/register' component={RegisterPage}/>
            <Route path='/panel' component={Panel}/>
            //todo:create_not_found_page
            <Route render={() => (<div><p>Not found</p></div>)}/>

          </Switch>
        </div>
      </Grid>

    );
  }
}

export default withStyles(style)(App);
