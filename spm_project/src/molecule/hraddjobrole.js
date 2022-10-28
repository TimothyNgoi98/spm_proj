// Import All React Related files here
import * as React from 'react';
import { useState,useEffect, useCallback } from 'react';

// Import All Router Links here
import {useNavigate} from 'react-router-dom';
// Import All Redux ToolKit here

// Import all the molecules files here

// Import ALL material UI things here
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


function Hraddjobrole() {

    const [role_name, setrole_name] = useState("")
    const [role_dept, setrole_dept] = useState("")
    const [role_desc, setrole_desc] = useState("")
    const [active, setactive] = useState("Active")

    let navigate = useNavigate();


    // Function 1 to change the role name
    const handlerole_dept = (event) => {
        setrole_dept(event.target.value)
    }

    // Function 2 to change the role dept
    const handlerole_name = (event) => {
        setrole_name(event.target.value)
    }

    // Function 3 to change the skill description 
    const handlerole_desc = (event) => {
        setrole_desc(event.target.value)
    }

    // Function 4 to toggle the active button: 
    const handleactive = (event) => {
        if (active === "Active") {
            setactive("Retired")
        }
        if (active === "Retired") {
            setactive("Active")
        }
    }

    // Function 4 to send a request to database for addition of skill
    // Include validation of inputs. 

    const addrole_database = () => {
        if (role_name.length === 0 || role_name.length > 30 || role_dept.length === 0 || role_dept.length > 20 || role_desc.length === 0 || role_desc.length > 500) {
            alert("Please check the input fields again.")
        }
        else {

            const result = {"role_name": role_name, "role_dept": role_dept, "role_desc": role_desc, "Active": active}
            const options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "http://localhost:3000/Hraddjobrole"
                },
                body: JSON.stringify(result)
            }
            console.log(options)
            console.log(result)

            fetch('http://127.0.0.1:5000/jobrole/hraddjobrole', options)
            .then(response=> response.json())
            .then(data => {
                alert(data.message)
                if (data.code === 200){
                    navigate("/Hrjobrole", {replace: true})
                }
            })


        }
    }



    return (
        <Container>
            <Box marginTop="5%">

                <Grid container spacing={1}>
                    <Grid item xs={6} alignContent="left">
                        <Typography variant="h6" textAlign="left">
                            Create a New Role
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        {/* this to stay empty  */}
                    </Grid>
                </Grid>
                
                <Grid container spacing = {2} direction='column' marginTop="5%">
                    <Grid container>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8} justifyContent="flex-start">
                            <TextField fullWidth label="Role Name" helperText="Role name has to be less than 30 characters." onChange={handlerole_name}/>
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>

                    {/* one Text Field Away */}

                    <Grid container marginTop="25px">
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8} justifyContent="flex-start">
                            <TextField fullWidth label="Department" helperText="Department name has to be less than 20 characters." onChange={handlerole_dept}/>
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                    
                    {/* one Text Field Away */}

                    <Grid container marginTop="25px">
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8} justifyContent="flex-start">
                            <TextField multiline fullWidth label="Role Description" id="fullWidth" helperText="Role Description has to be less than 500 characters."
                                    onChange={handlerole_desc}
                            />
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>

                    {/* one Text Field Away */}

                    <Grid container marginTop="25px">
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8} justifyContent="flex-start">
                            <FormGroup>
                                <FormControlLabel control={<Switch defaultChecked />} label={`Role Status: ` + active} onClick={handleactive}/>
                            </FormGroup>
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>

                    <Grid container marginTop="25px">
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8} justifyContent="flex-start">
                            <Button variant="contained" color="success" onClick={addrole_database}>
                                Create a Role
                            </Button>
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
            </Grid>

            </Box>
        </Container>
    );
} 

export default Hraddjobrole;