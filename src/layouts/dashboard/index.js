import PropTypes from 'prop-types';
import { useState } from 'react';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
//
import NavbarLayout from './NavbarLayout';
import SidebarLayout from './SidebarLayout';
// constants
import { LAYOUT } from '../../constants';

// ----------------------------------------------------------------------

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: LAYOUT.APPBAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: LAYOUT.APPBAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

DashboardLayout.propTypes = {
  children: PropTypes.node
};

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <RootStyle>
      <NavbarLayout onOpenSidebar={() => setOpen(true)} />
      <SidebarLayout
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      />
      <MainStyle>{children}</MainStyle>
    </RootStyle>
  );
}
