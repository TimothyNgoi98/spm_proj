// Import All React Related files here
import * as React from 'react';
import { useState,useEffect } from 'react';
import axios from "axios";
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

// Import All Router Links here

import {useLocation} from 'react-router-dom';

// Import All Redux ToolKit here

// Import all the molecules files here

// Import ALL material UI things here
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function Viewskills() {

    
    const location = useLocation();
    const data = location.state
    let jobroleID = data.jobrole_id
    let jobroleName = data.jobrole_name
    console.log(jobroleID)
    // let jobroleName = data.jobrole_name
    // let jobroleName = JSON.stringify(data.jobrole_name)
    // let jobroleDesc = JSON.stringify(data.jobrole_desc)

    const jobroles_desc = useSelector((state) => state.jobrole.jobrole_desc)
    const jobroles_id = useSelector((state) => state.jobrole.jobrole_id)
    const jobroles_name = useSelector((state) => state.jobrole.jobrole_name)

    const [jobroletoskill, setJobroletoskill] = useState([]);

    // for CORS
    // const result = {'desc' : jobroles_desc, 'id': jobroles_id, 'name': jobroles_name }

    // const options = {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         "Access-Control-Allow-Origin": "http://localhost:3000/Viewskills"
    //     },
    //     body: JSON.stringify(result)
    // }

    useEffect(() => {
    const LoadJobtoSkills = async () => {
        let response = await fetch("http://127.0.0.1:5000/jobrole/jobroleroute")
        // const response = await axios.get("http://127.0.0.1:5000/jobrole/jobroleroute" + options);
        response = await response.json()
        console.log(response)
        console.log(typeof response)
        // setJobroletoskill(response.data)
        setJobroletoskill(response)
      }
      LoadJobtoSkills();
    },[]) 


    console.log(jobroles_id)
    // console.log(typeof jobroletoskill.jobrole.jobrole_id)
    let navigate = useNavigate()
    const redirect = (data) => {
        navigate("/learningjourney")
      }

    // console.log(JSON.stringify(jobroletoskill.jobrole.jobrole_id))
    // const job_to_skill = JSON.stringify(jobroletoskill)
    // console.log(jobroletoskill.jobrole.jobrole_id)
    // console.log(jobroletoskill.jobrole.jobrole_name)
    // console.log(jobroletoskill.jobrole.jobrole_desc)
    // console.log(jobroletoskill.skillassociated[1])
    // console.log(jobroletoskill.skillassociated[0])
    // console.log(parseInt(jobroleID) === parseInt(jobroletoskill.jobrole.jobrole_id))
    // console.log(jobroleID === jobroletoskill.jobrole.jobrole_id)

    if(jobroletoskill.jobrole?.jobrole_id === jobroleID) {
    // if(parseInt(jobroles_id) === parseInt(jobroletoskill.jobrole.jobrole_id)) {

    return (
        // <div>
        //     this is the correct skill
        // </div> 
            <Container>
                <Box marginTop="5%">
                <Grid container spacing={1}>
                    <Grid item xs={6} alignContent="left">
                    <Typography variant="h6" textAlign="left">
                        Skills for {jobroleName}
                    </Typography>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                            <TableCell>Skill Id</TableCell>
                            <TableCell>Skill Name</TableCell>
                            <TableCell>Skill Description</TableCell>
                            <TableCell>Skill Status</TableCell>
                            </TableRow>
                        </TableHead>
                        {/* The body of the Table Goes here */}
                        <TableBody>
                            {jobroletoskill.skillassociated?.map((singleoutput) => (
                            <TableRow>
                            <TableCell>{singleoutput.skill_id}</TableCell>
                            <TableCell>{singleoutput.skill_name}</TableCell>
                            <TableCell>{singleoutput.skill_desc}</TableCell>
                            <TableCell>{singleoutput.skills_status}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                    </Grid>
                </Grid>

                <Grid container spacing={1}>
                    <Grid item xs={6} alignContent="center">
                        <div>
                            <button onClick={() => redirect()}>Back to Home</button>
                        </div>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>

                </Box>

            </Container>
    );
    } 
    else{
        return(
            <div>

                <b>No skills attached to role. HR to update in the near future</b>
            
            </div>
        );
    }


    // return (
    //     <div>
    //         To check if the data was passed correctly from rolecard.js
    //         <p>{JSON.stringify(jobroletoskill)}</p>
    //         <p>{jobroles_desc}</p>
    //         <p>{jobroles_id}</p>
    //         <p>{jobroles_name}</p>

    //     </div>
    // );

}

export default Viewskills;