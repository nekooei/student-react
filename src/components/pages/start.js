/**
 * Created by milad on 1/28/18.
 */
import React, {Component} from 'react';
import {
  Avatar,
  Grid,
  Paper,
  TextField,
  Button, Snackbar
} from 'material-ui';
import {
  withStyles
} from 'material-ui/styles';
import {connect} from "react-redux";
import {
  setFetching,
  cancelFetching
}from '../../actions/fetch';

import  {
  setHeaderSubTitle
} from '../../actions/header';
import {checkRegistration, login} from '../../utils/api';

import {
  fillRequired,
  isNationalCode,
  isNumber,
  passwordStrong
}from '../../utils/validators';


const style = {
  mainPanel: {
    marginTop: '30px'
  },
  content: {
    padding: '20px'
  },
  form: {
    padding: 10
  }
};

class StartPage extends Component {
  constructor(props) {
    super(props);
    this.nextStep = this.nextStep.bind(this);
    this.state = {
      isRegistered: false,
      step: {
        registerChecked: false,
        registration: false
      },
      errors: {
        emailError: {
          hasError: false,
          errorMsg: ''
        },
        passwordError: {
          hasError: false,
          errorMsg: ''
        }
      },
      snackbar: {
        isOpen: false,
        message: ''
      },
      buttonText : 'بعدی'
    }
  }

  componentDidMount() {
    this.props.setSubtitleOfHeader('ورود');
  }


  nextStep() {
    if (!this.state.step.registerChecked) {
      if (!this.nationalCodeInput.value) {
        this.setState(prevState => {
          return {
            ...prevState,
            errors: {
              ...prevState.errors,
              emailError: {
                hasError: true,
                errorMsg: 'این فیلد نمی‌تواند خالی باشد.'
              }
            }
          }
        });
        return;
      }else if (!isNumber(this.nationalCodeInput.value) || !isNationalCode(this.nationalCodeInput.value)){
        this.setState(prevState => {
          return {
            ...prevState,
            errors: {
              ...prevState.errors,
              emailError: {
                hasError: true,
                errorMsg: 'کد ملی معتبر نمی باشد!'
              }
            }
          }
        });
        return;
      }
      this.props.setFetching();
      // here validated nationalCode field
      checkRegistration(this.nationalCodeInput.value)
        .then(res => {
          this.props.cancelFetching();
          if (res.success) {
            this.setState(prevState => {
              return{
                ...prevState,
                isRegistered: true,
                step : {
                  ...[prevState.step],
                  registerChecked : true,
                  registration: false
                },
                buttonText: 'ورود'
              }
            })
          } else if (res.error) {
            localStorage.nationalCode = this.nationalCodeInput.value;
            this.props.history.push('/register');
          }
        }).catch(err => {
        console.log(err);
      });
    }else if(this.state.step.registerChecked && this.state.isRegistered){
      if(!this.passwordInput.value){
        this.setState(prevState => {
          return {
            ...prevState,
            errors: {
              ...prevState.errors,
              passwordError: {
                hasError: true,
                errorMsg: 'این فیلد نمی‌تواند خالی باشد.'
              }
            }
          }
        });
        return;
      }
      this.props.setFetching();
      login(this.nationalCodeInput.value, this.passwordInput.value)
        .then(response => {
          this.props.cancelFetching();
          if(response.success){
            localStorage.clear();
            localStorage.nationalCode = response.payload.nationalCode;
            localStorage.id = response.payload.id;
            localStorage.token = response.payload.token;
            this.props.history.push('/panel');
          }else {
            this.passwordInput.value = '';
            this.passwordInput.focus();
            this.setState({
              snackbar: {
                isOpen: true,
                message: 'نام کاربری یا کلمه عبور اشتباه است.'
              }
            })
          }
        })
    }


  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.mainPanel}>
        <Grid container
              direction="row"
              alignItems="center"
              justify="center">
          <Grid
            item xs={10} md={4} lg={4}>
            <Paper elevation={20}>
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
                    <TextField error={this.state.errors.emailError.hasError}
                               type="number"
                               helperText={this.state.errors.emailError.hasError ? this.state.errors.emailError.errorMsg : ''}
                               inputRef={input => this.nationalCodeInput = input} label='کدملی'
                               style={{width: '100%', margin: 20}}/>
                    {this.state.isRegistered ? (
                      <TextField type='password' inputRef={input => this.passwordInput = input} label='رمز عبور'
                                 error={this.state.errors.passwordError.hasError}
                                 helperText={this.state.errors.passwordError.hasError ? this.state.errors.passwordError.errorMsg : ''}
                                 style={{width: '100%', margin: 20}}/>
                    ) : null}
                    <Button raised color='primary' onClick={this.nextStep}>{this.state.buttonText}</Button>
                  </Grid>

                </Grid>
              </Grid>

            </Paper>
          </Grid>

          <Snackbar open={this.state.snackbar.isOpen} autoHideDuration={6000} anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }} message={this.state.snackbar.message}  onClose={() => this.setState({snackbar: {isOpen : false, message : ''}})}/>

        </Grid>
      </div>
    );
  }
}

StartPage.propTypes = {
};
StartPage.defaultProps = {};

function mapStateToProps(state) {
  return {
    ...state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setFetching: () => dispatch(setFetching()),
    cancelFetching: () => dispatch(cancelFetching()),
    setSubtitleOfHeader: subtitle => dispatch(setHeaderSubTitle(subtitle))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(StartPage));