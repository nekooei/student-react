/**
 * Created by milad on 2/21/18.
 */
import React, {Component} from 'react';
import {MenuItem, Select, TextField} from 'material-ui';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '85%',
  },
  menu: {
    width: '85%',
  },
});

const currencies = [
  {
    value: '0',
    label: 'مرد',
  },
  {
    value: '1',
    label: 'زن',
  }
];


class GenderSelector extends Component {
  state = {
    gender: 0,
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
    this.props.getGenderSelected(event.target.value);
  };
  render() {
    const { classes } = this.props;
    return (
      <TextField
        id="select-gender"
        select
        label={'جنسیت'}
        className={classes.textField}
        value={this.state.gender}
        onChange={this.handleChange('gender')}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        margin="normal"
      >
        {currencies.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    );
  }
}

GenderSelector.propTypes = {
  getGenderSelected : PropTypes.func
};
GenderSelector.defaultProps = {};

export default withStyles(styles)(GenderSelector);
