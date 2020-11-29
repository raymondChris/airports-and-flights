import React from 'react';

import PropTypes from 'prop-types';

import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const useStyles = {
  appBar: {
    position: 'fixed',
    top: 'auto',
    bottom: '30px',
    backgroundColor: 'transparent',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  },
  buttonRight: {
    position: 'fixed',
    bottom: '35px',
    right: '25%',
  },
  buttonLeft: {
    position: 'fixed',
    bottom: '35px',
    left: '25%',
  },
  buttonCenter: {
    position: 'fixed',
    bottom: '35px',
  },
};

const ActionsComponent = (props) => {
  const {
    activeStep,
    backClick,
    nextClick,
    steps,
    classes,
    resetClick,
    isNextDisabled,
  } = props;

  return (
    <div>
      {activeStep === steps.length ? (
        <Button
          className={classes.buttonCenter}
          variant="contained"
          color="secondary"
          onClick={resetClick}
        >
          Reset
        </Button>
      ) : (
        <>
          <Button
            className={classes.buttonLeft}
            variant="contained"
            color="secondary"
            disabled={activeStep === 0}
            onClick={backClick}
          >
            Back
          </Button>
          <Button
            className={classes.buttonRight}
            disabled={!isNextDisabled}
            variant="contained"
            color="primary"
            onClick={nextClick}
          >
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </>
      )}
    </div>
  );
};

ActionsComponent.propTypes = {
  activeStep: PropTypes.number,
  backClick: PropTypes.func,
  nextClick: PropTypes.func,
  steps: PropTypes.arrayOf(PropTypes.string),
  classes: PropTypes.object,
  resetClick: PropTypes.func,
  isNextDisabled: PropTypes.bool,
};

export default withStyles(useStyles)(ActionsComponent);
