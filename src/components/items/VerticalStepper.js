/**
 * Created by milad on 3/8/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Stepper, Step, StepLabel, StepContent, Button, Paper, Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
});


class VerticalLinearStepper extends React.Component {
  state = {
    activeStep: 0,
  };


  componentDidMount(){
    this.props.nextStep(this.handleNext);
    this.props.reset(this.handleReset);
  }

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1,
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const steps = this.props.getStepFunc();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.actionsContainer}>
          {/*<div>
            <Button
              disabled={activeStep === 0}
              onClick={this.handleBack}
              className={classes.button}
            >
              Back
            </Button>
            <Button
              variant="raised"
              color="primary"
              onClick={this.handleNext}
              className={classes.button}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>*/}
        </div>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  {this.props.getStepContentFunc(index)}

                </StepContent>
              </Step>

            );
          })}

        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&quot;re finished</Typography>
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}

      </div>
    );
  }
}

VerticalLinearStepper.propTypes = {
  classes: PropTypes.object,
  getStepContentFunc : PropTypes.func,
  getStepFunc : PropTypes.func,
  nextStep : PropTypes.func.isRequired,
  reset : PropTypes.func.isRequired
};

export default withStyles(styles)(VerticalLinearStepper);
