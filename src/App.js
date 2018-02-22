import React, { Component } from 'react';
import './App.css';
import { Grid } from 'material-ui';
import NavBar from './components/items/navbar';
import StartPage from './components/pages/start';
import RegisterPage from './components/pages/register';
import {withStyles } from 'material-ui/styles'

import {Route, Switch} from "react-router-dom";

const style = {
  root : {
    flexGrow : 1,
    paddingTop: 80
  }
};

class App extends Component {

  constructor(props){
    super(props);
    this.setNationalCode = this.setNationalCode.bind(this);
  }

  state = {
    nationalCode: ''
  };

  setNationalCode(nationalCode){
    this.setState({
      nationalCode: nationalCode
    });
  }


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <NavBar/>
        <Grid container  direction="column" spacing={24}  justify="space-between">
          <Grid item xs={12}>
            <Switch>
              <Route exact path='/' render={(props) => (<StartPage {...props} setNationalCodeFun={this.setNationalCode}/>)} />
              <Route path='/register' render={(props) => (
                <RegisterPage {...props} nationalCode={this.state.nationalCode} />
              )}/>
            </Switch>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(style)(App);
