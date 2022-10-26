// Import All React Related files here
import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Import All Router Links here

// Import All Redux ToolKit here
import { useSelector, useDispatch } from 'react-redux';
import { setTransfer } from "../reduxslice/courseSlice";
import { courseSkillTransfer } from "../reduxslice/filterskillcourseSlice";

// Import all the molecules files here

// Import ALL material UI things here
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function Confirmjobrolemapping() {
    const [selectedSkillsToRemove, addSkillsDeleted] = useState(useSelector((state) => state.jobroleskill.roleskilldetails))
    const dispatch = useDispatch()
    // Initalisation of the useNavigate instance
    const navigate = useNavigate();
    // Navigation to a new page to map the new skills
    // console.log(selectedSkillsToRemove, "SKILLS TO REMOVEEEEEEEEE")

    var selectedSkills = []
    for (var i = 1; i < selectedSkillsToRemove.length; i++) {
        selectedSkills.push(selectedSkillsToRemove[i])
    }

    function discardChanges() {
        // discard and reset the localstate
        addSkillsDeleted([])
        // discard global state
        dispatch(setTransfer([]))

    }
    // function handleClick() {
    //     navigate("/selectcourse")
    //     // navigate("/courseskills")
    //     dispatch(courseSkillTransfer(receivedskills))
    // }

    function confirmMapping() {
        // Get from the localstate of selectedSkillsToRemove
        console.log(selectedSkillsToRemove, "skills to remove")
        // Need to find a way to pass in the courseid here! Just testing this for the user story
        let selectedSkills = []
        for (var i = 1; i < selectedSkillsToRemove.length; i++) {
            selectedSkills.push(selectedSkillsToRemove[i])
        }
        let jobroleId = selectedSkillsToRemove[0]['jobrole_id'];
        console.log(selectedSkills, "should have no course details");
        // var url = "http://127.0.0.1:5000/course/update/COR001"
        var url = `http://127.0.0.1:5000/jobrole/update/${jobroleId}`
        console.log(url, "URL FOR CFM MAPPING")
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedSkills)
        }

        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                // RELOAD PAGE
                // Remove the localchanges and update state
                discardChanges()
                // update the localstate for skills to display on the page
                console.log("FUCK SKILLS")
                console.log(data, "DATAAAAAA")
                console.log(data.data, "FUCKING DATA")
                console.log(data.data.skills, "DATA DATA SKILLS")
                // showSkills(data.data.skills)
                alert("Skill has been added successfully!")
                navigate('/mappings')
            })
    }


    return (
        <Grid container paddingTop="3%" spacing={8}>
            <Grid item xs = {12}>
                <Typography component = 'h1' color = "info.main" align="center" sx={{p:2, fontWeight: 'bold'}}>
                  You are currently mapping these skills:
                </Typography>
              </Grid>
            <Grid item xs={12}>
                {/* 2nd table for selected mappings, perhaps can put it as a component? */}
                <TableContainer component={Paper}>
                    <Typography component='h1' variant="overline" color="warning.main" align="left" gutterBottom sx={{ p: 2, fontWeight: 'bold' }}>
                        Selected Mappings
                    </Typography>
                    <Table stickyheader size="small" sx={{
                        backgroundColor: "white",
                        borderRadius: '16px',
                    }}>
                        <TableHead>
                            <TableRow textAlign="center">
                                <TableCell sx={{ fontWeight: 'bold' }}>Job Role ID</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Job Role Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Skill ID</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Skill Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* Usage of ternary operators to dynamically render */}
                            {selectedSkills.length > 0 ?
                                (
                                    selectedSkills.map((singleoutput, index) => (
                                        <TableRow>
                                            <TableCell >{selectedSkillsToRemove[0]['jobrole_id']}</TableCell>
                                            <TableCell >{selectedSkillsToRemove[0]['jobrole_name']}</TableCell>
                                            <TableCell >{singleoutput.skill_id}</TableCell>
                                            <TableCell >{singleoutput.skill_name}</TableCell>
                                            <TableCell>{singleoutput.skill_desc}</TableCell>
                                        </TableRow>
                                    ))
                                ) : ('')}
                        </TableBody>
                    </Table>
                </TableContainer>
                {selectedSkillsToRemove.length != 0 ?
                    (
                        <Grid container >
                            <Grid item spacing={3} xs={12} align='center'>
                                <Button variant="contained" onClick={confirmMapping}>Confirm Mapping</Button>
                                <Button variant="contained" onClick={discardChanges}>Discard all mapping</Button>

                            </Grid>
                        </Grid>

                    ) : (
                        <Grid>yo</Grid>
                        // <IconButton color="info" onClick={handleClick} sx={{ p: 2 }}><AddCircleIcon /></IconButton>
                    )}
            </Grid>
        </Grid>
    )
}
export default Confirmjobrolemapping;