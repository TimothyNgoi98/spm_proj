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






function Coursemapping() {
    // Initalisation of the useNavigate instance
    const navigate = useNavigate();
    const [skills,showSkills] = useState([])
    // Function to load course from db
    function loadCourse() {
        // simulate a course is being clicked
        fetch("http://127.0.0.1:5000/course/view/1")
        .then((response)=>response.json())
        .then((result) => setCourse(result.data.coursedetails.course_name))
    }
    const [courseName, setCourse] = useState('sdf')

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
                        align="center"
                        color="text.primary"
                        gutterBottom
                        >
                        Course mapping page
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        Something short and leading about the collection below—its contents,
                        the creator, etc. Make it short and sweet, but not too short so folks
                        don&apos;t simply skip over it entirely.
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container marginTop="5%" spacing={5}>
                    <Grid item>
                        <Typography component="h2" variant="h6" color="secondary" gutterBottom>
                            Course selected: {courseName}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container marginTop="5%" spacing={8}>
                    <Grid item xs={12}>
                        <Typography                       
component="h2" variant="h6" color="primary" gutterBottom>
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
                                        <TableCell align="center" colSpan={3}>

                                        </TableCell>
                                    </TableRow>
                                {/* {rows.map((row) => (
                                    <TableRow key={row.id}>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.shipTo}</TableCell>
                                    <TableCell>{row.paymentMethod}</TableCell>
                                    <TableCell align="right">{`$${row.amount}`}</TableCell>
                                    </TableRow>
                                ))} */}
                                </TableBody>
                            </Table>
                    </Grid>
                </Grid>

                <Grid container marginTop="10%" spacing={1}>
                    <Grid item xs={12}>
                    <Typography component="h2" variant="h6" color="primary">
                        Skills selected:
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
                                    <TableCell align="center" colSpan={3}>
                                        <Button variant="contained" onClick={handleClick}>Add a new mapping</Button>
                                    </TableCell>
                                </TableRow>
                            {/* {rows.map((row) => (
                                <TableRow key={row.id}>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.shipTo}</TableCell>
                                <TableCell>{row.paymentMethod}</TableCell>
                                <TableCell align="right">{`$${row.amount}`}</TableCell>
                                </TableRow>
                            ))} */}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </Box>




        </Container>
    )



}

export default Coursemapping;