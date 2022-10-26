// Import All React Related files here
import * as React from 'react';
import { useState,useEffect, useCallback } from 'react';

// Import All Router Links here
import {useNavigate} from 'react-router-dom';

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

  // [] - onload (and u can track something that change)
  // course category is redux (one page to another)

function User() {

  // // [course] UseNavigate, for internal routing. 
  // let navigateCourse = useNavigate()
  // const [outputCourse, handleoutputCourse] = useState([])

  // // Fetching Async 
  // useEffect(() => {
  //   const fetchMyAPI = async () => {
  //     let response = await fetch("http://127.0.0.1:5000/course/view/all")
  //     response = await response.json()
  //     handleoutputCourse(response.data)
  //   }
  //   fetchMyAPI()
  // },[]) 
  // // console.log(typeof output)
  // console.log(outputCourse)

    // [skill] UseNavigate, for internal routing. 
    let navigateSkill = useNavigate()
    const [outputSkill, handleoutputSkill] = useState([])
  
    // Fetching Async 
    useEffect(() => {
      const fetchMyAPI = async () => {
        let response = await fetch("http://127.0.0.1:5000/skill/skilltocourse/1")
        response = await response.json()
        handleoutputSkill(response.data)
      }
      fetchMyAPI()
    },[]) 
    // console.log(typeof outputSkill["0"]["skill_name"])
    // console.log(outputSkill["0"]["skill_name"])

  const addbutton = () => {
    navigateSkill("/addJourneyHere", {replace: true})
  }

  return (
    <div>
        {/* UserVIew.
        <Button variant="text">Text</Button>
        <Grid container spacing={2}>
          <Grid item xs={8}>
          </Grid>
          <Grid item xs={4}>
          </Grid>
          <Grid item xs={4}>
          </Grid>
          <Grid item xs={8}>
          </Grid>
        </Grid> */}

      <Container>
        <Box marginTop="5%">
          <Grid container spacing={1}>

            <Grid item xs={6} alignContent="left">
              <Typography variant="h6" textAlign="left">
                Course Dashboard

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
                <Button onClick={addbutton}>Add to Learning Journey</Button>
              </ButtonGroup>
            </Grid>

          </Grid>

          <Grid container spacing={1}>

            <Grid item xs={12}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }}>

                  <TableHead>
                    <TableRow>
                      <TableCell>Course Id</TableCell>
                      <TableCell>Course Name</TableCell>
                      <TableCell>Course Description</TableCell>
                      <TableCell>Course Status</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {/* {outputSkill.map((singleoutputSkill) => (
                      singleoutputSkill.course_id
                      ? 
                      <TableRow>
                      <TableCell>{singleoutputSkill.course_id}</TableCell>
                      <TableCell>{singleoutputCourse.course_name}</TableCell>
                      <TableCell>{singleoutputCourse.course_desc}</TableCell>
                      <TableCell>{singleoutputCourse.course_status}</TableCell>
                  </TableRow>
                      : console.log(singleoutputSkill.course_id)
                    ))} */}

                    {outputSkill.map((singleoutputSkill) => (
                      singleoutputSkill.course_status === "Active"
                      ? 
                        <TableRow>
                          <TableCell>{singleoutputSkill.course_id}</TableCell>
                          <TableCell>{singleoutputSkill.course_name}</TableCell>
                          <TableCell>{singleoutputSkill.course_desc}</TableCell>
                          <TableCell>{singleoutputSkill.course_status}</TableCell>
                      </TableRow>
                      // console.log(singleoutputCourse.course_id)
                    : <TableRow> There are no Courses for this Skill </TableRow>
                    ))}
                  </TableBody>

                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
        </Container>
    </div>

  );
}

export default User;