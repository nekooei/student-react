/**
 * Created by milad on 2/12/18.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Grid, Paper, TextField, Typography, withStyles} from "material-ui";
import Stepper, {Step, StepLabel, StepButton} from 'material-ui/Stepper';
import {connect} from "react-redux";

const style = {
  form: {
    padding: 10
  },
  stepper : {
    width: '100%'
  }
};

function getSteps() {
  return [
    'اطلاعات پایه',
    'اطلاعات کاربری',
    'آدرس'
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Step 1: Select campaign settings...';
    case 1:
      return 'Step 2: What is an ad group anyways?';
    case 2:
      return 'Step 3: This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
}

class Register extends Component {

  state = {
    activeStep : 0,
    completed: new Set(),
    skipped: new Set()
  };

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

Register.propTypes = {};
Register.defaultProps = {};

function mapStateToProps(state) {
  return {
    ...state
  };
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Register));