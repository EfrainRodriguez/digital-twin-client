import React from 'react';
// prop types
import PropTypes from 'prop-types';
// router
import { Link as RouterLink } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  List,
  Drawer,
  Hidden,
  ListSubheader,
  Link,
  Typography,
  Box,
  Avatar
} from '@material-ui/core';
import { Home, ThreeDRotation } from '@material-ui/icons';
// layout
import SidebarItem from './SidebarItem';
// paths
import { PATH_HOME } from '../../routes/paths';
// constants
import { LAYOUT } from '../../constants';

// custom styles ------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: LAYOUT.DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  margin: theme.spacing(0, 2.5, 5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[500_12]
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const siderbarContent = () => (
    <>
      <Typography variant="h5" sx={{ px: 2.5, mt: 4 }}>
        Welcome!
      </Typography>
      <Link underline="none" component={RouterLink} to={PATH_HOME.root}>
        <AccountStyle>
          <Avatar src="https://www.pngitem.com/pimgs/m/576-5768840_cartoon-man-png-avatar-transparent-png.png" />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
              Lindo
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Admin
            </Typography>
          </Box>
        </AccountStyle>
      </Link>
      <List
        disablePadding
        subheader={
          <ListSubheader
            disableSticky
            disableGutters
            sx={{
              mt: 3,
              mb: 2,
              pl: 5,
              color: 'text.primary',
              typography: 'overline'
            }}
          >
            Menu
          </ListSubheader>
        }
      >
        <SidebarItem title="Home" href={PATH_HOME.root} icon={<Home />} />
        <SidebarItem
          title="3D Simulation"
          href="/simulation"
          icon={<ThreeDRotation />}
        />
      </List>
    </>
  );

  return (
    <RootStyle>
      <Hidden lgUp>
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: LAYOUT.DRAWER_WIDTH }
          }}
        >
          {siderbarContent()}
        </Drawer>
      </Hidden>

      <Hidden lgDown>
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: { width: LAYOUT.DRAWER_WIDTH }
          }}
        >
          {siderbarContent()}
        </Drawer>
      </Hidden>
    </RootStyle>
  );
}
