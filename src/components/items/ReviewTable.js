/**
 * Created by milad on 3/14/18.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Table, TableBody, TableCell, TableHead, TableRow} from "material-ui";


class ReviewTable extends Component {
  render() {
    return (
      <Table>
        <TableHead>

        </TableHead>
        <TableBody>
          {Object.keys(this.props.data).map(key => (
            <TableRow id={key}>
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

export default ReviewTable;
