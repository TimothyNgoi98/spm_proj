// Import All React Related files here
import * as React from 'react';
import { useState,useEffect, useCallback } from 'react';
// import {setskill_ids} from '../reduxslice/jobrolesSlice'
import {useDispatch, useSelector} from 'react-redux';


// Import All Router Links here
import {useNavigate} from 'react-router-dom';

// Import All Redux ToolKit here
// import { useSelector, useDispatch } from 'react-redux';

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
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Accordion from '@mui/material/Accordion';
import { AccordionDetails, AccordionSummary } from '@mui/material'; 
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import { setTransfer } from '../reduxslice/courseSlice';
import { courseSkillTransfer,courseSkillAppend, initialiseJobroleId, initialiseJobroleName } from "../reduxslice/filterskillcourseSlice";

  // [] - onload (and u can track something that change)
  // course category is redux (one page to another)

function User() {

    let jobRoles_desc = useSelector((state) => state.jobrole.jobrole_desc)
    let jobRoles_id = useSelector((state) => state.jobrole.jobrole_id)
    let jobRoles_name = useSelector((state) => state.jobrole.jobrole_name)
    console.log(jobRoles_desc)
    console.log(jobRoles_id)
    console.log(jobRoles_name, "JOB ROLEEEEE")

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const matches2 = useMediaQuery(theme.breakpoints.up('sm'));


    let skill_ids = useSelector((state) => state.jobrole.skill_ids)
    let skill_name = useSelector((state) => state.jobrole.skill_name)
    let navigateSkill = useNavigate()
    const [outputSkill, handleoutputSkill] = useState([])
  
    // Fetching Async 
    useEffect(() => {
      const fetchMyAPI = async () => {
          let response = await fetch(`http://127.0.0.1:5000/skill/skilltocourse/${skill_ids}`)
          response = await response.json()
          // console.log(response.data)
          handleoutputSkill(response.data)
      }
      fetchMyAPI()
    },[]) 

  // const addbutton = () => {
  //   navigateSkill("/addJourneyHere", {replace: true})
  // }

  const [checked, setChecked] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleClick() {
    console.log(checked, "CHECKED 2")
    // checked.push(jobRoles_id)
    // checked.push(jobRoles_name)
    dispatch(initialiseJobroleId(jobRoles_id))
    dispatch(initialiseJobroleName(jobRoles_name))
    var dummyObject = {}
    // var key = `Skill_${skill_ids}`
    dummyObject.skill_ids = skill_ids
    dummyObject.coursemapped = []
    for (let item of checked) {
      dummyObject.coursemapped.push(item)
    }
    console.log(dummyObject)
    dispatch(courseSkillAppend(dummyObject))

    // dispatch(setTransfer(checked))
    navigate("/confirmSelectedCourses")
}

  function handleCheck(event, courseOutput) {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, courseOutput]
    }else {
      updatedList.splice(checked.indexOf(courseOutput), 1);
    }
    setChecked(updatedList);
    console.log(checked)
    console.log(skill_ids)
  }

  return (
    <div>

      <Container>
        <Box marginTop="5%">
          <Grid container spacing={1}>

            <Grid item xs={6} alignContent="left">
              <Typography variant="h6" textAlign="left">
                Selected Job Role: {jobRoles_name}

                {/* {outputSkill["0"]["skill_name"]}
                {outputSkill[0].map((singleoutputSkill) => (
                    singleoutputSkill.skill_name
                    ? console.log(outputSkill)
                    : console.log(singleoutputSkill)
                ))} */}

              </Typography>
            </Grid>

            <Grid item xs={2}>
            </Grid>

            <Grid item xs={4}>
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
              {checked.length === 0 
                ? (<Button variant="contained" disabled>Please select a course! </Button>) 
                : (<Button variant="contained" onClick={handleClick}>Add Course(s) to Learning Journey</Button>)}
              </ButtonGroup>
            </Grid>

          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={12}>

            {matches &&  
                <Grid>

             
                  {outputSkill.map((singleoutputSkill) => (
                      singleoutputSkill.course_status === "Active"
                      ? 
                      <Grid>
                        <Accordion>
                          <AccordionSummary><b>{singleoutputSkill.course_name}</b></AccordionSummary>
                         <AccordionDetails>
                   
                            <TableRow><b>Course ID: </b> {singleoutputSkill.course_id}</TableRow>
                            {console.log(checked, "cheCKED VALUE")}

                            <br />
                            <hr />
                           
                           
                            <TableRow style={{textAlign: 'left'}}><b >Course Description: </b> {singleoutputSkill.course_desc}</TableRow>
                     
                            <br />
                            <hr />
                            <TableRow><b>Course Status: </b> {singleoutputSkill.course_status}</TableRow>
                      
                            <br />
                            <hr />
                            <TableRow><b>Course Category: </b> {singleoutputSkill.course_category}</TableRow>

                            <br />
                            <hr />

                            <TableRow><b>Course Type: </b> {singleoutputSkill.course_type}</TableRow>
                            <br />
                          
                        </AccordionDetails>
                        </Accordion>
                      </Grid>
   

                    : <TableRow>
                        <TableCell> There are no Courses for this Skill </TableCell>
                      </TableRow>
                    ))}

                </Grid>
              }

              {matches2 &&
              <TableContainer>
                <Table sx={{ minWidth: 650 }}>

                  <TableHead>
                    <TableRow>
                      <TableCell>Course Id</TableCell>
                      <TableCell>Course Name</TableCell>
                      <TableCell>Course Description</TableCell>
                      <TableCell>Course Status</TableCell>
                      <TableCell>Course Category</TableCell>
                      <TableCell>Course Type</TableCell>
                      <TableCell>Slection of Course</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>

                    {outputSkill.map((singleoutputSkill) => (
                      singleoutputSkill.course_status === "Active"
                      ? 
                        <TableRow>
                          <TableCell>{singleoutputSkill.course_id}</TableCell>
                          <TableCell>{singleoutputSkill.course_name}</TableCell>
                          <TableCell>{singleoutputSkill.course_desc}</TableCell>
                          <TableCell>{singleoutputSkill.course_status}</TableCell>
                          <TableCell>{singleoutputSkill.course_category}</TableCell>
                          <TableCell>{singleoutputSkill.course_type}</TableCell>
                          <TableCell><Checkbox onChange = {(event)=>handleCheck(event, singleoutputSkill)}/></TableCell>
                      </TableRow>
                      // console.log(singleoutputCourse.course_id)
                    : <TableRow>
                        <TableCell> There are no Courses for this Skill </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              }

  
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default User;