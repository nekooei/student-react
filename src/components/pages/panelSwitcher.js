/**
 * Created by milad on 3/4/18.
 */
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';
import MainPanel from './Panel/main';
import NewService from './Panel/newService';
import Success from './Panel/success';
import Failure from './Panel/failure';
import ExpiredPayment from './Panel/expiredPayment';
import InvalidPaymentInformation from './Panel/invalidPaymentInformation';
import {cancelFetching, setFetching} from "../../actions/fetch";
import {setHeaderSubTitle} from "../../actions/header";
import {checkToken} from "../../actions/login";
import {setUserInfo} from "../../actions/student";

class Panel extends Component {
  constructor(props){
    super(props);

  }

  componentDidMount(){


    if(this.props.history.location.pathname === '/panel'){
      this.props.history.push(this.generatePanelRoute('main'));
    }
    if(!this.props.student.id){
      this.props.checkToken();
      this.props.setStudent();
    }
  }

  generatePanelRoute(endPoint){
    return `/panel/${endPoint}`;
  }
  render() {
    if(!localStorage.token || localStorage.token.length === 0){
      localStorage.clear();
      return(
        <Redirect to={'/'} />
      )
    }
    return (
      <div>
        <Switch>
          <Route exact path={this.generatePanelRoute('main')} component={MainPanel}/>
          <Route exact path={this.generatePanelRoute('newService')} component={NewService}/>
          <Route exact path={this.generatePanelRoute('success')} component={Success}/>
          <Route exact path={this.generatePanelRoute('failure')} component={Failure}/>
          <Route exact path={this.generatePanelRoute('invalidPaymentInformation')} component={InvalidPaymentInformation}/>
          <Route exact path={this.generatePanelRoute('expiredPayment')} component={ExpiredPayment}/>
          <Route exact path={this.generatePanelRoute('profile')} component={Success}/>
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setFetching: () => dispatch(setFetching()),
    cancelFetching: () => dispatch(cancelFetching()),
    setSubtitleOfHeader: subtitle => dispatch(setHeaderSubTitle(subtitle)),
    checkToken : () => dispatch(checkToken()),
    setStudent : () => dispatch(setUserInfo())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Panel);
