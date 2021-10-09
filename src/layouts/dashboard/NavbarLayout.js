import React from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  AppBar,
  Hidden,
  Toolbar,
  IconButton,
  Switch
} from '@material-ui/core';
import { Menu, Brightness4, BrightnessHigh } from '@material-ui/icons';
// components
import AccountPopover from './AccountPopover';
// hooks
import { useSettings } from '../../hooks';
// constants
import { LAYOUT } from '../../constants';

// ----------------------------------------------------------------------

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
  backgroundColor: alpha(theme.palette.background.default, 0.95),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${LAYOUT.DRAWER_WIDTH + 1}px)`
  }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: LAYOUT.APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: LAYOUT.APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------

const DashboardNavbar = ({ onOpenSidebar }) => {
  const { themeMode, toggleMode } = useSettings();
  return (
    <RootStyle>
      <ToolbarStyle>
        <Hidden lgUp>
          <IconButton
            onClick={onOpenSidebar}
            sx={{ mr: 1, color: 'text.primary' }}
          >
            <Menu />
          </IconButton>
        </Hidden>
        <Box sx={{ flexGrow: 1 }} />
        <Box px={4} sx={{ display: 'flex', alignItems: 'center' }}>
          {themeMode === 'light' ? (
            <Brightness4 color="primary" />
          ) : (
            <BrightnessHigh color="primary" />
          )}
          <Switch checked={!(themeMode === 'light')} onChange={toggleMode} />
        </Box>
        <Box>
          <AccountPopover
            user={{ firstName: 'Lindo', email: 'lindo@email.com' }}
          />
        </Box>
      </ToolbarStyle>
    </RootStyle>
  );
};

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func
};

export default DashboardNavbar;
