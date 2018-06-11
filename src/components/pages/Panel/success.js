import React, {Component} from 'react';
import {Button, Grid, Paper, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {CheckCircle as SuccessFlag, SubdirectoryArrowLeft} from '@material-ui/icons';

const style = () => ({
  container: {
    padding: 5
  },
  successFlag: {
    width:'100%',
    fontSize: 72,
  },
  button:{
    margin: 5
  },
});

class Success extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div>
        <Grid container
              className={classes.container}
              direction={'column'}
              alignItems={'center'}
              justify={'center'}
              spacing={0}
        >
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Paper elevation={10}>
              <Grid container direction={'column'} alignItems={'center'} justify={'center'} spacing={24}>
                <Grid item xs={12}>
                  <SuccessFlag color={'secondary'} className={classes.successFlag}/>
                </Grid>
                <Grid item xs={12}>
                  <Typography>پرداخت با موفقیت انجام شد.</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button className={classes.button} onClick={() => this.props.history.push('/panel/main')}>
                    بازگشت
                    <SubdirectoryArrowLeft/>
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}


export default withStyles(style)(Success);
