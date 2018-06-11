import React, { Component } from 'react';
import './App.css';
import { Grid , Snackbar, IconButton} from '@material-ui/core';
import {Close as CloseIcon} from '@material-ui/icons';
import NavBar from './components/items/navbar';
import StartPage from './components/pages/start';
import RegisterPage from './components/pages/register';
import Panel from './components/pages/panelSwitcher';
import {withStyles } from '@material-ui/core/styles'
import {connect} from 'react-redux';

import {Route, Switch, withRouter} from "react-router-dom";
import {setSnackBar, hideSnackBar} from "./actions/ui";

const style = {
  root : {
    flexGrow : 9,
    paddingTop: 110
  },
  container : {
    marginRight: 'auto',
    marginLeft : 'auto'
  }
};

class App extends Component {


  render() {
    const { classes } = this.props;
    return (
      <Grid className={classes.container} container spacing={0}>
        <div className={classes.root}>
          <NavBar/>
          <Switch>
            <Route exact path='/' component={StartPage} />
            <Route path='/register' component={RegisterPage}/>
            <Route path='/panel' component={Panel}/>
            //todo:create_not_found_page
            <Route render={() => (<div><p>Not found</p></div>)}/>

          </Switch>
          <Snackbar open={this.props.snackBar.show} anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }} message={this.props.snackBar.message} action={<IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={this.props.hideSnackBar}
          >
            <CloseIcon />
          </IconButton>}  onClose={this.props.hideSnackBar}/>
        </div>

      </Grid>

    );
  }
}

function mapStateToProps(state) {
  return {
    snackBar : {
      ...state.ui.snackBar
    },
    warningDialog: {
      ...state.ui.warningDialog
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    hideSnackBar: () => dispatch(hideSnackBar())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(App)));
