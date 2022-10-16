// Import All React Related files here
import * as React from 'react';
import { useState,useEffect, useCallback} from 'react';
import { useNavigate} from 'react-router-dom';

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





function Coursemapping() {
    // For some reason only works after i set the state here
    const [courseName, setCourse] = useState([])
    const [receivedskills,showSkills] = useState([])
    const [selectedSkillsToRemove, addSkillsDeleted] = useState(useSelector((state) => state.transferselectedskills.transfer))
    const dispatch = useDispatch()
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

    function discardChanges() {
        // discard and reset the localstate
        addSkillsDeleted([])
        // discard global state
        dispatch(setTransfer([]))
        


        
    }

    function deleteToBeMapped() {

    }

    return(
        <Container>
            {console.log(selectedSkillsToRemove)}
            <Box>

                <Grid container paddingTop="5%" spacing={5}>
                    <Grid item>
                        <Typography component="h1" variant="outline" gutterBottom>
                            Course selected: {courseName}
                        </Typography>
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
                                            <Button variant="contained" onClick={handleClick}>Confirm Mapping</Button>

                                            <Button variant="contained" onClick={discardChanges}>Discard all mapping</Button>

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