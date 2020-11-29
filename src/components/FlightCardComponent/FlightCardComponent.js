import React from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Stepper,
  StepConnector,
  Step,
  StepLabel,
  Typography,
  Grid,
} from '@material-ui/core';
import { FlightTakeoff, PinDrop, FlightLand } from '@material-ui/icons';

const styles = {
  paper: {
    width: '50%',
    padding: '50px',
  },
  price: {
    fontWeight: 'bold',
    paddingLeft: '50px',
  },
};

const iconsStyles = (theme) => ({
  bigIcons: {
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    backgroundImage: `linear-gradient( 136deg, ${theme.palette.secondary.light} 0%, ${theme.palette.secondary.main} 20%, ${theme.palette.secondary.dark} 100%)`,
  },
  smallIcons: {
    color: '#fff',
    width: 25,
    height: 25,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    zIndex: 1,
    backgroundImage: `linear-gradient( 136deg, ${theme.palette.secondary.light} 0%, ${theme.palette.secondary.main} 20%, ${theme.palette.secondary.dark} 100%)`,
  },
});

const Starticon = (props) => {
  return <div className={props.classes.bigIcons}>{<FlightTakeoff />}</div>;
};

const StyledStartIcon = withStyles(iconsStyles)(Starticon);

const MiddleIcon = (props) => {
  return (
    <div className={props.classes.smallIcons}>
      {<PinDrop style={{ fontSize: 12 }} />}
    </div>
  );
};

const StyledMiddleicon = withStyles(iconsStyles)(MiddleIcon);

const Endicon = (props) => {
  return <div className={props.classes.bigIcons}>{<FlightLand />}</div>;
};

const StyledEndIcon = withStyles(iconsStyles)(Endicon);

const StyledStepConnector = withStyles((theme) => ({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      borderLeftColor: theme.palette.secondary.main,
    },
  },
  completed: {
    '& $line': {
      borderLeftColor: theme.palette.secondary.main,
    },
  },
  line: {
    minHeight: '50px',
    borderLeftStyle: 'solid',
    borderLeftWidth: '4px',
    borderLeftColor: theme.palette.secondary.main,
    marginTop: '10px',
  },
}))(StepConnector);

const FlightCardComponent = (props) => {
  const { flights, classes } = props;

  let steps = [
    <Step key={0}>
      <StepLabel StepIconComponent={StyledStartIcon}>
        <Typography align="left" variant="subtitle2" component="p">
          {`Your origin airport ${flights[0].departureAirportCode}`}
        </Typography>
        <Typography align="left" variant="subtitle2" component="p">
          {`Flight to ${flights[0].arrivalAirportCode} with ${flights[0].airlineName} airline`}
        </Typography>
      </StepLabel>
    </Step>,
  ];

  for (let i = 1; i < flights.length; i++) {
    steps.push(
      <Step key={i}>
        <StepLabel StepIconComponent={StyledMiddleicon}>
          <Typography align="left" variant="subtitle2" component="p">
            {`Connecting Flight - From ${flights[i].departureAirportCode} to ${flights[i].arrivalAirportCode}`}
          </Typography>
          <Typography align="left" variant="subtitle2" component="p">
            {`With ${flights[i].airlineName} airline`}
          </Typography>
        </StepLabel>
      </Step>
    );
  }

  steps.push(
    <Step key={flights.length}>
      <StepLabel StepIconComponent={StyledEndIcon}>
        <Typography align="left" variant="subtitle2" component="p">
          {`Arrival to ${flights[flights.length - 1].arrivalAirportCode}`}
        </Typography>
      </StepLabel>
    </Step>
  );

  const priceList = flights.map((flight) => flight.price * 100);
  let totalPrice = 0;
  for (let i = 0; i < priceList.length; i++) {
    totalPrice = totalPrice + priceList[i];
  }

  let correctTotalPrice = totalPrice / 100;

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Paper className={classes.paper} elevation={0}>
        {flights.length > 0 ? (
          <>
            <Stepper
              activeStep={flights.length + 1}
              alternativeLabel={false}
              orientation="vertical"
              connector={<StyledStepConnector />}
            >
              {steps}
            </Stepper>
            <Typography className={classes.price} align="left">
              {`Total price: ${correctTotalPrice}`}
            </Typography>
          </>
        ) : (
          <Typography>No available flight for you destination</Typography>
        )}
      </Paper>
    </Grid>
  );
};

FlightCardComponent.propTypes = {
  flights: PropTypes.arrayOf(
    PropTypes.shape({
      airlineId: PropTypes.number,
      airlineName: PropTypes.string,
      arrivalAirportCode: PropTypes.string,
      arrivalAirportId: PropTypes.number,
      departureAirportCode: PropTypes.string,
      departureAirportId: PropTypes.number,
      id: PropTypes.id,
    })
  ),
  classes: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(FlightCardComponent);
