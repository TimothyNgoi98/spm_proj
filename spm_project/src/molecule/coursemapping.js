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
import { useSelector, useDispatch } from 'react-redux';
import {courseSkillTransfer} from "../reduxslice/filterskillcourseSlice";



function Coursemapping() {
    // For some reason only works after i set the state here
    const [courseName, setCourse] = useState('sdf')
    const [existingSkills,showSkills] = useState("asd")

    // Dispatch course existing skills into the coursemapping page (We don't want to show existing skills)
    const dispatch = useDispatch();
    // Receivedskills from courseskills page
    const transferred_skill_courseskills = useSelector((state) => state.transfer.transfer)
    // Initalisation of the useNavigate instance
    const navigate = useNavigate();
    // Function to load course from db
    async function loadCourse() {
        // simulate a course is being clicked 
        const response = await fetch("http://127.0.0.1:5000/course/view/COR001")
        const result= await response.json()

        if (response.ok) {
            if (result.data.skills.length != 0) {
                console.log(result.data.skills)
                // Transfers existing course skills to the courseskills page
            }
            
            showSkills(result.data.skills)
            console.log(existingSkills)
            dispatch(courseSkillTransfer(existingSkills))
            setCourse(result.data.coursedetails.course_name)
        }
        // .then((response)=>response.json())
        // .then((result) => {
        //     // Get the skills and put it in a relevant state
        //     // console.log(result)
        //     // Array object
        //     console.log(result.data.skills.length)
        // },[])
    }
    useEffect(() => {
        const fetchMyAPI = async () => {
            let response = await fetch("http://127.0.0.1:5000/course/view/COR001")
            const result= await response.json()

            if (response.ok) {
                if (result.data.skills.length != 0) {
                    console.log(result.data.skills)
                    // Transfers existing course skills to the courseskills page
                    await showSkills(result.data.skills)
                    await setCourse(result.data.coursedetails.course_name)
                }
            }
        }
        fetchMyAPI()
        .then(result=>{
            dispatch(courseSkillTransfer(existingSkills))
        })

    },[])
    // 2nd parameter is known as a dependency array
    
    // Navigation to a new page to map the new skills
    function handleClick() {
        navigate("/courseskills")
        dispatch(courseSkillTransfer(existingSkills))

    }

    return(
        <Container>
            {console.log(existingSkills)}
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
                                        {typeof existingSkills == 'object'? (existingSkills.map((singleoutput) => (
                                    <TableRow textAlign="center">
                                    <TableCell align="center">{singleoutput.skill_name}</TableCell>
                                    <TableCell align="center">{singleoutput.skill_desc}</TableCell>
                                    </TableRow>
                                    ))):(
                                        <TableCell align="center" colSpan={3}>
                                        "You do not have any mappings"
                                        </TableCell>)}
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