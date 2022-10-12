// create Table Skill
// (
//     Skill_ID int not null,
//     Skill_Name varchar(50) not null,
//     Skill_Desc varchar(250) not null,
//     Skills_Status int not null,
//     CONSTRAINT  primary key (Skill_ID)

// )ENGINE=InnoDB DEFAULT CHARSET=utf8;


// Import All React Related files here
import * as React from 'react';
import { useState,useEffect, useCallback } from 'react';

// Import All Router Links here

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


function Hraddskill() {

    const [skill_name, setskill_name] = useState("")
    const [skill_desc, setskill_desc] = useState("")
    const [active, setactive] = useState("Active")

    // Function 1 to change the skill name
    const handleskill_name = (event) => {
        setskill_name(event.target.value)
    }

    // Function 2 to change the skill description 
    const handleskill_desc = (event) => {
        setskill_desc(event.target.value)
    }

    // Function 3 to toggle the active button: 
    const handleactive = (event) => {
        if (active == "Active") {
            setactive("Retired")
        }
        if (active == "Retired") {
            setactive("Active")
        }
    }

    // Function 3 to send a request to database for addition of skill
    // Function 3 to include validation of inputs. 

    const addskill_database = () => {
        if (skill_name.length == 0 || skill_name.length > 50 || skill_desc.length== 0 || skill_desc.length > 250) {
            alert("Please check the input fields again.")
        }
        else {
            let activity = 1
            if (active == "Active") {const activity = 1}
            else {const activity = 0}
            const result = {"skill_name": skill_name, "skill_desc": skill_desc, "active": activity}
            const options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "http://localhost:3000/Hraddskill"
                },
                body: JSON.stringify(result)
            }

            fetch('http://127.0.0.1:5000/skill/hraddskills/')
            .then(response=> response.json())
            .then(data => {

            })

        }
    }



    return (
        <Container>
            <Box marginTop="5%">

                <Grid container spacing={1}>
                    <Grid item xs={6} alignContent="left">
                        <Typography variant="h6" textAlign="left">
                            Create a New Skill
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
                            <TextField fullWidth label="Skill Name" helperText="Skill name has to be less than 50 characters." onChange={handleskill_name}/>
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>

                    {/* one Text Field Away */}

                    <Grid container marginTop="25px">
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8} justifyContent="flex-start">
                            <TextField fullWidth label="Skills Description" id="fullWidth" helperText="Skill Description has to be less than 250 characters."
                                    onChange={handleskill_desc}
                            />
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>

                    {/* one Text Field Away */}

                    <Grid container marginTop="25px">
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8} justifyContent="flex-start">
                            <FormGroup>
                                <FormControlLabel control={<Switch defaultChecked />} label={`Skill Status: ` + active} onClick={handleactive}/>
                            </FormGroup>
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>

                    <Grid container marginTop="25px">
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8} justifyContent="flex-start">
                            <Button variant="contained" color="success">
                                Create a Skill
                            </Button>
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
               </Grid>

            </Box>
        </Container>
    );
  }
  
  export default Hraddskill;