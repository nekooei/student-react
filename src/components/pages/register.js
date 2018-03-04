/**
 * Created by milad on 2/12/18.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Button, Grid, Paper, TextField, Typography, withStyles, Switch, FormGroup, Divider,
  FormControl, FormControlLabel, InputAdornment, IconButton, Icon, Snackbar
} from "material-ui";
import Stepper, {Step, StepLabel, StepButton} from 'material-ui/Stepper';
import {connect} from "react-redux";
import {cancelFetching, setFetching} from "../../actions/fetch";
import {setHeaderSubTitle} from "../../actions/header";
import GenderSelector from "../items/GenderSelector";
import { TimePicker, DateTimePicker, DatePicker } from 'material-ui-pickers';
import jalaliUtils from 'material-ui-pickers-jalali-utils';
import jMoment from 'jalali-moment';



const style = theme => ({
  form: {
    padding: 10
  },
  container: {
    padding: 30
  },
  stepper : {
    width: '100%'
  },
  datePicker :{
    marginTop : 35,

    width: '100%',

  },
  fixWidth: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  input : {
    width: '100%',
    margin: 20
  },
  keyboardIcon : {
    height : 0
  },
  button: {
    margin: 15
  }
});

function getSteps() {
  return [
    'اطلاعات پایه',
    'اطلاعات کاربری',
    'آدرس سکونت'
  ];
}



class Register extends Component {

  constructor(props){
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
    !localStorage.nationalCode ? props.history.push('/') : null;
    this.state = {
      activeStep : 0,
      completed: new Set(),
      skipped: new Set(),
      selectedDate: new Date(),
      snackbar: {
        isOpen: false,
        message: ''
      },
      basicInformation :{
        fullName: '',
        nationalCode: localStorage.nationalCode,
        gender: 0,
        birthPlace: '',
        birthDate: '',
        description: '',
        mobileNumber: ''
      },
      userInformation:{
        username: localStorage.nationalCode,
        email: '',
        password: ''
      },
      addressInformation : {
        address: '',
        phoneNumber: '',
        homeLocation: ''
      }
    }

  }


  handleDateChange(date){
    this.setState(prevSate => (
      {
        ...prevSate,
        selectedDate : date,
        basicInformation : {
          ...prevSate.basicInformation,
          birthDate: jMoment(date).format('jYYYYjMMjDD')
        }
      }
    ))
  }
  fullNameChange(){
    this.setState(prevState => (
      {
        ...prevState,
        basicInformation: {
          ...prevState.basicInformation,
          fullName: `${this.firstNameRef.value} ${this.lastNameRef.value}`
        }
      }
    ))
  }

  descriptionChange(){
    this.setState(prevState => (
      {
        ...prevState,
        basicInformation: {
          ...prevState.basicInformation,
          description: this.descriptionRef.value
        }
      }
    ))
  }

  changeGender(gender) {
    this.setState(prevState=> (
      {
        ...prevState,
        basicInformation: {
          ...prevState.basicInformation,
          gender: gender
        }
      }
    ));
  }

  birthPlaceChange(){
    this.setState(prevState => (
      {
        ...prevState,
        basicInformation: {
          ...prevState.basicInformation,
          birthPlace: this.birthPlaceRef.value
        }
      }
    ))
  }

  emailChange(email){
    this.setState(prevState => ({
      ...prevState,
      userInformation:{
        ...prevState.userInformation,
        email: email
      }
    }));
  }

  passwordChange(password){
    this.setState(prevState => ({
      ...prevState,
      userInformation:{
        ...prevState.userInformation,
        password: password
      }
    }));
  }

  mobileNumberChange(){
    this.setState(prevState => ({
      ...prevState,
      basicInformation:{
        ...prevState.basicInformation,
        mobileNumber: this.mobileNumberRef.value
      }
    }));
  }

  addressChange(address){
    this.setState( prevState => ({
      ...prevState,
      addressInformation: {
        ...prevState.addressInformation,
        address: address
      }
    }));
  }
  phoneNumberChange(phoneNumber){
    this.setState( prevState => ({
      ...prevState,
      addressInformation: {
        ...prevState.addressInformation,
        phoneNumber: phoneNumber
      }
    }));
  }


  getStepContent(step) {
    const {classes} = this.props;
    switch (step) {
      case 0:
        // render form for basic information
        return (
          <div className={classes.container}>
            <Grid container>
              <Grid item
                    xs={12}>
                <FormControl margin={'root'} fullWidth >
                  <FormControlLabel control={<TextField id={'firstName'} name={'firstName'} inputRef={inputRef => this.firstNameRef = inputRef}
                                                        onChange={(event) => this.fullNameChange()}
                                                        value={this.state.basicInformation.fullName.split(' ')[0]}
                                                        label={'نام'} className={classes.input}/>}/>
                </FormControl>
                <FormControl margin={'root'} fullWidth>
                  <FormControlLabel control={ <TextField id={'lastName'} name={'lastName'} inputRef={inputRef => this.lastNameRef = inputRef}
                                                         onChange={(event) => this.fullNameChange()}
                                                         value={this.state.basicInformation.fullName.split(' ')[1]}
                                                         label={'نام خانوادگی'} className={classes.input}/>}/>
                </FormControl>
                <FormControl margin={'root'} fullWidth >
                  <FormControlLabel disabled control={ <TextField
                    id={'nationalCode'} name={'nationalCode'}
                    label={'کدملی'} className={classes.input}
                    value={this.state.basicInformation.nationalCode}/>}/>
                </FormControl>
                <FormControl margin={'root'} fullWidth required >
                  <GenderSelector value={this.state.basicInformation.gender} getGenderSelected={(gender) => this.changeGender(gender)}/>
                </FormControl>
                <FormControl margin={'root'} fullWidth >
                  <FormControlLabel control={ <TextField id={'birthPlace'} name={'birthPlace'} inputRef={inputRef => this.birthPlaceRef = inputRef}
                                                         onChange={(event) => this.birthPlaceChange()}
                                                         value={this.state.basicInformation.birthPlace}
                                                         label={'محل تولد'} className={classes.input} />}/>
                </FormControl>
                <FormControl margin={'root'} fullWidth >
                  <FormControlLabel control={ <TextField id={'mobileNumber'} name={'mobileNumber'} inputRef={inputRef => this.mobileNumberRef = inputRef}
                                                         onChange={(event) => this.mobileNumberChange()}
                                                         value={this.state.basicInformation.mobileNumber}
                                                         type={'number'}
                                                         label={'شماره موبایل'} className={classes.input} />}/>
                </FormControl>
                <FormControl margin={'root'} fullWidth required className={classes.datePicker} >
                  <FormControlLabel  control={
                    <DatePicker
                      okLabel="تأیید"
                      label="تاریخ تولد"
                      className={classes.input}
                      id={'birthDate'}
                      cancelLabel="لغو"
                      maxDate={Date.now()}
                      inputRef={inputRef => this.birthDateRef = inputRef}
                      labelFunc={date => date === null  ? '' : jMoment(date).format('jYYYY/jMM/jDD')}
                      onChange={this.handleDateChange}
                      value={this.state.selectedDate}
                      animateYearScrolling
                      utils={jalaliUtils}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start" >
                            <IconButton className={classes.keyboardIcon}>
                              <Icon>date_range</Icon>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  }/>

                </FormControl>
                <FormControl margin={'root'} fullWidth >
                  <FormControlLabel control={ <TextField multiline id={'description'} name={'description'} inputRef={inputRef => this.descriptionRef = inputRef}
                                                         onChange={event => this.descriptionChange()}
                                                         value={this.state.basicInformation.description}
                                                         label={'توضیحات'} className={classes.input} />}/>
                </FormControl>
              </Grid>
            </Grid>
          </div>
        );
      case 1:
        // render form for user information
        return (
          <div>
            <Grid container>
              <Grid item xs={12}>
                <FormControl margin={'root'} fullWidth >
                  <FormControlLabel disabled control={ <TextField
                    id={'userName'} name={'userName'}
                    label={'نام کاربری'} className={classes.input}
                    value={this.state.userInformation.username}/>}/>
                </FormControl>
                <FormControl margin={'root'} fullWidth >
                  <FormControlLabel control={ <TextField  type="email"
                                                          id={'email'}
                                                         onChange={(event) => this.emailChange(event.target.value)}
                                                         value={this.state.userInformation.email}
                                                          defaultValue={''}
                                                         label={'ایمیل'} className={classes.input} />}/>
                </FormControl>
                <FormControl margin={'root'} fullWidth >
                  <FormControlLabel control={ <TextField  type="password"
                                                          id={'password'}
                                                          name={'password'}
                                                         onChange={(event) => this.passwordChange(event.target.value)}
                                                         value={this.state.userInformation.password}
                                                          defaultValue={''}
                                                         label={'رمز عبور'} className={classes.input} />}/>
                </FormControl>
              </Grid>
            </Grid>
          </div>
        );
      case 2:
        // render form for address information
        return (
          <div>
            <Grid container>
              <Grid item xs={12}>
                <FormControl margin={'root'} fullWidth >
                  <FormControlLabel control={ <TextField
                    id={'address'} name={'address'} multiline
                    label={'آدرس'} className={classes.input}
                    onChange={(event) => this.addressChange(event.target.value)}
                    value={this.state.addressInformation.address}/>}/>
                </FormControl>
                <FormControl margin={'root'} fullWidth >
                  <FormControlLabel control={ <TextField  name={'phoneNumber'}
                                                          id={'phoneNumber'}
                                                          onChange={(event) => this.phoneNumberChange(event.target.value)}
                                                          value={this.state.addressInformation.phoneNumber}
                                                          label={'شماره تلفن ثابت'} className={classes.input} />}/>
                </FormControl>
              </Grid>
            </Grid>
          </div>
        );
      default:
        return this.getStepContent(0);
    }
  }

  componentDidMount(){
    this.props.setSubtitleOfHeader('ثبت نام');
    this.setState({
      snackbar:{
        isOpen: true,
        message: 'کد ملی شما در سیستم یافت نشد. لطفا در سیستم ثبت نام کنید.'
      }
    })
   /* this.setState(prevState=> ({
      ...prevState,
      basicInformation : {
        ...prevState.basicInformation,
        nationalCode: this.props.nationalCode
      },
      userInformation: {
        ...prevState.userInformation,
        username: this.props.nationalCode
      }
    }));*/
  }

  totalSteps = () => {
    return getSteps().length;
  };

  isStepComplete(step) {
    return this.state.completed.has(step);
  }

  completedSteps() {
    return this.state.completed.size;
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps() - this.skippedSteps();
  }

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1;
  }

  isStepOptional = step => {
    return step === -1;
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  skippedSteps() {
    return this.state.skipped.size;
  }

  handleSkip = () => {
    const { activeStep } = this.state;
    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }
    const skipped = new Set(this.state.skipped);
    skipped.add(activeStep);
    this.setState({
      activeStep: this.state.activeStep + 1,
      skipped,
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
    });
  };

  isBasicInformationValid(){
    const {basicInformation} = this.state;
    return basicInformation.fullName.length > 0 && basicInformation.birthDate.length > 0 && basicInformation.birthPlace.length > 0 &&
      (basicInformation.gender === '0' || basicInformation.gender === '1') && basicInformation.nationalCode.length > 0
  }
  isUserInformationValid(){
    const {userInformation} = this.state;
    return userInformation.email.length > 0 && userInformation.password.length > 0 && userInformation.username.length > 0
  }

  handleComplete = () => {
    switch(this.state.activeStep){
      case 0:
        if(!this.isBasicInformationValid()){
          this.setState({
            snackbar: {
              isOpen : true,
              message: 'لطفا اطلاعات را کامل وارد کنید'
            }
          });
          return;
        }
        break;

      case 1:
        if(!this.isUserInformationValid()){
          this.setState({
            snackbar: {
              isOpen : true,
              message: 'لطفا اطلاعات را کامل وارد کنید'
            }
          });
          return;
        }
        break;
      case 2:
        break;
    }
    const completed = new Set(this.state.completed);
    completed.add(this.state.activeStep);
    this.setState({
      completed,
    });

    /**
     * Sigh... it would be much nicer to replace the following if conditional with
     * `if (!this.allStepsComplete())` however state is not set when we do this,
     * thus we have to resort to not being very DRY.
     */
    if (completed.size !== this.totalSteps() - this.skippedSteps()) {
      this.handleNext();
    }
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      completed: new Set(),
      skipped: new Set(),
    });
  };

  handleStep = step => () => {
    this.setState({
      activeStep: step,
    });
  };

  handleNext = () => {
    let activeStep;

    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed
      // find the first step that has been completed
      const steps = getSteps();
      activeStep = steps.findIndex((step, i) => !this.state.completed.has(i));
    } else {
      activeStep = this.state.activeStep + 1;
    }
    this.setState({
      activeStep,
    });
  };

  render() {
    const {classes} = this.props;
    const steps = getSteps();
    return (
      <div>
        <Grid container

              direction="row"
              alignItems="center"
              justify="center">
          <Grid
            item xs={12} md={9} lg={9}>
            <Paper>
              <Grid container
                    direction="column"
                    alignItems="center"
                    justify="center">


              </Grid>
              <Grid container
                    direction="row"
                    alignItems="center"
                    justify="center">
                <Grid item xs={10} className={classes.form}>
                  <Grid container
                        direction='column'
                        alignItems='center'
                        justify='center'>
                    <Stepper
                      className={classes.stepper}
                      alternativeLabel nonLinear activeStep={this.state.activeStep}>
                      {steps.map((label , index) => {
                          const props = {};
                          const buttonProps = {};
                          if (this.isStepOptional(index)) {
                            // check optional for showing caption
                            buttonProps.optional = <Typography variant="caption">Optional</Typography>;
                          }
                          if (this.isStepSkipped(index)) {
                            props.completed = false;
                          }
                          return (
                            <Step key={label} {...props}>
                              <StepButton
                                completed={this.isStepComplete(index)}
                                {...buttonProps}
                              >
                                {label}
                              </StepButton>
                            </Step>
                          );
                      }

                      )}
                    </Stepper>
                    <Divider light />
                    <Grid container
                          direction="column"
                          alignItems="center"
                          justify="center">
                      <Grid item xs={12} md={6}>
                        {this.state.activeStep !== steps.length ? (
                          this.getStepContent(this.state.activeStep)
                        ): null}
                      </Grid>
                      <div>
                        {this.state.activeStep !== steps.length &&
                        (this.state.completed.has(this.state.activeStep) ? (
                          null
                        ) : (
                          <Button className={classes.button} raised variant="raised" color="primary" onClick={this.handleComplete}>
                            {this.completedSteps() === this.totalSteps() - 1 ? 'ارسال' : 'قدم بعدی'}
                          </Button>
                        ))}
                      </div>
                    </Grid>
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

Register.propTypes = {
  nationalCode : PropTypes.number
};
Register.defaultProps = {};

function mapStateToProps(state) {
  return {
    ...state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setFetching: () => dispatch(setFetching()),
    cancelFetching: () => dispatch(cancelFetching()),
    setSubtitleOfHeader : subtitle => dispatch(setHeaderSubTitle(subtitle))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Register));