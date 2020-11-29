import React from 'react';

import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import CardComponent from '../CardComponent/CardComponent';

const styles = {
  container: {
    width: '100%',
  },
};

const ResultComponent = (props) => {
  const { airportList, clicked, classes } = props;

  const cardList = airportList.map((airport, index) => {
    return (
      <Grid key={`grid${airport.codeIata}`} item>
        <CardComponent
          key={`card${airport.codeIata}`}
          airportId={airport.id}
          isActive={airport.isSelected}
          index={index}
          clicked={clicked}
          code={airport.codeIata}
          latitude={airport.latitude}
          longitude={airport.longitude}
        />
      </Grid>
    );
  });

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={3}
      className={classes.container}
    >
      {cardList}
    </Grid>
  );
};

ResultComponent.propType = {
  airportList: PropTypes.arrayOf(
    PropTypes.shape({
      codeIata: PropTypes.string,
      id: PropTypes.number,
      isSelected: PropTypes.bool,
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    })
  ),
  clicked: PropTypes.func,
  classes: PropTypes.object,
};

export default withStyles(styles)(ResultComponent);
