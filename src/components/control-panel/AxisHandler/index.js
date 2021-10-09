import React, { useState } from 'react';
// prop types
import PropTypes from 'prop-types';
// material ui
import {
  Box,
  Grid,
  Button,
  Slider,
  TextField,
  Typography
} from '@material-ui/core';
import { Remove, Add, RotateLeft, RotateRight } from '@material-ui/icons';

const AxisHandler = ({
  step = 5,
  max = 100,
  min = -100,
  label = 'Axis',
  buttonText = 'X',
  isRotationAxis = false,
  hasSlider = true,
  initialPosition = 0,
  onChange
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [fieldValue, setFieldValue] = useState(initialPosition);

  const handlePositionChange = (value) => {
    setPosition(value);
    setFieldValue(value);
    return onChange && onChange(value);
  };

  const handleSliderChange = (event, newValue) =>
    handlePositionChange(newValue);

  const handleButtonClick = (direction) => {
    const newPosition = position + direction * step;
    if (newPosition < min || newPosition > max) {
      return null;
    }
    return handlePositionChange(newPosition);
  };

  const handleTextFieldEnter = (event) => {
    if (event.key === 'Enter') {
      const newPosition = parseInt(fieldValue, 10);
      return handlePositionChange(newPosition);
    }
    return null;
  };

  const handleFieldChange = (event) => {
    setFieldValue(event.target.value);
  };

  return (
    <Box maxWidth={250}>
      <Typography mb={1} variant="body2">
        {label}
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={24} display="flex">
          <Button
            variant="contained"
            startIcon={isRotationAxis ? <RotateLeft /> : <Remove />}
            onClick={() => handleButtonClick(-1)}
          >
            {buttonText}
          </Button>
          <Box px={2}>
            <TextField
              type="number"
              size="small"
              value={fieldValue}
              onChange={handleFieldChange}
              onKeyPress={handleTextFieldEnter}
            />
          </Box>
          <Button
            variant="contained"
            endIcon={isRotationAxis ? <RotateRight /> : <Add />}
            onClick={() => handleButtonClick(1)}
          >
            {buttonText}
          </Button>
        </Grid>
        {hasSlider && (
          <Grid item xs={24}>
            <Slider
              max={max}
              min={min}
              step={step}
              track={false}
              value={position}
              onChange={handleSliderChange}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

AxisHandler.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  label: PropTypes.string,
  hasSlider: PropTypes.bool,
  buttonText: PropTypes.string,
  isRotationAxis: PropTypes.bool,
  initialPosition: PropTypes.number,
  onChange: PropTypes.func
};

export default AxisHandler;
