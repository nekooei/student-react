import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, CardContent, CardMedia, Radio, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles'


const style = theme => ({
  card: {
    display: 'flex',
    flex : 1,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    display: 'flex',
    flexDirection: 'column'
  },
  cardContent: {
    flex: '1',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoImage: {
    backgroundSize: 'auto',
    width: 150,
    height: 150
  },
  nameText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class GatewayViewer extends Component {
  render() {
    const {classes, logo, name, selected} = this.props;
    return (
      <Card className={classes.card}>
        <div className={classes.content}>
          <CardMedia src={'img'} image={logo} className={classes.logoImage}/>
          <CardContent className={classes.cardContent}>
            <Radio checked={selected} />
            <Typography className={classes.nameText} variant={'headline'}>{name}</Typography>
          </CardContent>
        </div>
      </Card>
    );
  }
}

GatewayViewer.propTypes = {
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  selected : PropTypes.bool.isRequired
};

export default withStyles(style)(GatewayViewer);
