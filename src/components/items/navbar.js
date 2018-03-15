/**
 * Created by milad on 1/28/18.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  AppBar,
  Toolbar, Typography,
  LinearProgress, Menu, MenuItem, IconButton
} from 'material-ui';
import {withStyles} from 'material-ui/styles';
import {AccountCircle} from "material-ui-icons";
import {removeUserInfo} from "../../actions/student";
import {deleteToken} from "../../actions/login";

const styles = {
  root: {
    width: '100%'
  },
  flex: {
    flex: 1,
  }
};

class NavBar extends Component {
  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  logout = () => {
    this.handleClose();
    localStorage.clear();
    this.props.logout();
  };


  render() {
    const {classes} = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const auth = !!this.props.loginInfo.token;
    return (
      <div className={classes.root}>
        <AppBar position={'fixed'}>

          <Toolbar>
            <Typography type="title" color="inherit"  className={classes.flex}>
              دانش آموز
            </Typography>
            <Typography type="subheading" color="inherit" className={classes.flex}>
              {this.props.header.subtitle}
            </Typography>
            {auth ? (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>پروفایل</MenuItem>
                  <MenuItem onClick={this.logout}>خروج</MenuItem>
                </Menu>
              </div>
            ): null}

          </Toolbar>
          {this.props.fetching ? (
            <LinearProgress mode='query' color='secondary'/>
          ) : undefined}
        </AppBar>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    loginInfo : state.loginInfo,
    fetching : state.fetching,
    header : state.header
  };
}

const logout = dispatch =>{
  dispatch(deleteToken());
  dispatch(removeUserInfo())
};

function mapDispatchToProps(dispatch) {
  return{
    logout : () => logout(dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NavBar));
