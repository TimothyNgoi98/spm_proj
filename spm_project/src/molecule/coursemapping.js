// Import All React Related files here
import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';


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
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';




function Coursemapping() {

    const Modalstyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
      
    // For some reason only works after i set the state here
    const [mappingName, setMappingName] = useState("")
    const [courseName, setCourse] = useState([])
    const [receivedskills, showSkills] = useState([])
    const [selectedSkillsToRemove, addSkillsDeleted] = useState(useSelector((state) => state.transferselectedskills.transfer))
    const [currMappedCourses, setCurrMappedCourses] = useState([])
    const [currMappedRoles, setCurrMappedRoles] = useState([])
    const [deleteitem, setDeleteitem] = useState([])
    const [openDeleteModal, setDeleteModal] = useState(false)

    const dispatch = useDispatch()
    // Initalisation of the useNavigate instance
    const navigate = useNavigate();
    // Navigation to a new page to map the new skills

    function handleClick() {
        navigate("/selectcourse")
        dispatch(courseSkillTransfer(receivedskills))
    }

    function handleClick2() {
        navigate("/selectjobrole")
        // dispatch(courseSkillTransfer(receivedskills))
    }

    function deletebuttonclickedcourse(courseid, skillid){
        setDeleteModal(true)
        setDeleteitem([courseid, skillid])
      }
    
      function deletebuttonclickedjobrole(jobroleid, skillid){
        setDeleteModal(true)
        setDeleteitem([jobroleid, skillid])
      }

    function closingDeletemodal() {
        setDeleteModal(false)
        setDeleteitem([])
      }
    
    
    function unmapSkillFromCourse(){
        const result = deleteitem;
        var url = `http://127.0.0.1:5000/course/removemapping/${result[0]}`
        console.log(url)
        const options = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(result)
        }
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                alert("Skill has been unmapped from course.")
            })
            setDeleteModal(false)
            setDeleteitem([])
            setMappingName("")
    }

    function unmapSkillFromJobrole(){
        const result = deleteitem;
        var url = `http://127.0.0.1:5000/jobrole/removemapping/${result[0]}`
        console.log(url)
        const options = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(result)
        }
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                alert("Skill has been unmapped from job role.")
            })
            setDeleteModal(false)
            setDeleteitem([])
            setMappingName("")
    }

    var selectedSkills = []
    for(var i = 1; i < selectedSkillsToRemove.length; i ++){
        selectedSkills.push(selectedSkillsToRemove[i])
    }
    // call to backend to get the courses which have currently been mapped
    useEffect(() => {
        const fetchMyAPI = async() => {
            let response = await fetch("http://127.0.0.1:5000/course/view/coursesmapped");
            const result = await response.json();
            setCurrMappedCourses(result.data['coursedetails']);
        }
        fetchMyAPI();

        const fetchMyAPI2 = async() => {
            let response = await fetch("http://127.0.0.1:5000/jobrole/view/jobrolesmapped");
            const result = await response.json();
            setCurrMappedRoles(result.data['jobroledetails']);
        }
        fetchMyAPI2();
    }, [openDeleteModal,mappingName])

    return (
        <Container>
            <Box>
                <Grid paddingTop="5%" container>
                    <Grid item xs={6}>
                        <Grid item>
                            <Button variant="contained" onClick = {() => setMappingName("skillsCourse")}>Map skills to course</Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid item>
                            <Button variant="contained" onClick = {() => setMappingName("skillsRole")}>Map skills to role</Button>
                        </Grid>
                    </Grid>
                </Grid>
                
                {mappingName == "" &&
                <Grid container paddingTop="5%" spacing={5}>
                    <Grid item xs = {12}>
                        <Typography component='h1' variant="overline" color="success.main" align = 'center' sx={{fontWeight: 'bold' }}>
                                    Please choose something to map! 
                        </Typography>
                    </Grid>
                </Grid>
                }
                
                {mappingName == "skillsCourse" &&
                    <Grid>
                        <Grid container paddingTop="5%" spacing={5}>
                            <Grid item xs = {12}>
                                <Typography align = 'center' component="h1" variant="outline">
                                    Mapping Skill To Course
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} paddingTop="3%">
                            <Grid item xs={12}>
                            {/* First table for current mapped skills */}
                            <TableContainer component={Paper}>
                                <Typography component='h1' variant="overline" color="success.main" align="left" gutterBottom sx={{ p: 2, fontWeight: 'bold' }}>
                                    Current Mapped Courses
                                </Typography>
                                <Table stickyheader size="small" sx={{
                                        backgroundColor: "white",
                                        borderRadius: '16px',
                                    }}>
                                    <TableHead>
                                        <TableRow textAlign="center">
                                            <TableCell sx={{ fontWeight: 'bold' }}>Course ID</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Course Name</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Skill ID</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Skill Name</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                                            <TableCell colSpan={2}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {currMappedCourses.length != 0 ? (currMappedCourses.map((singleOutput) => (
                                            <>
                                            <TableRow>
                                                <TableCell rowSpan = {singleOutput.skills.length + 1}>{singleOutput.course_id}</TableCell>
                                                <TableCell rowSpan = {singleOutput.skills.length + 1}>{singleOutput.course_name}</TableCell>
                                            </TableRow>
                                                {singleOutput.skills.map((singleSkill) => (
                                                    <TableRow>                                                 
                                                        <TableCell>{singleSkill['skill_id']}</TableCell>
                                                        <TableCell>{singleSkill['skill_name']}</TableCell>
                                                        <TableCell>{singleSkill['skill_desc']}</TableCell>
                                                        <TableCell>
                                                            <IconButton color="primary" onClick={() => deletebuttonclickedcourse(singleOutput.course_id, singleSkill['skill_id'])}>
                                                                <EditIcon/>
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </>
                                        ))): (
                                            <TableRow textAlign='center'>
                                                <TableCell align="center" colSpan={12}>
                                                    "You do not have any mappings"
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <IconButton color="info" onClick={handleClick} sx={{ p: 2 }}><AddCircleIcon /></IconButton>
                        </Grid>
                    </Grid>
                    <Modal open = {openDeleteModal} onClose = {closingDeletemodal}>
                        <Fade in={openDeleteModal}>
                            <Box sx = {Modalstyle}>
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                {/* Unmap Skill ID: {deleteitem} from  */}
                                Unmap Skill ID {deleteitem[1]} from Course ID {deleteitem[0]}?
                            </Typography>
                            <Button sx={{mt:2}} variant="contained" color="error" onClick = {unmapSkillFromCourse}>
                                Unmap skill
                            </Button>
                            </Box>
                        </Fade>
                    </Modal>
                    </Grid>
                    
                }
                
                {mappingName == "skillsRole" &&
                    <Grid>
                    <Grid container paddingTop="5%" spacing={5}>
                        <Grid item xs = {12}>
                            <Typography align = 'center' component="h1" variant="outline">
                                Mapping Skill To Job Role
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} paddingTop="3%">
                        <Grid item xs={12}>
                        {/* First table for current mapped skills */}
                        <TableContainer component={Paper}>
                            <Typography component='h1' variant="overline" color="success.main" align="left" gutterBottom sx={{ p: 2, fontWeight: 'bold' }}>
                                Current Mapped Job Roles
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
                                        <TableCell colSpan={2}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {currMappedRoles.length != 0 ? (currMappedRoles.map((singleOutput) => (
                                        <>
                                        <TableRow>
                                            <TableCell rowSpan = {singleOutput.skills.length + 1}>{singleOutput.jobrole_id}</TableCell>
                                            <TableCell rowSpan = {singleOutput.skills.length + 1}>{singleOutput.jobrole_name}</TableCell>
                                        </TableRow>
                                        {singleOutput.skills.map((singleSkill) => (
                                            <TableRow>
                                                <TableCell>{singleSkill['skill_id']}</TableCell>
                                                <TableCell>{singleSkill['skill_name']}</TableCell>
                                                <TableCell>{singleSkill['skill_desc']}</TableCell>
                                                <TableCell>
                                                    <IconButton color="primary" onClick = {() => deletebuttonclickedjobrole(singleOutput.jobrole_id, singleSkill['skill_id'])}>
                                                        <EditIcon/>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        </>
                                    ))): (
                                        <TableRow textAlign='center'>
                                            <TableCell align="center" colSpan={12}>
                                                "You do not have any mappings"
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <IconButton color="info" onClick={handleClick2} sx={{ p: 2 }}>
                            <AddCircleIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Modal open = {openDeleteModal} onClose = {closingDeletemodal}>
                        <Fade in={openDeleteModal}>
                            <Box sx = {Modalstyle}>
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                Unmap Skill ID {deleteitem[1]} from Job Role ID {deleteitem[0]}?
                            </Typography>
                            <Button sx={{mt:2}} variant="contained" color="error" onClick = {unmapSkillFromJobrole}>
                                Unmap skill
                            </Button>
                            </Box>
                        </Fade>
                    </Modal>
                </Grid>
                }
            </Box>




        </Container>
    )



}

export default Coursemapping;