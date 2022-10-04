// Import All React Related files here
import * as React from 'react';
import {NavLink,BrowserRouter} from 'react-router-dom';


// Import All Router Links here
import { useState,useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Import All Redux ToolKit here

// Import all the molecules files here

// Import ALL material UI things here
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Grid from '@mui/material/Grid';


function Home() {
  // Check if have logged in
  // Retrieving the session stored:
  const staff_id = useSelector((state) => state.session.staff_id)
  const staff_fname = useSelector((state) => state.session.staff_fname)
  const staff_lname = useSelector((state) => state.session.staff_lname)
  const dept = useSelector((state) => state.session.dept)
  const email = useSelector((state) => state.session.email)
  const role_id = useSelector((state) => state.session.role_id)
  const role_name = useSelector((state) => state.session.rolename)


  if (staff_id != "") {
  return (
    
      <Grid container spacing={2}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
            Welcome back {staff_fname}, you are a {role_name}.
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    
  );
  }

  else {
    return (
      <div>
        Please log in.
      </div>
    )
  }
}

export default Home;
