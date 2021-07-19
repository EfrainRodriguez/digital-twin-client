import React, { useState } from 'react';
// prop types
import PropTypes from 'prop-types';
// material
import {
  IconButton,
  Avatar,
  Popover,
  Box,
  Typography,
  Button
} from '@material-ui/core';
import { styled, alpha } from '@material-ui/core/styles';

// custom styles--------------------------------------------------------

const ArrowStyle = styled('span')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    top: -7,
    zIndex: 1,
    width: 12,
    right: 38,
    height: 12,
    content: "''",
    position: 'absolute',
    borderRadius: '0 0 4px 0',
    transform: 'rotate(-135deg)',
    background: theme.palette.background.paper,
    borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
    borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`
  }
}));

// ----------------------------------------------------------------------

const AccountPopover = ({ user }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {};

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar src="https://www.pngitem.com/pimgs/m/576-5768840_cartoon-man-png-avatar-transparent-png.png" />
      </IconButton>

      <Popover
        keepMounted
        getContentAnchorEl={null}
        anchorOrigin={{ horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 8,
            overflow: 'inherit',
            boxShadow: (theme) => theme.customShadows.z20,
            border: (theme) => `solid 1px ${theme.palette.grey[500_8]}`,
            width: 200,
            backgroundImage: 'none'
          }
        }}
      >
        <ArrowStyle />
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {user && user.firstName}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
            {user && user.email}
          </Typography>
        </Box>

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            fullWidth
            color="inherit"
            variant="outlined"
            onClick={handleLogout}
          >
            Salir
          </Button>
        </Box>
      </Popover>
    </>
  );
};

AccountPopover.propTypes = {
  user: PropTypes.object.isRequired
};

export default AccountPopover;
