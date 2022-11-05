// Import All React Related files here
import * as React from 'react';
import { useState,useEffect } from 'react';
// import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
// import {setskill_ids} from '../reduxslice/jobrolesSlice'
import { setjobrole_desc, setjobrole_id, setjobrole_name, setskill_ids, setskill_name} from '../reduxslice/jobrolesSlice'
import { courseSkillTransfer } from "../reduxslice/filterskillcourseSlice";

// import {} 'jobrolesSlice'
// Import All Router Links here

import {useLocation} from 'react-router-dom';

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
import AddCircle from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';

function Viewskills() {
    let navigate = useNavigate()
    const dispatch = useDispatch()

    const [jobroletoskill, setJobroletoskill] = useState([]);
    const [jobRoleId, setjobRoleId] = useState('')
    const [jobRoleObject, setjobRoleObject] = useState('')
    const [Skills, setSkills] = useState('') //this will be list of skills
    const [condition,setCondition] = useState(false)
    

    let jobRoles_desc = useSelector((state) => state.jobrole.jobrole_desc)
    let jobRoles_id = useSelector((state) => state.jobrole.jobrole_id)
    let jobRoles_name = useSelector((state) => state.jobrole.jobrole_name)
    let selectedJobskill = useSelector((state) => state.skillfilter.test)
    const [selectedItemsToAddLJ, addItemSelected] = useState(useSelector((state) => state.skillfilter.test))
    const [jobroleselected, addJobSelected] = useState(useSelector((state) => state.skillfilter.jobrole_id))
    const [jobroleName, addJobroleName] = useState(useSelector((state) => state.skillfilter.jobrole_name))
    const [cleanedCourse, updateFormat] = useState('')
    var loginID = useSelector((state)=>state.session.staff_id)

    // let skill_ids = useSelector((state) => state.jobrole.skill_ids)

    let checking_list = []
    for (let objects of selectedJobskill) {
        checking_list.push(objects.skill_ids)
    }

    // console.log(jobRoles_desc, 'from redux')
    // console.log(jobRoles_id, 'from redux')
    // console.log(jobRoles_name, 'from redux')
    console.log(checking_list,"THis is to check!@@@@")
    console.log(selectedJobskill,"HELLO THERE")
    


    useEffect(() => {
        const LoadJobtoSkills = async () => {
            // let response = await fetch("http://127.0.0.1:5000/jobrole/jobroleroute")
            // let response = await fetch("http://127.0.0.1:5000/jobrole/view/jobrolesmapped")

            // const jobroleID = jobRoles_id
            var url = `http://127.0.0.1:5000/jobrole/Viewskills/${jobRoles_id}`
            let response = await fetch(url)
            response = await response.json()
            console.log(response)
            console.log(typeof response)
            // setJobroletoskill(response.data['jobroledetails']) 
            setJobroletoskill(response.data) 

        }
        LoadJobtoSkills();
    }, []) 

    console.log(jobroletoskill , "THis is the JOB ROLE TO SKILL")
    console.log(typeof jobroletoskill)


    console.log(jobRoleId)
    console.log(jobRoleObject)

    function confirmLJ() {
        // Get from the localstate of selectedSkillsToRemove
        // Need staff ID
        // Jobrole_id
        // is_active
        // Append the associated courses
        var courseArray= []
        // console.log(selectedItemsToAddLJ)
        for (let item of selectedJobskill) {
            // Push the relevant courses into the selectItemsToAddLJ dictionary
            for (let course of item.coursemapped) {
                var cleanedObject = Object.fromEntries(
                    Object.entries(course).slice(0, 6)
                )
                courseArray.push(cleanedObject)
            }

        }
        // Set up object to post

        var coursedetails = {"staff_id": loginID, "jobrole_id": jobRoles_id, "is_active": "Active", "coursemapped":courseArray }
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
                dispatch(courseSkillTransfer([]))
                navigate("/main")
                // navigate('/main')
            })
            .catch(error=>{
                console.log(error)
            })

    }
    
    const redirect_skill = (data) => {

        setSkills(jobroletoskill.skills)
        dispatch(setjobrole_desc(jobRoles_desc))
        dispatch(setjobrole_id(jobRoles_id))
        dispatch(setjobrole_name(jobRoles_name))
        dispatch(setskill_ids(data[0]))
        dispatch(setskill_name(data[1]))
        console.log(data)
        navigate("/user")
        
    }

    const redirect = () => {
        navigate("/learningjourney")
    }

    return (

            <Container>
                <Box marginTop="5%">
                <Grid container spacing={1}>
                    <Grid item xs={6} alignContent="left">
                    <Typography variant="h6" textAlign="left">
                        {/* Skills for {jobroleName} */}
                        Skills for {jobRoles_name}
                    </Typography>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                            <TableCell>Skill Id</TableCell>
                            <TableCell>Skill Name</TableCell>
                            <TableCell>Skill Description</TableCell>
                            <TableCell>Skill Status</TableCell>
                            <TableCell>Add Skill</TableCell>
                            </TableRow>
                        </TableHead>
                        {/* The body of the Table Goes here */}
                        <TableBody>
                            {jobroletoskill.skills?.map((singleoutput) => {
                                if (checking_list.includes(singleoutput.skill_id)) {
                                    return(
                                    <TableRow>
                                        <TableCell>{singleoutput.skill_id}</TableCell>
                                        <TableCell>{singleoutput.skill_name}</TableCell>
                                        <TableCell>{singleoutput.skill_desc}</TableCell>
                                        <TableCell>{singleoutput.skill_status}</TableCell>
                                        <TableCell>
                                            <IconButton color="primary" onClick={() => redirect_skill([singleoutput.skill_id,singleoutput.skill_name])} disabled><AddCircle/></IconButton>
                                        </TableCell>
                                    </TableRow>
                                    )
                                }
                                else{
                                    return(
                                    <TableRow>
                                        <TableCell>{singleoutput.skill_id}</TableCell>
                                        <TableCell>{singleoutput.skill_name}</TableCell>
                                        <TableCell>{singleoutput.skill_desc}</TableCell>
                                        <TableCell>{singleoutput.skill_status}</TableCell>
                                        <TableCell>
                                            <IconButton color="primary" onClick={() => redirect_skill([singleoutput.skill_id,singleoutput.skill_name])}><AddCircle/></IconButton>
                                        </TableCell>
                                </TableRow>
                                    )
                                }
                            })}
                        </TableBody>
                        </Table>
                    </TableContainer>
                    </Grid>
                </Grid>

                <Grid container spacing={5}  direction="row"
                    alignItems="center"
                    justifyContent="center">
                    <Grid item alignContent="center" align="center">
                            {/* <button onClick={() => redirect()}>Back to Home</button> */}
                            <Button variant="contained" align='center' onClick={() => redirect()}>
                                    Back to Home
                            </Button>
                    </Grid>
                    {/* Only appear if the list is not empty atall  */}      
                    {(selectedJobskill.length > 0)?
                        <Grid item align="center" alignContent="center">
                        {/* <button onClick={() => redirect()}>Back to Home</button> */}
                        <Button LoadJobtoSkillsvariant="contained"  variant="contained" onClick={() => confirmLJ()}>
                                Confirm mapping
                        </Button>
                        </Grid>: ""

                    }

                        
                </Grid>

                </Box>

            </Container>
    );
                            {/* {conso}
                            {jobroletoskill.skills.map((singleoutput) => (

                            <TableRow>
                            <TableCell>{singleoutput['skill_id']}</TableCell>
                            <TableCell>{singleoutput['skill_name']}</TableCell>
                            <TableCell>{singleoutput['skill_desc']}</TableCell>
                            <TableCell>{singleoutput['skill_status']}</TableCell>
                            {console.log(singleoutput)}
                            <TableCell>
                                <IconButton color="primary" onClick={()=> redirect_skill([singleoutput['skill_id'], singleoutput['skill_name']])}><AddCircle/></IconButton>
                            </TableCell>
                            
                            </TableRow>
                            ))} */}
                                {/* {selectedJobskill.map((globalsingleoutput)=>{
                                    {console.log(globalsingleoutput)}

                                    if (globalsingleoutput.skill_ids == singleoutput['skill_id']) {
                                        {setCondition(true)}
                                        <IconButton color="primary" onClick={()=> redirect_skill([singleoutput['skill_id'], singleoutput['skill_name']])} disabled><AddCircle/></IconButton>
                                        }

                                    else {
                                        {setCondition(false)}
                                        <IconButton color="primary" onClick={()=> redirect_skill([singleoutput['skill_id'], singleoutput['skill_name']])} disabled><AddCircle/></IconButton>


                                    }
                                })} */}
}

export default Viewskills;