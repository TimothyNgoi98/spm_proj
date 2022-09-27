// Import All React Related files here
import * as React from 'react';
import {NavLink,BrowserRouter} from 'react-router-dom';


// Import All Router Links here

// Import All Redux ToolKit here

// Import all the molecules files here

// Import ALL material UI things here
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LockOpenIcon from '@mui/icons-material/LockOpen';

function Home() {


  return (
    <div>
        <Box>
          <Typography variant="h5" sx={{marginTop:"25px"}}>Learning Journey Planning System</Typography>
          <Typography variant="body1" sx={{marginTop:"30px"}} >Please login to a User Account.</Typography>
          <Button variant="contained" endIcon={<LockOpenIcon />} sx={{marginTop:"10px"}}>
            <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/signin"> Log in </NavLink>
          </Button>
        </Box>
    </div>
  );
}

export default Home;
