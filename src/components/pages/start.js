/**
 * Created by milad on 1/28/18.
 */
import React, {Component} from 'react';
//import PropTypes from 'prop-types';
import {
  Avatar,
  Grid,
  Paper,
  TextField,
  Button
} from 'material-ui';
import {
  withStyles
} from 'material-ui/styles';
import {connect} from "react-redux";
import {
  setFetching,
  cancelFetching
}from '../../actions/fetch';
import {checkRegistration} from '../../utils/api';

const style = {
  form: {
    padding: 10
  }
};

class StartPage extends Component {
  constructor(props) {
    super(props);
    this.loginClick = this.loginClick.bind(this);
    this.state = {
      isRegistered: false
    }
  }

  loginClick() {
    checkRegistration(this.nationalCodeInput.value)
      .then(res => {
        if(res.success){

        }else if (res.error){
          this.props.history.push('/register');
        }
      }).catch(err => {
      console.log(err);
    });
  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        <Grid container
              direction="row"
              alignItems="center"
              justify="center">
          <Grid
            item xs={4}>
            <Paper>
              <Grid container
                    direction="column"
                    alignItems="center"
                    justify="center">
                <Avatar src={'http://www.newsshare.in/wp-content/uploads/2017/04/Miniclip-8-Ball-Pool-Avatar-16.png'}
                        style={{width: 75, height: 75, alignment: 'center'}}
                />

              </Grid>
              <Grid container
                    direction="row"
                    alignItems="center" spacing={0}
                    justify="center">
                <Grid item xs={10} className={classes.form}>
                  <Grid container
                        direction='column'
                        alignItems='center'
                        justify='center'>
                    <TextField inputRef={input => this.nationalCodeInput = input} label='کدملی'
                               style={{width: '100%', margin: 20}}/>
                    {this.state.isRegister ? (
                      <TextField type='password' inputRef={input => this.nationalCodeInput = input} label='رمز عبور'
                                 style={{width: '100%', margin: 20}}/>
                    ) : <div/>}
                    <Button raised color='primary' onClick={this.loginClick}>بعدی</Button>
                  </Grid>

                </Grid>
              </Grid>

            </Paper>
          </Grid>

        </Grid>
      </div>
    );
  }
}

StartPage.propTypes = {};
StartPage.defaultProps = {};

function mapStateToProps(state) {
  return {
    ...state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setFetching: () => dispatch(setFetching()),
    cancelFetching: () => dispatch(cancelFetching())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(StartPage));