/**
 * Created by milad on 3/14/18.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Table, TableBody, TableCell, TableRow} from "@material-ui/core";
import withStyles from "material-ui/es/styles/withStyles";

const styles = {
  table: {
    width: '100%'
  }
};

class ReviewTable extends Component {

  render() {
    const {classes} = this.props;
    return (
      <Table className={classes.table}>
        <TableBody>
          {Object.keys(this.props.data).map(key => (
            <TableRow id={key} hover >
              <TableCell>
                {key}
              </TableCell>
              <TableCell>
                {this.props.data[key]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

ReviewTable.propTypes = {
  data: PropTypes.object
};
ReviewTable.defaultProps = {
  data : {}
};

export default withStyles(styles)(ReviewTable);
