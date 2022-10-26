// Import All React Related files here
import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// Import All Redux ToolKit here
import { useSelector, useDispatch } from 'react-redux';
import { setTransfer } from "../reduxslice/courseSlice";

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
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';


function SelectCourse() {
    const [jobs , getJobs] = useState([])
    const [checked, setChecked] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleClick() {
        dispatch(setTransfer(checked))
        navigate("/courseskills")
    }

    function handleCheck(event, skilloutput) {
        var updatedList = [...checked];
        if (event.target.checked) {
          updatedList = [...checked, skilloutput]
        }else {
          updatedList.splice(checked.indexOf(skilloutput), 1);
        }
        setChecked(updatedList);
      }

    useEffect(() => {
        const fetchMyAPI = async () => {
            let response = await fetch("http://127.0.0.1:5000/course/view/all")
            response = await response.json();
            getJobs(response.data)

        }
        fetchMyAPI()
    })
    return(
        <Container>
            <Box>
                <Grid container spacing={8} paddingTop="3%">
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Typography component='h1' variant="overline" color="success.main" align="left" gutterBottom sx={{ p: 2, fontWeight: 'bold' }}>
                                Please select the course that you want to map
                            </Typography>
                            <Table stickyheader size="small" sx={{
                                backgroundColor: "white",
                                borderRadius: '16px',
                                }}>
                                <TableHead>
                                    <TableRow textAlign="center">
                                        <TableCell sx={{ fontWeight: 'bold' }}>Course ID</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Course Name</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Course Description</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Course Status</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Selection</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {jobs.map((singleoutput) => (
                                        <TableRow>
                                            <TableCell>{singleoutput.course_id}</TableCell>
                                            <TableCell>{singleoutput.course_name}</TableCell>
                                            <TableCell>{singleoutput.course_desc}</TableCell>
                                            <TableCell>{singleoutput.course_status}</TableCell>
                                            <TableCell><Checkbox onChange = {(event)=>handleCheck(event, singleoutput)}/></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
                <Grid container className="button" paddingTop="3%" paddingBottom = "3%">
                    <Grid item xs={12} align='center'>
                        {checked.length == 0 ? (<Button variant="contained" disabled>Please select a course! </Button>) :
                            checked.length > 1 ? (<Button variant="contained" disabled>Please select only one course!</Button>):
                             (<Button variant="contained" onClick={handleClick}>Map skills</Button>)
                        }
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default SelectCourse;