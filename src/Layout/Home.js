import React, { useState, useEffect, useCallback } from "react";

import apiCall from "../shared/API";

import { withStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

import { withSnackbar } from "notistack";

import {
  Actions,
  FlightCard,
  Message,
  Result,
  Search,
  Stepper,
} from "../components";

const styles = {
  root: {
    width: "100%",
  },
  loader: {},
};

function getSteps() {
  return ["Departure", "Arrival", "Result"];
}

const Home = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [enteredValue, setEnteredValue] = useState("");
  const [loaderState, setLoaderState] = useState(false);

  const [airportList, setAirportList] = useState([]);
  const [airportsOnScreen, setAirportOnScreen] = useState([]);
  const [airlinesList, setAirlinesList] = useState([]);

  const [departure, setDeparture] = useState({});
  const [arrival, setArrival] = useState({});

  const [flightsResult, setFlightsResult] = useState([]);

  const steps = getSteps();

  const { classes, enqueueSnackbar } = props;

  const nextHandler = () => {
    const [airport] = airportList.filter(
      (airport) => airport.isSelected === true
    );
    const newAirportList = airportList.map((airport) => ({
      ...airport,
      isSelected: false,
    }));
    let newAirportsOnScreen;
    switch (activeStep) {
      case 0:
        setDeparture(airport);
        newAirportsOnScreen = airportList.filter(
          (airport) => airport.isSelected !== true
        );
        break;
      case 1:
        setArrival(airport);
        newAirportsOnScreen = [{ ...departure }, { ...airport }];
        break;
      default:
        return;
    }

    setAirportOnScreen([...newAirportsOnScreen]);
    setAirportList([...newAirportList]);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setEnteredValue("");
  };

  const backHandler = () => {
    let airportListBack;
    let airportsListBackOnScreen;
    switch (activeStep) {
      case 2:
        setArrival({});
        airportListBack = airportList.map((airport) => {
          if (airport.id === arrival.id) {
            return { ...airport, isSelected: true };
          } else {
            return { ...airport };
          }
        });
        airportsListBackOnScreen = airportListBack.filter(
          (airport) => airport.id !== departure.id
        );
        break;
      case 1:
        setDeparture({});
        airportListBack = airportList.map((airport) => {
          if (airport.id === departure.id) {
            return { ...airport, isSelected: true };
          } else {
            return { ...airport, isSelected: false };
          }
        });
        airportsListBackOnScreen = airportListBack;
        break;
      default:
        return;
    }

    setAirportOnScreen([...airportsListBackOnScreen]);
    setAirportList([...airportListBack]);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setEnteredValue("");
  };

  const resetHandler = () => {
    setActiveStep(0);
    setEnteredValue("");
    setDeparture({});
    setArrival({});
    setFlightsResult([]);
    retrieveArportsListHandler();
  };

  const changeInputHandler = (e) => {
    const value = e.target.value;
    setEnteredValue(value);
    updateAirportList(value);
  };

  const retrieveArportsListHandler = useCallback(async () => {
    try {
      setLoaderState(true);
      const airportsListData = await apiCall("airports/all");
      const airlinesList = await apiCall("airlines/all");
      showListHandler(airportsListData);
      setAirlinesList(airlinesList);
      setLoaderState(false);
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    retrieveArportsListHandler();
  }, [retrieveArportsListHandler]);

  const showListHandler = (airportList) => {
    const airportsNew = airportList.map((airport) => ({
      ...airport,
      isSelected: false,
    }));
    setAirportList([...airportsNew]);
    setAirportOnScreen([...airportsNew]);
  };

  const updateAirportList = (value) => {
    let filteredAirports;
    if (value !== "") {
      filteredAirports = airportList.filter((airport) =>
        airport.codeIata.toLowerCase().includes(value.toLowerCase())
      );
    } else {
      filteredAirports = [...airportList];
    }
    setAirportOnScreen([...filteredAirports]);
  };

  const clickCardHandler = (id) => {
    const airports = airportList.map((airport) => {
      if (airport.id === id) {
        return { ...airport, isSelected: !airport.isSelected };
      } else {
        return { ...airport, isSelected: false };
      }
    });

    const airportsFiltered = airportsOnScreen.map((airport) => {
      if (airport.id === id) {
        return { ...airport, isSelected: !airport.isSelected };
      } else {
        return { ...airport, isSelected: false };
      }
    });

    setAirportList([...airports]);
    setAirportOnScreen([...airportsFiltered]);
  };

  const checkActiveCardHandler = () => {
    let isOneActive = false;
    isOneActive =
      airportsOnScreen.filter((airport) => airport.isSelected === true).length >
      0;
    return isOneActive;
  };

  const getFlightsHandler = async () => {
    try {
      let flightsResult = await apiCall(
        `flights/from/${departure.codeIata}/to/${arrival.codeIata}`
      );
      console.log(flightsResult);
      flightsResult = flightsResult.map((flight) => {
        const [airlineInfo] = airlinesList.filter(
          (airline) => airline.id === flight.airlineId
        );
        return {
          ...flight,
          airlineName: airlineInfo.name,
        };
      });
      flightsResult = flightsResult.map((flight) => {
        const [airportDepartureInfo] = airportList.filter(
          (airport) => airport.id === flight.departureAirportId
        );
        const [airportArrivalInfo] = airportList.filter(
          (airport) => airport.id === flight.arrivalAirportId
        );
        return {
          ...flight,
          departureAirportCode: airportDepartureInfo.codeIata,
          arrivalAirportCode: airportArrivalInfo.codeIata,
        };
      });
      const orderedFlight = orderFlightHandler(flightsResult);
      console.log(orderedFlight);
      setFlightsResult([...orderedFlight]);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    }
  };

  const orderFlightHandler = (flight) => {
    let orderedFlight = [];
    flight = flight.filter((fl) => {
      if (departure.id === fl.departureAirportId) {
        orderedFlight.push(fl);
      }
      return departure.id !== fl.departureAirportId;
    });
    while (flight.length > 0) {
      let lastIndex = orderedFlight.length - 1;
      flight = flight.filter((fl) => {
        if (
          orderedFlight[lastIndex].arrivalAirportId === fl.departureAirportId
        ) {
          orderedFlight.push(fl);
        }
        return (
          orderedFlight[lastIndex].arrivalAirportId !== fl.departureAirportId
        );
      });
    }
    return orderedFlight;
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} steps={steps} />
      <Message activeStep={activeStep} steps={steps} />
      {activeStep < 2 ? (
        <Search value={enteredValue} changed={changeInputHandler} />
      ) : null}
      {loaderState ? (
        <CircularProgress color="secondary" />
      ) : activeStep === 3 ? (
        <FlightCard flights={flightsResult} />
      ) : (
        <Result
          clicked={activeStep < 2 ? clickCardHandler : () => {}}
          airportList={airportsOnScreen}
        />
      )}
      <Actions
        steps={steps}
        isNextDisabled={checkActiveCardHandler()}
        activeStep={activeStep}
        backClick={backHandler}
        nextClick={activeStep < 2 ? nextHandler : getFlightsHandler}
        resetClick={resetHandler}
      />
    </div>
  );
};

export default withStyles(styles)(withSnackbar(Home));
