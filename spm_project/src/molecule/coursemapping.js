// Import All React Related files here
import * as React from 'react';
import { useState,useEffect, useCallback} from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

// Import All Router Links here

// Import All Redux ToolKit here
import {useSelector, useDispatch} from 'react-redux';
import {setTransfer} from "../reduxslice/courseSlice";
import {courseSkillTransfer} from "../reduxslice/filterskillcourseSlice";

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
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';




function Coursemapping() {
    // For some reason only works after i set the state here
    const [courseName, setCourse] = useState([])
    const [receivedskills,showSkills] = useState([])
    const [selectedSkillsToRemove, addSkillsDeleted] = useState(useSelector((state) => state.transferselectedskills.transfer))
    const dispatch = useDispatch()
    // Initalisation of the useNavigate instance
    const navigate = useNavigate();
    // Navigation to a new page to map the new skills
    function handleClick() {
        navigate("/courseskills")
        dispatch(courseSkillTransfer(receivedskills))

    }

    // Discard changings to the state as well 
    function discardChanges() {
        // discard and reset the localstate
        addSkillsDeleted([])
        // discard global state
        dispatch(setTransfer([]))
    
    }

    // Confirmation to end point to add to the database
    function confirmMapping() {
        // Get from the localstate of selectedSkillsToRemove
        // console.log(selectedSkillsToRemove)
        // Need to find a way to pass in the courseid here! Just testing this for the user story
        var url = "http://127.0.0.1:5000/course/update/COR001"
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "http://localhost:3000/mappings"
            },
            body: JSON.stringify(selectedSkillsToRemove)
        }

        fetch(url, options)
        .then(response=> response.json())
        .then(data => {
            console.log(data) 
            // RELOAD PAGE
            // Remove the localchanges and update state
            discardChanges()
            // update the localstate for skills to display on the page
            showSkills(data.data.skills)
            alert("Skill has been added successfully!")
            navigate('/mappings')
        })
        
    }
    // Function to load course from db
    useEffect(() => {
        const fetchMyAPI = async () => {
            let response = await fetch("http://127.0.0.1:5000/course/view/COR001")
            const result= await response.json()

            if (response.ok) {
                if (result.data.skills.length != 0) {
                    console.log(result.data.skills)
                    // Transfers existing course skills to the courseskills page
                    await showSkills(result.data.skills)
                    console.log("helo")
                }
                await setCourse([result.data.coursedetails.course_id,result.data.coursedetails.course_name])
            }
        }
        fetchMyAPI()
        .then(result=>{
            console.log(result)
            dispatch(courseSkillTransfer(receivedskills))
        })

    },[])
    // 2nd parameter is known as a dependency array
    


    return(
        <Container>
            {console.log(courseName)}
            {console.log("hi")}

            <Box>

                <Grid container paddingTop="5%" spacing={5}>
                    <Grid item>
                    {courseName.length > 0?
                        (
                        <Typography component="h1" variant="outline" gutterBottom>
                           {courseName[0]}: {courseName[1]}
                        </Typography>

                        ):("")}

                    </Grid>
                </Grid>
                {/* Current Mapped Skills Table */}
                <Grid container spacing={8}>
                    <Grid item xs={12}>

                        {/* First table for current mapped skills */}
                        <TableContainer component={Paper}>
                        <Typography component='h1' variant="overline" color="success.main" align="left" gutterBottom sx={{p:2, fontWeight: 'bold'}}>
                            Current Mapped Skills
                        </Typography>
                            <Table stickyheader size="small" sx={{
                            backgroundColor: "white",
                            borderRadius: '16px',
                            
                        }}>
                                <TableHead>
                                <TableRow textAlign="center">
                                    <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Skill Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Skill Status</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                        {typeof receivedskills == 'object'? (receivedskills.map((singleoutput) => (
                                    <TableRow>
                                    <TableCell>{singleoutput.skill_id}</TableCell>
                                    <TableCell>{singleoutput.skill_name}</TableCell>
                                    <TableCell>{singleoutput.skill_desc}</TableCell>
                                    <TableCell>{singleoutput.skill_status}</TableCell>

                                    </TableRow>
                                    ))):(
                                        <TableRow textAlign='center'>

                                        <TableCell align="center" colSpan={3}>
                                        "You do not have any mappings"
                                        </TableCell>
                                        </TableRow>

                                        )}

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>

                {/* */}
                <Grid container paddingTop="10%" spacing={8}>
                    <Grid item xs={12}>
                        {/* 2nd table for selected mappings, perhaps can put it as a component? */}
                        <TableContainer component={Paper}>
                            <Typography component='h1' variant="overline" color="warning.main" align="left" gutterBottom sx={{p:2, fontWeight: 'bold'}}>
                                Selected Mappings
                            </Typography>
                            <Table stickyheader size="small" sx={{
                            backgroundColor: "white",
                            borderRadius: '16px',
                            
                        }}>
                                <TableHead>
                                <TableRow textAlign="center">
                                    <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Skill Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                        {/* Usage of ternary operators to dynamically render*/}
                                        {selectedSkillsToRemove.length > 0? 
                                        (
                                        selectedSkillsToRemove.map((singleoutput,index) => (
                                        <TableRow>
                                            <TableCell >{singleoutput.skill_id}</TableCell>
                                            <TableCell >{singleoutput.skill_name}</TableCell>
                                            <TableCell>{singleoutput.skill_desc}</TableCell>
                                        </TableRow>
                                        ))
                                        ):('')}

                                </TableBody>
                            </Table>
                        </TableContainer>
                        {selectedSkillsToRemove.length != 0? 
                                    (
                                        <Grid container >
                                            <Grid item spacing={3} xs={12} align='center'>
                                            <Button variant="contained" onClick={confirmMapping}>Confirm Mapping</Button>

                                            <Button variant="contained" onClick={discardChanges}>Discard all mapping</Button>

                                            </Grid>
                                        </Grid>
                                        
                                    ):(
                                        <IconButton color="info" onClick={handleClick} sx={{p:2}}><AddCircleIcon/></IconButton>
                                    )} 
                    </Grid>
                </Grid>
            </Box>




        </Container>
    )



}

export default Coursemapping;