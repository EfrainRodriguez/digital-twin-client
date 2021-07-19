import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
// material
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import StyledEngineProvider from '@material-ui/core/StyledEngineProvider';
// hooks
import { useSettings } from '../hooks';
//
import shape from './shape';
import palette from './palette';
import typography from './typography';
import breakpoints from './breakpoints';
import GlobalStyles from './globalStyles';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';

// ----------------------------------------------------------------------

const ThemeConfig = ({ children }) => {
  const { themeMode } = useSettings();
  const themeDirection = 'ltr';
  const isLight = themeMode === 'light';

  const themeOptions = useMemo(
    () => ({
      palette: isLight
        ? { ...palette.light, mode: 'light' }
        : { ...palette.dark, mode: 'dark' },
      shape,
      typography,
      breakpoints,
      direction: themeDirection,
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark
    }),
    [isLight, themeDirection]
  );

  const theme = createMuiTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

ThemeConfig.propTypes = {
  children: PropTypes.node.isRequired
};

export default ThemeConfig;
