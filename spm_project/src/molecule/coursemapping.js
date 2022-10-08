// Import All React Related files here
import * as React from 'react';
import { useState,useEffect, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';


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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useSelector} from 'react-redux';




function Coursemapping() {
    // Receivedskills from courseskills page
    const transferred_skill_courseskills = useSelector((state) => state.transfer.transfer)

    // Initalisation of the useNavigate instance
    const navigate = useNavigate();
    // Function to load course from db
    function loadCourse() {
        // simulate a course is being clicked 
        fetch("http://127.0.0.1:5000/course/view/1")
        .then((response)=>response.json())
        .then((result) => {
            // Get the skills and put it in a relevant state
            // console.log(result)
            // Array object
            console.log(result.data.skills.length)
            if (result.data.skills.length != 0) {
                showSkills(result.data.skills)
            }
            setCourse(result.data.coursedetails.course_name)
        })
    }

    // For some reason only works after i set the state here
    const [courseName, setCourse] = useState('sdf')
    const [receivedskills,showSkills] = useState("")

    useEffect(() => {
        loadCourse()
    },[])
    // 2nd parameter is known as a dependency array

    // Navigation to a new page to map the new skills
    function handleClick() {
        navigate("/courseskills")
    }

    return(
        <Container>
            <Box marginTop="5%">
                <Grid container className="header-course-mapping">
                    <Grid item xs={12}>
                        <Typography
                        component="h1"
                        variant="h2"
                        color="text.primary"
                        gutterBottom
                        >
                        Course mapping page
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container paddingTop="5%" spacing={5}>
                    <Grid item>
                        <Typography component="h2" variant="h6" color="secondary" gutterBottom>
                            Course selected: {courseName}
                        </Typography>
                    </Grid>
                </Grid>
                {/* Current Mapped Skills Table */}
                <Grid container marginTop="5%" spacing={8}>
                    <Grid item xs={12}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Current Mapped Skills
                        </Typography>
                            <Table size="small">
                                <TableHead>
                                <TableRow textAlign="center">
                                    <TableCell align="center">Skill Name</TableCell>
                                    <TableCell align="center">Description</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow textAlign='center'>
                                        {typeof receivedskills == 'object'? (receivedskills.map((singleoutput) => (
                                    <TableRow>
                                    <TableCell>{singleoutput.skill_id}</TableCell>
                                    <TableCell>{singleoutput.skill_name}</TableCell>
                                    <TableCell>{singleoutput.skill_desc}</TableCell>
                                    <TableCell>{singleoutput.skills_status}</TableCell>
                                    </TableRow>
                                    ))):(
                                        <TableCell align="center" colSpan={3}>
                                        "You do not have any mappings"
                                        </TableCell>)}
                                    </TableRow>
                                </TableBody>
                            </Table>
                    </Grid>
                </Grid>

                {/* */}
                <Grid container paddingTop="10%" spacing={8}>
                    <Grid item xs={12}>
                        <Typography component="h2" variant="h6" color="primary" gutterbottom>
                            Skills selected
                        </Typography>
                        <Table size="small">
                            <TableHead>
                            <TableRow textAlign="center">
                                <TableCell >Skill Name</TableCell>
                                <TableCell>Description</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                    {/* Usage of ternary operators to dynamically render*/}
                                    {typeof transferred_skill_courseskills== 'object'? 
                                    (
                                    transferred_skill_courseskills.map((singleoutput) => (
                                    <TableRow>
                                        <TableCell >{singleoutput.skill_name}</TableCell>
                                        <TableCell>{singleoutput.skill_desc}</TableCell>
                                    </TableRow>
                                    ))
                                    ):('')}

                            </TableBody>
                        </Table>
                        {transferred_skill_courseskills.length != 0? 
                                    (
                                        <Grid container >
                                            <Grid item spacing={3} xs={12} align='center'>
                                            <Button variant="contained" onClick={handleClick}>Confirm Mapping</Button>

                                            <Button variant="contained" onClick={handleClick}>Remove all mapping</Button>

                                            </Grid>
                                        </Grid>
                                        
                                    ):(
                                            <Button variant="contained" onClick={handleClick}>Add a new mapping</Button>
                                    )} 
                    </Grid>
                </Grid>
            </Box>




        </Container>
    )



}

export default Coursemapping;