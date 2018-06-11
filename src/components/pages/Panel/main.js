/**
 * Created by milad on 3/4/18.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Grid, Paper, Tab, Tabs, Tooltip, Typography} from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';
import {Add, NotInterested} from '@material-ui/icons';
import {cancelFetching, setFetching} from "../../../actions/fetch";
import {setHeaderSubTitle} from "../../../actions/header";
import {getCurrentService, getPayments} from '../../../utils/api';
import Payment from "../../items/Payment";

const style = theme => ({
  root: {
    flexGrow: 1,
  },
  tabs: {
    width: '100%',

    marginRight: 10
  },
  fab: {
    margin: 0,
    top: 'auto',
    left: 20,
    bottom: 20,
    right: 'auto',
    position: 'fixed',

  },
  myContainer: {
    marginTop: 10,
    flex: 1

  },
  paymentItem: {
    margin: 5,
    flex: 1
  },
  notIcon: {
    fontSize: 72
  },
  sectionTitle: {
    marginBottom: 15
  }
});

class MainPanel extends Component {
  state = {
    tabSelected: 0,
  };

  handleTabChange = (event, value) => {
    if (value === 1) {
      this.props.setFetching();
      getPayments()
        .then(response => {
          this.props.cancelFetching();
          if (response.success) {
            this.setState({
              payments: response.payload
            });
          }
        })
    } else if (value === 0) {
      this.props.setFetching();
      getCurrentService()
        .then(response => {
          this.props.cancelFetching();
          if (response.success) {
            this.setState({
              currentService: response.payload
            });
          }
        })
    }
    this.setState({
      tabSelected: value
    });
  };

  componentDidMount() {
    this.props.setSubtitleOfHeader('مدیریت');
    this.props.setFetching();
    getCurrentService()
      .then(response => {
        this.props.cancelFetching();
        if (response.success) {
          this.setState({
            currentService: response.payload
          });
        }
      })
  }

  render() {
    const {classes} = this.props;
    const {tabSelected} = this.state;
    return (
      <Grid container direction={'column'} justify={'start-flex'}>
        <Tabs
          className={classes.tabs}
          indicatorColor="primary"
          textColor="primary"
          fullWidth
          value={this.state.tabSelected}
          onChange={this.handleTabChange}
          centered>
          <Tab label={'سرویس ها'}/>
          <Tab label={'پرداخت ها'}/>

        </Tabs>
        {tabSelected === 0 ? (
          <div>
            <Grid direction={'column'} container spacing={0} justify={'center'} alignItems={'center'} className={classes.myContainer}>

              <Typography className={classes.sectionTitle} align={'center'} variant={'display1'}>سرویس فعال</Typography>
              {this.state.currentService && !this.props.fetching ? (
                Object.keys(this.state.currentService).length === 0 ? (
                  <Grid item xs={6}>

                    <Paper elevation={10}>
                      <Grid container spacing={8} justify={'center'} alignItems={'center'}>
                        <NotInterested className={classes.notIcon} color={'error'}/>
                        <Grid item xs={12} alignContent={'space-around'}>
                          <Typography align={'center'} variant={'headline'}> در حال حاضر سرویس فعالی وجود
                            ندارد.</Typography>
                          <Typography align={'center'} variant={'body'}>لطفا درخواست سرویس جدیدی ثبت کنید.</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Button variant={'raised'} color={'primary'} fullWidth
                                  onClick={() => this.props.history.push('/panel/newService')}>ثبت درخواست</Button>
                        </Grid>


                      </Grid>
                    </Paper>
                  </Grid>

                ) : (
                  /*here show current service*/
                  null
                )
              ) : null}


            </Grid>
            <Tooltip title={'ثبت درخواست سرویس'} id={'tooltip-new-service'} placement={'top'}>
              <Button href={'/panel/newService'} fab variant="fab" color="primary" aria-label="add"
                      className={classes.fab}>
                <Add/>
              </Button>
            </Tooltip>
          </div>
        ) : (
          <Grid container direction={'row'} justify={'center'} alignItems={'center'}
                className={classes.myContainer}>
            {this.state.payments && !this.props.fetching ? (
              <Grid xs={9} className={classes.paymentItem}>
                <Grid container justify={'center'} alignItems={'center'} spacing={8}>
                  {this.state.payments.map((payment, index) => (
                    <Grid item xs={12}>
                      <Payment {...payment} index={index + 1}/>
                    </Grid>
                  ))}

                </Grid>
              </Grid>

            ) : null}

          </Grid>
        )}
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setFetching: () => dispatch(setFetching()),
    cancelFetching: () => dispatch(cancelFetching()),
    setSubtitleOfHeader: subtitle => dispatch(setHeaderSubTitle(subtitle))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(MainPanel));
