/**
 * Created by milad on 2/12/18.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Button, Grid, Paper, TextField, Typography, withStyles, Switch, FormGroup, Divider,
  FormControl, FormControlLabel, InputAdornment, IconButton, Icon
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

  }

  state = {
    activeStep : 0,
    completed: new Set(),
    skipped: new Set(),
    selectedDate: new Date(),
    basicInformation :{
      fullName: '',
      nationalCode: '',
      gender: 0,
      birthPlace: '',
      birthDate: '',
      description: ''
    },
    userInformation:{
      username: '',
      email: '',
      password: ''
    },
    addressInformation : {
      address: '',
      homeLocation: ''
    }
  };

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

  getStepContent(step) {
    const {classes} = this.props;
    switch (step) {
      case 0:
        // render form for basic information
        console.log(this.state);

        return (
          <div className={classes.container}>
            <Grid container>
              <Grid item
                    xs={12}>
                <FormControl fullWidth >
                  <FormControlLabel control={<TextField inputRef={inputRef => this.firstNameRef = inputRef}
                                                        onChange={(event) => this.fullNameChange()}
                                                        value={this.state.basicInformation.fullName.split(' ')[0]}
                                                        label={'نام'} className={classes.input}/>}/>
                </FormControl>
                <FormControl fullWidth>
                  <FormControlLabel control={ <TextField inputRef={inputRef => this.lastNameRef = inputRef}
                                                         onChange={(event) => this.fullNameChange()}
                                                         value={this.state.basicInformation.fullName.split(' ')[1]}
                                                         label={'نام خانوادگی'} className={classes.input}/>}/>
                </FormControl>
                <FormControl fullWidth >
                  <FormControlLabel disabled control={ <TextField
                    label={'کدملی'} className={classes.input}
                    value={this.state.basicInformation.nationalCode}/>}/>
                </FormControl>
                <FormControl fullWidth required >
                  <GenderSelector value={this.state.basicInformation.gender} getGenderSelected={(gender) => this.changeGender(gender)}/>
                </FormControl>
                <FormControl fullWidth >
                  <FormControlLabel control={ <TextField inputRef={inputRef => this.birthPlaceRef = inputRef}
                                                         onChange={(event) => this.birthPlaceChange()}
                                                         value={this.state.basicInformation.birthPlace}
                                                         label={'محل تولد'} className={classes.input} />}/>
                </FormControl>
                <FormControl fullWidth required className={classes.datePicker} >
                  <FormControlLabel  control={
                    <DatePicker
                      okLabel="تأیید"
                      label="تاریخ تولد"
                      className={classes.input}
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
                <FormControl fullWidth >
                  <FormControlLabel control={ <TextField multiline inputRef={inputRef => Register.descriptionRef = inputRef}
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
                <FormControl fullWidth >
                  <FormControlLabel disabled control={ <TextField
                    label={'نام کاربری'} className={classes.input}
                    value={this.state.userInformation.username}/>}/>
                </FormControl>
                <FormControl fullWidth >
                  <FormControlLabel control={ <TextField inputRef={inputRef => this.emailRef = inputRef} type="email"

                                                         label={'ایمیل'} className={classes.input} />}/>
                </FormControl>
                <FormControl fullWidth >
                  <FormControlLabel control={ <TextField inputRef={inputRef => this.passwordRef = inputRef} type="password"

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
                <h1>Hello dicklover bitch</h1>
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
    this.setState(prevState=> ({
      ...prevState,
      basicInformation : {
        ...prevState.basicInformation,
        nationalCode: this.props.nationalCode
      },
      userInformation: {
        ...prevState.userInformation,
        username: this.props.nationalCode
      }
    }));
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
      (basicInformation.gender == 0 || basicInformation.gender == 1) && basicInformation.nationalCode.length > 0
  }

  handleComplete = () => {
    switch(this.state.activeStep){
      case 0:
        if(!this.isBasicInformationValid()){
          //todo : raise error like toast or snackbar
          return;
        }
        break;
      case 1:
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
                                onClick={this.handleStep(index)}
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
                        <Button
                          disabled={this.state.activeStep === 0}
                          onClick={this.handleBack}
                          className={classes.button}
                        >
                          قبلی
                        </Button>
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