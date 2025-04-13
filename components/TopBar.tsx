'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Box,
  Button,
  ClickAwayListener,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import RoomIcon from '@mui/icons-material/Room';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled, useTheme, Theme } from '@mui/material/styles';
import { supabase } from '@/lib/supabaseClient';
import { useFilter } from '@/context/FilterContext';
import Image from 'next/image';

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

const Dropdown = styled('div')({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  zIndex: 10,
  backgroundColor: 'white',
  border: '1px solid #ccc',
  borderRadius: '8px',
  maxHeight: '200px',
  overflowY: 'auto',
  marginTop: '4px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
});

export default function TopBar() {
  const [tags, setTags] = useState<{ id: string; name: string }[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { handleSearchFilter } = useFilter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchTags = async () => {
      const { data } = await supabase.from('tags').select('*').order('name');
      if (data) setTags(data);
    };
    fetchTags();
  }, []);

  const handleTagSelect = (tagName: string) => {
    handleSearchFilter(tagName);
    setDropdownOpen(false);
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: { xs: 1, sm: 0 },
          paddingY: { xs: 1, sm: 0 },
        }}
      >
        {/* Left group: logo + location */}
        <Box
          display="flex"
          alignItems="center"
          gap={1.5}
          sx={{
            ml: { xs: 1, sm: 4 },
            mt: { xs: 1, sm: 1 },
          }}
        >
          <IconButton edge="start" color="inherit" size={isMobile ? 'small' : 'medium'}>
            <MenuIcon fontSize={isMobile ? 'small' : 'medium'} />
          </IconButton>
          <Image src="/vectors/logo.svg" alt="logo" width={32} height={32} />
          <Box display="flex" alignItems="center">
            <RoomIcon fontSize="small" />
            <Typography
              fontWeight="bold"
              ml={0.5}
              fontSize={{ xs: '0.8rem', sm: '1rem' }}
            >
              Set Location
            </Typography>
          </Box>
        </Box>

        {/* Search input with dropdown */}
        <ClickAwayListener onClickAway={() => setDropdownOpen(false)}>
          <Box position="relative" ref={searchRef} sx={{ width: { xs: '90%', sm: 'auto', background: 'white' }, mt: { xs: 1, sm: 0 } }}>
            <Search onClick={() => setDropdownOpen(true)}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search restaurants or food" readOnly />
            </Search>

            {dropdownOpen && (
              <Dropdown>
                {tags.map((tag) => (
                  <Box
                    key={tag.id}
                    onClick={() => handleTagSelect(tag.name)}
                    sx={{
                      padding: '8px 16px',
                      cursor: 'pointer',
                      '&:hover': { backgroundColor: 'white' },
                    }}
                  >
                    {tag.name}
                  </Box>
                ))}
              </Dropdown>
            )}
          </Box>
        </ClickAwayListener>

        {/* Right group: sign in + cart */}
        <Box
          display="flex"
          alignItems="center"
          gap={1.5}
          mt={{ xs: 1, sm: 0 }}
          sx={{ flexWrap: 'wrap', justifyContent: { xs: 'center', sm: 'flex-end' } }}
        >
          <Typography fontWeight="bold" fontSize={{ xs: '0.9rem', sm: '1rem' }}>
            SIGN IN
          </Typography>
          <Button
            variant="contained"
            sx={{
              borderRadius: 20,
              backgroundColor: 'black',
              textTransform: 'none',
              paddingLeft: 2,
              paddingRight: 2,
              minHeight: '32px',
              '&:hover': { backgroundColor: '#333' },
            }}
            startIcon={<ShoppingCartIcon sx={{ fontSize: 18 }} />}
          >
            <Typography fontWeight="bold" color="white" fontSize={{ xs: '0.75rem', sm: '1rem' }}>
              CART • 0
            </Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}





// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Typography,
//   InputBase,
//   Box,
//   Button,
//   ClickAwayListener,
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import RoomIcon from '@mui/icons-material/Room';
// import SearchIcon from '@mui/icons-material/Search';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import { styled, Theme } from '@mui/material/styles';
// import { supabase } from '@/lib/supabaseClient';
// import { useFilter } from '@/context/FilterContext';
// import Image from 'next/image';

// const Search = styled('div')(({ theme }: { theme: Theme }) => ({
//   position: 'relative',
//   borderRadius: 40,
//   backgroundColor: '#f0f0f0',
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     width: '400px',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//   width: '100%',
// }));

// const Dropdown = styled('div')({
//   position: 'absolute',
//   top: '100%',
//   left: 0,
//   right: 0,
//   zIndex: 10,
//   backgroundColor: 'white',
//   border: '1px solid #ccc',
//   borderRadius: '8px',
//   maxHeight: '200px',
//   overflowY: 'auto',
//   marginTop: '4px',
//   boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
// });

// export default function TopBar() {
//   const [tags, setTags] = useState<{ id: string; name: string }[]>([]);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const searchRef = useRef<HTMLDivElement>(null);
//   const { handleSearchFilter } = useFilter();

//   useEffect(() => {
//     const fetchTags = async () => {
//       const { data } = await supabase.from('tags').select('*').order('name');
//       if (data) setTags(data);
//     };
//     fetchTags();
//   }, []);

//   const handleTagSelect = (tagName: string) => {
//     handleSearchFilter(tagName);
//     setDropdownOpen(false);
//   };

//   return (
//     <AppBar position="static" color="transparent" elevation={0}>
//       <Toolbar sx={{ justifyContent: 'space-between' }}>
//         {/* Left group: logo + location */}
//         <Box display="flex" alignItems="center" gap={2} sx={{ marginLeft: '30px', marginTop: "10px" }}>
//             <IconButton edge="start" color="inherit" >
//             <MenuIcon />
//             </IconButton>
//           <Image
//           src="/vectors/logo.svg"
//           alt="logo"
//           width={40}
//           height={40}
//           />
//           <Box display="flex" alignItems="center">
//             <RoomIcon fontSize="small" />
//             <Typography fontWeight="bold" ml={0.5}>
//               Set Location
//             </Typography>
//           </Box>
//         </Box>

//         {/* Search input with dropdown */}
//         <ClickAwayListener onClickAway={() => setDropdownOpen(false)}>
//           <Box position="relative" ref={searchRef}>
//             <Search onClick={() => setDropdownOpen(true)}>
//               <SearchIconWrapper>
//                 <SearchIcon />
//               </SearchIconWrapper>
//               <StyledInputBase placeholder="Search restaurants or food" readOnly />
//             </Search>

//             {dropdownOpen && (
//               <Dropdown>
//                 {tags.map((tag) => (
//                   <Box
//                     key={tag.id}
//                     onClick={() => handleTagSelect(tag.name)}
//                     sx={{
//                       padding: '8px 16px',
//                       cursor: 'pointer',
//                       '&:hover': { backgroundColor: '#f5f5f5' },
//                     }}
//                   >
//                     {tag.name}
//                   </Box>
//                 ))}
//               </Dropdown>
//             )}
//           </Box>
//         </ClickAwayListener>

//         {/* Right group: sign in + cart */}
//         <Box display="flex" alignItems="center" gap={2}>
//           <Typography fontWeight="bold">SIGN IN</Typography>
//           <Button
//             variant="contained"
//             sx={{
//               borderRadius: 20,
//               backgroundColor: 'black',
//               textTransform: 'none',
//               paddingLeft: 2,
//               paddingRight: 2,
//               '&:hover': { backgroundColor: '#333' },
//             }}
//             startIcon={<ShoppingCartIcon />}
//           >
//             <Typography fontWeight="bold" color="white">
//               CART • 0
//             </Typography>
//           </Button>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// }
