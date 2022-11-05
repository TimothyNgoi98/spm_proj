// Import All React Related files here
import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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


function Ljcourse() {
    const [selectedItemsToAddLJ, addItemSelected] = useState(useSelector((state) => state.transferselectedskills.transfer))
    // console.log(selectedItemsToAddLJ, "COURSESSSSSS")
    // console.log(addItemSelected, "addSkillsDeleted")
    const dispatch = useDispatch()
    const navigate = useNavigate();

    function reset(){
        navigate("/user")
    }

    function discardChanges() {
        // discard and reset the localstate
        addItemSelected([])
        // discard global state
        dispatch(setTransfer([]))

    }

    function confirmLJ() {
        // Get from the localstate of selectedSkillsToRemove
        console.log(selectedItemsToAddLJ, "selected items to LJ")
        let selectedLJItems = []
        for (var i = 1; i < selectedItemsToAddLJ.length; i++) {
            selectedLJItems.push(selectedItemsToAddLJ[i])
        }
        let courseId = selectedItemsToAddLJ[0]['course_id'];
        console.log(selectedLJItems, "should have no course details");
        var url = `http://127.0.0.1:5000/course/update/${courseId}`
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedLJItems)
        }

        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                // RELOAD PAGE
                // Remove the localchanges and update state
                discardChanges()
                alert("Skill has been added successfully!")
                navigate('/mappings')
            })
    }

    return (

        <div>
            <Container>
                <Box marginTop="5%">
                    <Grid container spacing={1}>

                        <Grid item xs={6} alignContent="left">
                            <Typography variant="h6" textAlign="left" color = "success.main">
                            Here is your learning journey so far:
                            </Typography>
                        </Grid>

                        <Grid item xs={2}>
                        </Grid>

                        <Grid item xs={4}>
                        </Grid>

                    </Grid>

                    <Grid container spacing={1}>

                        <Grid item xs={12} alignContent="left">
                            <Typography variant="h8" textAlign="left">
                            Job role: {selectedItemsToAddLJ.at(-1)}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TableContainer>
                                <Table sx={{ minWidth: 650 }}>

                                    <TableHead>
                                        <TableRow>
                                        <TableCell>Course Name</TableCell>
                                        <TableCell>Course Description</TableCell>
                                        <TableCell>Course Category</TableCell>
                                        <TableCell>Course Type</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {selectedItemsToAddLJ.map((singleoutputItemLJ) => (
                                            <TableRow>
                                            <TableCell>{singleoutputItemLJ.course_name}</TableCell>
                                            <TableCell>{singleoutputItemLJ.course_desc}</TableCell>
                                            <TableCell>{singleoutputItemLJ.course_category}</TableCell>
                                            <TableCell>{singleoutputItemLJ.course_type}</TableCell>
                                        </TableRow>
                                        // console.log(singleoutputCourse.course_id)
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {selectedItemsToAddLJ.length != 0 
                            ? (<Grid container >
                                    <Grid item spacing={3} xs={12} align='center'>
                                        <Button variant="contained" onClick={confirmLJ}>Confirm Mapping</Button>
                                        {console.log(selectedItemsToAddLJ, 'skillsremoved')}
                                        <Button variant="contained" onClick={discardChanges}>Discard Current Learning Journey</Button>
                                    </Grid>
                                </Grid>) 
                            : (<Grid>
                                    <Button variant="contained" onClick = {reset}>Learning Journey Discarded, Create another Learning Journey!</Button>
                                </Grid>)
                            }


                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>

    );
}
export default Ljcourse;

