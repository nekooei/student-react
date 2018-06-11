import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Grid} from '@material-ui/core';

class CurrentService extends Component {
  render() {
    return (
      <div></div>
    );
  }
}

CurrentService.propTypes = {
  id: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  carName : PropTypes.string.isRequired,
  carColor: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  termGroupCaption: PropTypes.string.isRequired,
  schoolTermCaption: PropTypes.string.isRequired
};
CurrentService.defaultProps = {};

export default CurrentService;
