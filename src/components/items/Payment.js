import React, {Component} from 'react';
import {Grid, IconButton, Paper, Tooltip, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {CheckCircle, Refresh} from '@material-ui/icons';
import PropTypes from 'prop-types';
import momentjalali from 'moment-jalaali';

const style = theme => ({
  typo: {
    margin: 2
  }
});

class Payment extends Component {
  render() {
    const {classes, verified, gatewayTitle, amount, factorNum, createdAt} = this.props;
    const createdAtString = momentjalali(createdAt).format('jYYYY/jM/jD HH:mm');
    return (
      <Grid container
            direction={'row'}
            justify={'flex-start'}
            alignItems={'stretch'}
      >
        <Grid item
              xs={12}
              md={12}>
          <Paper elevation={12}>
            <Grid container direction={'row'} spacing={0} justify={'flex-start'} alignItems={'center'}>
              {!verified ? (
                <Grid item xs={1} md={1}>
                  <Tooltip id="tooltip-top" title="بررسی پرداخت" placement="top">
                    <IconButton>
                      <Refresh color={'error'}/>
                    </IconButton>
                  </Tooltip>
                </Grid>
              ) : (
                <Grid item sm={1} md={1}>
                  <Tooltip id="tooltip-top" title="پرداخت تایید شده" placement="top">
                    <IconButton disableRipple>
                      <CheckCircle color={'primary'}/>
                    </IconButton>
                  </Tooltip>
                </Grid>
              )}

              <Grid item sm={4} md={2}>
                <Typography className={classes.typo}>مبلغ: {amount} (ریال)</Typography>
              </Grid>
              <Grid item sm={4} md={2}>
                <Typography className={classes.typo}>درگاه: {gatewayTitle}</Typography>
              </Grid>
              <Grid item sm={4} md={2}>
                <Typography color={'primary'} className={classes.typo}>شماره فاکتور: {factorNum}</Typography>
              </Grid>

              <Grid item sm={4} md={2}>
                <Typography className={classes.typo}>تاریخ: {createdAtString}</Typography>
              </Grid>

            </Grid>


          </Paper>
        </Grid>


      </Grid>
    );
  }
}

Payment.propTypes = {
  id: PropTypes.number.isRequired,
  verified: PropTypes.bool.isRequired,
  transId: PropTypes.string.isRequired,
  factorNum: PropTypes.string.isRequired,
  gatewayTitle: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired
};

export default withStyles(style)(Payment);
