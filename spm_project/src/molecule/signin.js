// Import All React Related files here
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState,useEffect } from 'react';


// Import All Router Links here

// Import All Redux ToolKit here

// Import all the molecules files here

// Import ALL material UI things here
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';


function Signin() {

    const [login, setlogin] = useState("");

    const handleusername = (event) => {
        setlogin(event.target.value)
    }


    const loginbutton = () => {
        // const result = {"login": username, "password": userpassword}

    }

    return (
        <Grid container marginTop={"25px"}>

            <Grid item xs={12}>
                <Typography variant="h6">Log in to your User Account</Typography>
                <TextField sx={{marginTop:"30px"}} id="outlined-basic" label="Staff ID" variant="outlined" onChange={handleusername}/>
            </Grid>
            <Grid item xs={12} marginTop={"15px"}>
                <Button variant="contained" endIcon={<LoginIcon/>}>Login</Button>
            </Grid>

        </Grid>
  );
}

export default Signin;