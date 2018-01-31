/**
 * Created by milad on 1/28/18.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  AppBar,
  Toolbar, Typography,
  LinearProgress
} from 'material-ui';
import {withStyles} from 'material-ui/styles';

const styles = {
  root: {
    width: '100%'
  },
  flex: {
    flex: 1,
  }
};

class NavBar extends Component {

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
            <Typography type="title" color="inherit"  className={classes.flex}>
              دانش آموز
            </Typography>
            <Typography type="subheading" color="inherit" className={classes.flex}>
              ورود
            </Typography>
          </Toolbar>
          {this.props.fetching ? (
            <LinearProgress mode='query' color='primary'/>
          ) : undefined}
        </AppBar>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    fetching : state.fetching
  };
}
function mapDispatchToProps(dispatch) {
  return dispatch;
}

export default connect(mapStateToProps)(withStyles(styles)(NavBar));
