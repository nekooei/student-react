/**
 * Created by milad on 3/4/18.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Grid, Tab, Tabs} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import {Add} from '@material-ui/icons';
import {cancelFetching, setFetching} from "../../../actions/fetch";
import {setHeaderSubTitle} from "../../../actions/header";
import {
  getPayements
} from '../../../utils/api';
import Payment from "../../items/Payment";

const style = theme => ({
  root: {
    flexGrow: 1,
  },
  tabs: {
    width : '100%',

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
  paymentsContainer:{
    marginTop: 10,
    flex: 1

  },
  paymentItem : {
    margin: 5,
    flex: 1
  }
});

class MainPanel extends Component {
  state = {
    tabSelected: 0,
  };

  handleTabChange = (event, value) => {
    if(value === 1){
      this.props.setFetching();
      getPayements()
        .then(response => {
          this.props.cancelFetching();
          if(response.success){
            this.setState({
              payments : response.payload
            });
          }
        })
    }
    this.setState({
      tabSelected: value
    });
  };

  componentDidMount(){
    this.props.setSubtitleOfHeader('مدیریت');

  }

  render() {
    const { classes } = this.props;
    const {tabSelected} = this.state;
    return (
      <Grid container direction={'column'} justify={'start-flex'} >
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
            <Grid container spacing={0}>

            </Grid>
            <Button href={'/panel/newService'} fab variant="fab" color="primary" aria-label="add" className={classes.fab}>
              <Add />
            </Button>
          </div>
        ) : (
          <Grid container direction={'column'} justify={'space-around'} alignItems={'stretch'} className={classes.paymentsContainer}>
            {this.state.payments  && !this.props.fetching ? (
              this.state.payments.map(payment => (
                <Grid xs={12}  className={classes.paymentItem}  children={<Payment {...payment}/>}/>
              ))
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
