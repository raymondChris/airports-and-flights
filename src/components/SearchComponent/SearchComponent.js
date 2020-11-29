import React from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { TextField, InputAdornment } from '@material-ui/core/';
import { Search } from '@material-ui/icons';

const styles = {
  inputCont: {
    width: '100%',
    margin: '20px 0px 40px 0px',
  },
};

const InputComponent = (props) => {
  const { changed, inputRef, value, classes } = props;

  return (
    <form className={classes.input} noValidate autoComplete="off">
      <div className={classes.inputCont}>
        <TextField
          value={value}
          inputRef={inputRef}
          id="standard-basic"
          label={'Search...'}
          color="primary"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            changed(e);
          }}
        />
      </div>
    </form>
  );
};

InputComponent.propTypes = {
  changed: PropTypes.func,
  value: PropTypes.string,
  classes: PropTypes.object,
};

export default withStyles(styles)(InputComponent);
