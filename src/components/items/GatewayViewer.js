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
    flexDirection: 'column',
    alignItems: 'center'
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

  onSelectGateway = (event) => {
    this.props.onSelect(event.target.value)
  }

  render() {
    const {classes, logo, name, selected, id} = this.props;
    console.log('key', id);
    return (
      <Card className={classes.card}>
        <div className={classes.content}>
          <CardMedia src={'img'} image={logo} className={classes.logoImage}/>
          <CardContent className={classes.cardContent}>
            <Radio value={id} checked={selected} onChange={this.onSelectGateway}/>
            <Typography className={classes.nameText} variant={'caption'}>{name}</Typography>
          </CardContent>
        </div>
      </Card>
    );
  }
}

GatewayViewer.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  selected : PropTypes.bool.isRequired,
  onSelect : PropTypes.func
};

export default withStyles(style)(GatewayViewer);
