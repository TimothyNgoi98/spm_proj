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
import { setjobrole_desc, setjobrole_id, setjobrole_name, setskill_ids, setskill_name} from '../reduxslice/jobrolesSlice'

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
    const dispatch = useDispatch()
    const [selectedItemsToAddLJ, addItemSelected] = useState(useSelector((state) => state.skillfilter.test))
    const [jobroleselected, addJobSelected] = useState(useSelector((state) => state.skillfilter.jobrole_id))
    const [jobroleName, addJobroleName] = useState(useSelector((state) => state.skillfilter.jobrole_name))
    const [cleanedCourse, updateFormat] = useState('')
    var skillName = useSelector((state) => state.jobrole.skill_name)
    var loginID = useSelector((state)=>state.session.staff_id)

    const restructureData = (data) => {
        var listCourse = []
        var courseString = ""
        for (let item of data){
            listCourse.push(item.course_name)
        }
        courseString = listCourse.join(', ')
        return courseString
    }


    // structuredCourse = 


    console.log(selectedItemsToAddLJ)
    const navigate = useNavigate();

    function reset(){
        navigate("/user")
    }

    function discardChanges() {
        // discard and reset the localstate
        addItemSelected([])
        // discard global state
        dispatch(courseSkillTransfer([]))
        alert("You will now be directed to the course mapping page to map the relevant courses again")
        navigate('/viewskills')

    }

    function redirect() {
        // Redirect so user can select mapping
        navigate("/viewskills")
    }

    function confirmLJ() {
        // Get from the localstate of selectedSkillsToRemove
        // Need staff ID
        // Jobrole_id
        // is_active
        // Append the associated courses
        var courseArray= []
        console.log(selectedItemsToAddLJ)
        for (let item of selectedItemsToAddLJ) {
            // Push the relevant courses into the selectItemsToAddLJ dictionary
            for (let course of item.coursemapped) {
                var cleanedObject = Object.fromEntries(
                    Object.entries(course).slice(0, 6)
                )
                courseArray.push(cleanedObject)
            }

        }
        console.log(courseArray)
        console.log(loginID)
        console.log(jobroleselected)
        // Set up object to post

        var coursedetails = {"staff_id": loginID, "jobrole_id": jobroleselected, "is_active": "Active", "coursemapped":courseArray }

        var url = `http://127.0.0.1:5000/learningjourney/addingcoursesinlearningjourney`
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(coursedetails)
        }

        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                // RELOAD PAGE
                console.log(data)
                // dispatch(setTransfer([]))
                alert("Selected courses has been mapped successfully!")
                // navigate('/main')
                dispatch(courseSkillTransfer([]))
                navigate("/main")
            })

    }

    return (

        <div>
            <Container>
                <Box marginTop="5%">
                    <Grid container spacing={1}>

                        <Grid item xs={6} alignContent="left">
                            <Typography variant="h6" style={{ fontWeight: 600 }} textAlign="left" color = "success.main">
                            Here is your learning journey so far:
                            </Typography>
                        </Grid>

                        <Grid item xs={2}>
                        </Grid>

                        <Grid item xs={4}>
                        </Grid>

                    </Grid>

                    <Grid container spacing={5}  direction="row"
                                alignItems="flex-end"
                                justifyContent="flex-end">

                        <Grid item xs={12} alignContent="flex-end" align="flex-end">
                        <Typography variant="h6" style={{ fontWeight: 600 }} textAlign="left" color = "success.primary">
                            Jobrole selected: {jobroleselected}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TableContainer  alignItems="center"
        justifyContent="center">
                                <Table sx={{ minWidth: 650 }}>

                                    <TableHead>
                                        <TableRow>
                                        <TableCell align="center">Skill Name</TableCell>
                                        <TableCell align="center">Course Mapped</TableCell>
                                        {/* <TableCell>Course Category</TableCell>
                                        <TableCell>Course Type</TableCell> */}
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {selectedItemsToAddLJ.map((singleoutputItemLJ) => (
                                            <TableRow>
                                            <TableCell align="center">{singleoutputItemLJ.skill_name}</TableCell>
                                            <TableCell align="center">{restructureData(singleoutputItemLJ.coursemapped)}</TableCell>
                                        </TableRow>
                                        // console.log(singleoutputCourse.course_id)
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Grid container spacing={5}  direction="row"
                            alignItems="center"
                            justifyContent="center">
                                 <Grid item align="center" alignContent="center">
                                <Button variant="contained" onClick={redirect}> Back to mapping</Button>
                                </Grid>
                                {selectedItemsToAddLJ.length != 0? (
                                    <Grid item alignContent="center" align="center">
                                        {/* <button onClick={() => redirect()}>Back to Home</button> */}
                                        <Button  variant="contained"  color="error" onClick={discardChanges}>Discard all</Button>
                                    </Grid>
                            ) : (
                                ""
                            )}

                                <Grid item alignContent="center" align="center">
                                    {/* <button onClick={() => redirect()}>Back to Home</button> */}
                                    <Button variant="contained" color="success" onClick={confirmLJ}>Confirm Mapping</Button>
                                </Grid>
                            </Grid>
                            
                        


                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>

    );
}
export default Ljcourse;

