// Import All React Related files here
import * as React from 'react';
import { useState,useEffect, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {setTransfer} from "../reduxslice/courseSlice";



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
import Checkbox from '@mui/material/Checkbox';


function Courseskills() {

  // useDispatch is meant for initialising the usage of Redux
  const dispatch = useDispatch();
  
     // Function to load course from db
    function loadSkillsFiltered() {
      // simulate a course is being clicked
      fetch("http://127.0.0.1:5000/api/viewskills")
      .then((response)=>response.json())
      .then((result) => outputSkills(result.data))
      // There needs to be some filtering because we don't want the skills that are already mapped to the course already

    }
    // HandleCheck Function
    function handleCheck(event, skilloutput) {
      var updatedList = [...checked];
      if (event.target.checked) {
        updatedList = [...checked, skilloutput]
      }else {
        updatedList.splice(checked.indexOf(skilloutput), 1);
      }
      setChecked(updatedList);
    }
    // End of HandleCheck Function
    
    // This function will dispatch course into courseSlice
    const addCourse = () => {
      dispatch(setTransfer(checked))
    }
    // function addCourse(data) {
    //   // Post checked items to the backend courses table
    //   return ""

    // }
    const [skillOutput,outputSkills] = useState([])
    const [checked, setChecked] = useState([]);
    useEffect(() => {
          loadSkillsFiltered()
      },[])

    return(
        <Container>
          <Box marginTop="5%">
            <Grid container className="top-header-title">
              <Grid item>
                <Typography>
                    Select your skill here 
                </Typography>
              </Grid>

              <Grid item>
                <Typography>
                    Select your skill here 
                </Typography>
              </Grid>
            </Grid>

            <Grid container className="main-section">

      	      <Grid item xs={12}>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow>

                        <TableCell>Skill Id</TableCell>
                        <TableCell>Skill Name</TableCell>
                        <TableCell>Skill Description</TableCell>
                        <TableCell>Skill Status</TableCell>
                        <TableCell>Selection</TableCell>


                      </TableRow>
                    </TableHead>
                    {/* The body of the Table Goes here */}
                    <TableBody>
                      {skillOutput.map((singleoutput) => (
                        <TableRow>
                        <TableCell>{singleoutput.skill_id}</TableCell>
                        <TableCell>{singleoutput.skill_name}</TableCell>
                        <TableCell>{singleoutput.skill_desc}</TableCell>
                        <TableCell>{singleoutput.skills_status}</TableCell>
                        <TableCell><Checkbox onChange={(event)=>handleCheck(event, singleoutput)} /></TableCell>
                      </TableRow>
                      ))}
                      {
                        console.log(checked)
                      }
                      {/* For Loop the Content here */}
                      
                                              {/* <TableRow>
                            <TableCell>{oneoutput.skill_id}</TableCell>
                            <TableCell>{oneoutput.skill_name}</TableCell>
                            <TableCell>{oneoutput.skill_desc}</TableCell>
                            <TableCell>{oneoutput.skills_status}</TableCell>
                          </TableRow> */}
                    </TableBody>
                    {/* End of the Body Table  */}
                  </Table>
                </TableContainer>
              </Grid>

            </Grid>

            <Grid container className="button">
              <Grid item  marginTop="5%" xs={12} align='center'>
                  {checked.length > 0? (<Button variant="contained" onClick={addCourse}>Add mapping</Button>):
                  ""}

                </Grid>
            </Grid>
          </Box>
        </Container>
    )
}

export default Courseskills;