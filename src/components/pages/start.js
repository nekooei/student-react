/**
 * Created by milad on 1/28/18.
 */
import React, {Component} from 'react';
//import PropTypes from 'prop-types';
import {
  Avatar,
  Grid,
  Paper,
  TextField,
  Button
} from 'material-ui';
import {
  withStyles
} from 'material-ui/styles';

const style = {
  form: {
    padding: 10
  }
};

class StartPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container
              direction="row"
              alignItems="center"
              justify="center">
          <Grid
            item xs={4}>
            <Paper>
              <Grid container
                    direction="column"
                    alignItems="center"
                    justify="center">
                <Avatar src={'http://www.newsshare.in/wp-content/uploads/2017/04/Miniclip-8-Ball-Pool-Avatar-16.png'}
                        style={{ width: 60, height : 60, alignment: 'center' }}
                />

              </Grid>
              <Grid container
                    direction="row"
                    alignItems="center" spacing={0}
                    justify="center">
                <Grid item xs={10}  className={classes.form}>
                  <TextField label='کدملی' style={{ width : '100%', margin: 20 }} />
                  <Button raised color='primary'>بعدی</Button>
                </Grid>
              </Grid>

            </Paper>
          </Grid>

        </Grid>
      </div>
    );
  }
}

StartPage.propTypes = {};
StartPage.defaultProps = {};

export default withStyles(style)(StartPage);
