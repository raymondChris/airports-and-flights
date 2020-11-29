import React from 'react';

import PropTypes from 'prop-types';

import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import LocalAirportIcon from '@material-ui/icons/LocalAirport';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  card: {
    padding: '2px',
    cursor: 'pointer',
  },
  cardActive: {
    backgroundColor: '#A363E6',
    padding: '2px',
    cursor: 'pointer',
  },
  body: {
    padding: '0px 10px',
    paddingBottom: '10px !important',
  },
  bottom: {
    textAlign: 'initial',
    paddingBottom: '5px !important',
    paddingTop: '10px',
    padding: '1px',
  },
};

const CardComponent = (props) => {
  const {
    classes,
    code,
    latitude,
    longitude,
    clicked,
    isActive,
    airportId,
  } = props;
  return (
    <Card
      className={isActive ? classes.cardActive : classes.card}
      onClick={() => clicked(airportId)}
    >
      <CardHeader
        className={classes.head}
        avatar={<LocalAirportIcon />}
        title={`Iata Code:`}
      ></CardHeader>
      <CardContent className={classes.body}>
        <Typography className={classes.code} variant="h5" component="h2">
          {code}
        </Typography>
        <CardContent className={classes.bottom}>
          <Typography variant="caption" component="p">
            {`latitude: ${latitude}`}
          </Typography>
          <Typography variant="caption" component="p">
            {`longitude: ${longitude}`}
          </Typography>
        </CardContent>
      </CardContent>
    </Card>
  );
};

CardComponent.propTypes = {
  classes: PropTypes.object,
  code: PropTypes.string,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  clicked: PropTypes.func,
  isActive: PropTypes.bool,
  airportId: PropTypes.number,
};

export default withStyles(styles)(CardComponent);
