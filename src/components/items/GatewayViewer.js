import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardMedia, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles'


const style = theme => ({
  card : {
    display: 'flex'
  },
  content : {
    display: 'flex',
    flexDirection: 'column'
  },
  cardContent: {
    flex: '1 0 auto',
  },
  logoImage: {
    width: 250,
    height: 250
  },
  nameText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class GatewayViewer extends Component {
  render() {
    const {classes, logo, name} = this.props;
    return (
      <Card className={classes.card} raised>
        <div className={classes.content}>
          <CardMedia src={logo} className={classes.logoImage}/>
          <CardContent className={classes.cardContent}>
            <Typography className={classes.nameText} variant={'headline'}>{name}</Typography>
          </CardContent>
        </div>
      </Card>
    );
  }
}

GatewayViewer.propTypes = {
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired
};

export default  withStyles(style)(GatewayViewer);
