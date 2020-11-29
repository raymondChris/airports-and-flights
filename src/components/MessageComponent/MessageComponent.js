import React from 'react';

import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const useStyles = (theme) => ({
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  instructionsFinished: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    fontWeight: '200',
  },
});

const MessageComponent = (props) => {
  const { activeStep, steps, classes } = props;

  function getStepContent(step) {
    switch (step) {
      case 0:
        return 'Select your departure airport';
      case 1:
        return 'Select your destination airport';
      case 2:
        return 'Are you Sure?';
      default:
        return 'Unknown step';
    }
  }

  return (
    <div>
      {activeStep === steps.length ? (
        <Typography variant="h6" className={classes.instructionsFinished}>
          Your itinerary
        </Typography>
      ) : (
        <Typography className={classes.instructions}>
          {getStepContent(activeStep)}
        </Typography>
      )}
    </div>
  );
};

MessageComponent.propTypes = {
  activeStep: PropTypes.number,
  steps: PropTypes.arrayOf(PropTypes.string),
  classes: PropTypes.object,
};

export default withStyles(useStyles)(MessageComponent);
