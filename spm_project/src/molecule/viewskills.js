// Import All React Related files here
import * as React from 'react';
import { useState,useEffect } from 'react';
// import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
// import {setskill_ids} from '../reduxslice/jobrolesSlice'
import { setjobrole_desc, setjobrole_id, setjobrole_name, setskill_ids} from '../reduxslice/jobrolesSlice'


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
import AddCircle from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';

function Viewskills() {

    const dispatch = useDispatch()
    
    // const location = useLocation();
    // const data = location.state
    // let jobroleID = data.jobrole_id
    // let jobroleName = data.jobrole_name
    // console.log(jobroleID , 'from use navigate')

    // let jobroleName = data.jobrole_name
    // let jobroleName = JSON.stringify(data.jobrole_name)
    // let jobroleDesc = JSON.stringify(data.jobrole_desc)

    const [jobroletoskill, setJobroletoskill] = useState([]);
    const [jobRoleId, setjobRoleId] = useState('')
    const [jobRoleObject, setjobRoleObject] = useState('')
    const [Skills, setSkills] = useState('') //this will be list of skills

    let jobRoles_desc = useSelector((state) => state.jobrole.jobrole_desc)
    let jobRoles_id = useSelector((state) => state.jobrole.jobrole_id)
    let jobRoles_name = useSelector((state) => state.jobrole.jobrole_name)
    // let skill_ids = useSelector((state) => state.jobrole.skill_ids)

    console.log(jobRoles_desc, 'from redux')
    console.log(jobRoles_id, 'from redux')
    console.log(jobRoles_name, 'from redux')


    useEffect(() => {
        const LoadJobtoSkills = async () => {
            // let response = await fetch("http://127.0.0.1:5000/jobrole/jobroleroute")
            // let response = await fetch("http://127.0.0.1:5000/jobrole/view/jobrolesmapped")

            let jobroleID = jobRoles_id
            var url = `http://127.0.0.1:5000/jobrole/Viewskills/${jobroleID}`
            let response = await fetch(url)
            response = await response.json()
            console.log(response)
            console.log(typeof response)
            // setJobroletoskill(response.data['jobroledetails']) 
            setJobroletoskill(response.data) 
            // setSkills(jobroletoskill.skills)
            // setJobroletoskill(response) //this is a list of objects 
            // setLength(jobroletoskill['jobroledetails'].length)
        }
        LoadJobtoSkills();

        // for(var i =0; i<jobroletoskill.length; i++){
        //     console.log(jobroletoskill[i])
        //     if (jobroletoskill[i].jobrole_id === jobroleID){
        //         console.log(jobroletoskill[i].jobrole_id)
        //         setjobRoleId(jobroletoskill[i].jobrole_id)
        //         dispatch(setskill_ids(jobroletoskill[i].jobrole_id))
        //         setjobRoleObject(jobroletoskill[i])
        //     }
        // };

    }, []) 

    console.log(jobroletoskill.skills)
    console.log(typeof jobroletoskill)

    let navigate = useNavigate()

    const redirect = (data) => {
        navigate("/learningjourney")
      }

    console.log(jobRoleId)
    console.log(jobRoleObject)
    
    const redirect_skill = () => {

        setSkills(jobroletoskill.skills)
        dispatch(setjobrole_desc(jobRoles_desc))
        dispatch(setjobrole_id(jobRoles_id))
        dispatch(setjobrole_name(jobRoles_name))
        dispatch(setskill_ids(Skills))
        navigate("/user")

    }

    const redirect = () => {
        navigate("/learningjourney")

    }

    // if(jobroletoskill.jobrole?.jobrole_id === jobroleID) {
    // if(jobRoleId === jobroleID) {
    return (
        // <div>
        //     this is the correct skill
        // </div> 
            <Container>
                <Box marginTop="5%">
                <Grid container spacing={1}>
                    <Grid item xs={6} alignContent="left">
                    <Typography variant="h6" textAlign="left">
                        {/* Skills for {jobroleName} */}
                        Skills for {jobRoles_name}
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
                            <TableCell>Add Skill</TableCell>
                            </TableRow>
                        </TableHead>
                        {/* The body of the Table Goes here */}
                        <TableBody>
                            {jobroletoskill.skills?.map((singleoutput) => (
                            <TableRow>
                            <TableCell>{singleoutput['skill_id']}</TableCell>
                            <TableCell>{singleoutput['skill_name']}</TableCell>
                            <TableCell>{singleoutput['skill_desc']}</TableCell>
                            <TableCell>{singleoutput['skill_status']}</TableCell>
                            <TableCell>
                                <IconButton color="primary" onClick={()=> redirect_skill()}><AddCircle/></IconButton>
                            </TableCell> 
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
                            {/* <button onClick={() => redirect()}>Back to Home</button> */}
                            <Button variant="contained"  onClick={() => redirect()}>
                                    Back to Home
                            </Button>
                        </div>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>

                </Box>

            </Container>
    );
    // } 
    // else{
    //     return(
    //         <div>

    //             <b>No skills attached to role. HR to update in the near future</b>
            
    //         </div>
    //     );
    // }
}

export default Viewskills;