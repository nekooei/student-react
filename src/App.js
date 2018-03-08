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
    flexGrow : 1,
    paddingTop: 80
  }
};

class App extends Component {



  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <NavBar/>
        <Grid container  direction="column" spacing={24}  justify="space-between">
          <Grid item xs={12}>
            <Switch>
              <Route exact path='/' component={StartPage} />
              <Route path='/register' component={RegisterPage}/>
              <Route path='/panel' component={Panel}/>
              //todo:create_not_found_page
              <Route render={() => (<div><p>Not found</p></div>)}/>

            </Switch>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(style)(App);
