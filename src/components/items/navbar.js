/**
 * Created by milad on 1/28/18.
 */
import React, {Component} from 'react';
//import {connect} from 'react-redux';
import {
  AppBar,
  Toolbar, Typography,
  LinearProgress
} from 'material-ui';
import {withStyles} from 'material-ui/styles';

const styles = {
  root: {
    width: '100%',
    marginBottom : 60
  },
  flex: {
    flex: 1,
  }
}

class NavBar extends Component {
  state = {
    fetching : false
  };

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <AppBar position={'fixed'}>
          <Toolbar>
            <Typography type="title" color="inherit"  classes={classes.flex}>
              دانش آموز
            </Typography>
          </Toolbar>
          {this.state.fetching ? (
            <LinearProgress mode='query' color='primary'/>
          ) : undefined}
        </AppBar>
      </div>
    );
  }
}


/*
function mapStateToProps(state) {
  return {
    fetching : state.fetching
  };
}
function mapDispatchToProps(dispatch) {
  return dispatch;
}
*/

export default withStyles(styles)(NavBar);
