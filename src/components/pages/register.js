/**
 * Created by milad on 2/12/18.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Button, Grid, Paper, TextField, Typography, withStyles, Switch, FormGroup, Divider,
  FormControl, FormControlLabel} from "material-ui";
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
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,

  },
  fixWidth: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
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
    selectedDate: new Date()
  };

  handleDateChange(date){
    console.log(date);
    this.setState({
      selectedDate: date
    });
  }

  getStepContent(step) {
    const {classes} = this.props;
    switch (step) {
      case 0:
        // render form for basic information
        return (
          <div className={classes.container}>
            <Grid container>
              <FormGroup >
                <FormControl className={classes.fixWidth} >
                  <FormControlLabel control={<TextField inputRef={inputRef => Register.firstNameRef = inputRef}
                                                        label={'نام'} style={{width: '100%', margin: 20}}/>}/>
                </FormControl>
                <FormControl className={classes.fixWidth}>
                  <FormControlLabel control={ <TextField inputRef={inputRef => Register.lastNameRef = inputRef}
                                                         label={'نام خانوادگی'} style={{width: '100%', margin: 20}}/>}/>
                </FormControl>
                <FormControl className={classes.fixWidth}>
                  <FormControlLabel disabled control={ <TextField inputRef={inputRef => Register.lastNameRef = inputRef}
                                                                  label={'کدملی'} style={{width: '100%', margin: 20}} value="۲۲۸۱۸۳۴۹۹۹"/>}/>
                </FormControl>
                <FormControl className={classes.fixWidth}>
                  <GenderSelector getGenderSelected={(gender) => Register.genderSelected = gender}/>
                </FormControl>

                <FormControl className={classes.datePicker} >
                  <FormControlLabel  control={<DatePicker
                    okLabel="تأیید"
                    cancelLabel="لغو"
                    maxDate={Date.now()}
                    labelFunc={date => date === null  ? '' : jMoment(date).format('jYYYY/jMM/jDD')}
                    onChange={this.handleDateChange}
                    value={this.state.selectedDate}
                    animateYearScrolling
                    utils={jalaliUtils}
                  />}/>

                </FormControl>
                {/*<Grid item xs={4}>
                 <TextField inputRef={inputRef => Register.firstNameRef = inputRef}
                 label={'نام'} style={{width: '100%', margin: 20}}/>

                 </Grid>
                 <Grid item xs={4}>
                 <TextField inputRef={inputRef => Register.lastNameRef = inputRef}
                 label={'نام خانوادگی'} style={{width: '100%', margin: 20}}/>

                 </Grid>
                 <Grid item xs={4}>
                 <Switch inputRef={inputRef => Register.genderRef = inputRef} />

                 </Grid>*/}
              </FormGroup>

            </Grid>
          </div>
        );
      case 1:
        // render form for user information
        return (
          <div>
            <Grid container>
              <Grid item xs={12}>
                <h1>Hello cocksucker bitch</h1>
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
    this.props.setSubtitleOfHeader('ثبت نام')
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

  handleComplete = () => {
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
            item xs={9}>
            <Paper>
              <Grid container
                    direction="column"
                    alignItems="center"
                    justify="center">


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
                      <Grid item xs={6}>
                        {this.state.activeStep !== steps.length ? (
                          this.getStepContent(this.state.activeStep)
                        ): null}
                      </Grid>
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