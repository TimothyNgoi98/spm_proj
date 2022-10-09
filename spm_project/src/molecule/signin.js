// Import All React Related files here
import * as React from 'react';
import { useState,useEffect } from 'react';


// Import All Router Links here
import {useNavigate} from 'react-router-dom';

// Import All Redux ToolKit here
import { useSelector, useDispatch } from 'react-redux';
import { setstaffid, setstafffname, setstafflname, setdept, setemail, setroleid, setrolename} from '../reduxslice/sessionSlice'

// Import all the molecules files here

// Import ALL material UI things here
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';


function Signin() {
    
    // Initialize useNavigate and Dispatch 
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, setlogin] = useState("");

    const handleusername = (event) => {
        setlogin(event.target.value)
    }

    const loginbutton = () => {
        const result = {"login": login}
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "http://localhost:3000/signin"
                
            },
            body: JSON.stringify(result)
        }

        fetch("http://127.0.0.1:5000/api/signin/" + login, options)
        .then(response=> response.json())
        .then(data => {
            console.log(data)
            if (data.code == 200) {
                alert("Login Successful!")

                // Data Testing
                console.log(data.data.staff_id)
                console.log(data.data.staff_fname)
                console.log(data.data.staff_lname)
                console.log(data.data.dept)
                console.log(data.data.email)
                console.log(data.data.role)
                console.log(data.role)
                // End of Data Testing. 

                // Store it in Global State 
                dispatch(setstaffid(data.data.staff_id))
                dispatch(setstafffname(data.data.staff_fname))
                dispatch(setstafflname(data.data.staff_lname))
                dispatch(setdept(data.data.dept))
                dispatch(setemail(data.data.email))
                dispatch(setroleid(data.data.role))
                dispatch(setrolename(data.role))
                // End of Storing in Global State.

                // Route them to Nav View
                navigate("/", {replace: true})
            }
        })
        .catch(err => {
            if(err.name === "AbortError"){
                console.log('fetch aborted')
                alert(err)
            }
            else {
                console.log(err)
                alert(err)
            }
        })
        

    }

    return (
        <Grid container marginTop="5%">
            
            <Grid item xs={12}>
                <Typography variant="h6">Log in to your User Account</Typography>
                <TextField sx={{marginTop:"30px"}} id="outlined-basic" label="Staff ID" variant="outlined" onChange={handleusername}/>
            </Grid>
            <Grid item xs={12} marginTop={"15px"}>
                <Button variant="contained" endIcon={<LoginIcon/>} onClick={loginbutton}>Login</Button>
            </Grid>

        </Grid>
  );
}

export default Signin;