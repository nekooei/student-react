/**
 * Created by milad on 3/4/18.
 */
import React, {Component} from 'react';
import './dist/css/map-icons.css';
import PropTypes from 'prop-types';

class Marker extends Component {
  render() {
    return (
      <span className={`map-icon map-icon-${this.props.markerName} mapMarkerSize`}></span>
    );
  }
}

Marker.propTypes = {
  markerName: PropTypes.string
};
Marker.defaultProps = {
  markerName: 'map-pin'
};

export default Marker;
