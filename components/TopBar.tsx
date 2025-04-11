'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Box,
  Button,
//   Badge,
//   Paper,
//   alpha
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import RoomIcon from '@mui/icons-material/Room';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled, Theme } from '@mui/material/styles';

const Search = styled('div')(({ theme }: { theme: Theme }) => ({
  position: 'relative',
  borderRadius: 40,
  backgroundColor: '#f0f0f0',
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '400px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  width: '100%',
}));

export default function TopBar() {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton edge="start" color="inherit">
            <MenuIcon />
          </IconButton>
          
          {/* brand logo */}
          <Box
            sx={{
              width: 40,
              height: 40,
              backgroundColor: 'red',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box width={14} height={14} bgcolor="white" borderRadius="50%" />
          </Box>
          <Box display="flex" alignItems="center">
            <RoomIcon fontSize="small" />
            <Typography fontWeight="bold" ml={0.5}>
              Set Location
            </Typography>
          </Box>
        </Box>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search restaurants or food" />
        </Search>

        <Box display="flex" alignItems="center" gap={2}>
          <Typography fontWeight="bold">SIGN IN</Typography>
          <Button
            variant="contained"
            sx={{
              borderRadius: 20,
              backgroundColor: 'black',
              textTransform: 'none',
              paddingLeft: 2,
              paddingRight: 2,
              '&:hover': { backgroundColor: '#333' },
            }}
            startIcon={<ShoppingCartIcon />}
          >
            <Typography fontWeight="bold" color="white">
              CART • 0
            </Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
