// Import All React Related files here
import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// Import All Router Links here

// Import All Redux ToolKit here
import { useSelector, useDispatch } from 'react-redux';
// import { courseSkillTransfer } from "../reduxslice/filterskillcourseSlice";
import { setRoleSkillDetails } from '../reduxslice/jobroleskillSlice';
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
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import { RadioGroup } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';


function SelectJobRole() {
    const [jobRoles , getJobRoles] = useState([])
    const [checked, setChecked] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleClick() {
        dispatch(setRoleSkillDetails(checked))
        navigate("/jobroleskills")
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
            let response = await fetch("http://127.0.0.1:5000/jobrole/view/alljobroles")
            response = await response.json();
            getJobRoles(response.data)

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
                                Please select the job role that you want to map
                            </Typography>
                            <Table stickyheader size="small" sx={{
                                backgroundColor: "white",
                                borderRadius: '16px',
                                }}>
                                <TableHead>
                                    <TableRow textAlign="center">
                                        <TableCell sx={{ fontWeight: 'bold' }}>Job Role ID</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Job Role Name</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Job Role Description</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Job Role Status</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Selection</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {jobRoles.map((singleoutput) => (
                                        <TableRow>
                                            <TableCell>{singleoutput.jobrole_id}</TableCell>
                                            <TableCell>{singleoutput.jobrole_name}</TableCell>
                                            <TableCell>{singleoutput.jobrole_desc}</TableCell>
                                            <TableCell>{singleoutput.jobrole_status}</TableCell>
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
                        {checked.length == 0 ? (<Button variant="contained" disabled>Please select a job role! </Button>) :
                            checked.length > 1 ? (<Button variant="contained" disabled>Please select only one job role!</Button>):
                             (<Button variant="contained" onClick={handleClick}>Map job role</Button>)
                        }
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default SelectJobRole;
