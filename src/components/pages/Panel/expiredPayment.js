import React, {Component} from 'react';
import {Button, Grid, Paper, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {Error as ErrorFlag, SubdirectoryArrowLeft} from '@material-ui/icons';
import { red } from '@material-ui/core/colors';

const style = () => ({
  container: {
    padding: 5
  },
  errorFlag: {
    width:'100%',
    fontSize: 72,
  },
  button:{
    margin: 5,
    color: red[900]
  },
});

class ExpiredPayment extends Component {
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
                  <ErrorFlag color={'error'} className={classes.errorFlag}/>
                </Grid>
                <Grid item xs={12}>
                  <Typography>تراکنش نا معتبر!</Typography>
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


export default withStyles(style)(ExpiredPayment);
