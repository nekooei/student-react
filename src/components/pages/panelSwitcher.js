/**
 * Created by milad on 3/4/18.
 */
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Switch, Route} from 'react-router-dom';

class Panel extends Component {
  constructor(props){
    super(props);
    if(!localStorage.token || localStorage.token.length === 0){
      localStorage.clear();
      this.props.history.push('/');
    }else {
      this.props.history.push(this.generatePanelRoute('main'));
    }
  }

  generatePanelRoute(endPoint){
    return `${this.props.location.pathname}/${endPoint}`;
  }
  render() {
    return (
      <div>
        <Switch>
          <Route path={this.generatePanelRoute('main')}/>
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


export default connect(mapStateToProps)(Panel);
