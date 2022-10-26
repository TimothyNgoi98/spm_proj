// Import All React Related files here
import * as React from 'react';
import { useState,useEffect, useCallback} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
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
import Paper from '@mui/material/Paper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';

function Courseskills() {
  // const transferred_skill_existing = useSelector((state) => state.skillfilter.test)
  const [skillOutput,outputSkills] = useState([])
  const [selectedCourse, addCourseDeleted] = useState(useSelector((state) => state.transferselectedskills.transfer))
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Check if state is empty for filterskills
  // useDispatch is meant for initialising the usage of Redux
    
  const [checked, setChecked] = useState([...selectedCourse]);
  // Function to load course from db
  function loadSkillsFiltered() {
    // simulate a course is being clicked
      // Need to change 
      fetch("http://127.0.0.1:5000/skill/display/")
      .then((response)=>response.json())
      .then((result) => {
        // There needs to be some filtering because we don't want the skills that are already mapped to the course already
        console.log(result.data)
        console.log(result.data,"print existing skills")
        outputSkills(result.data);
      })
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

  function returnBack() {
      navigate('/selectcourse')
  }
    
  // This function will dispatch course into courseSlice
  const addCourse = () => {
    dispatch(setTransfer(checked))
    console.log(checked, "checkedstuff")
    navigate("/confirmcoursemapping")
  }
  
  useEffect(() => {
        loadSkillsFiltered()
    },[])

    return(
        <Container>
          <Box marginTop="5%">
            <Grid container className="main-section">
              <IconButton color="info" onClick={returnBack} sx={{p:1}}>
                <ArrowBackIcon/>
              </IconButton>
              <Grid item xs = {12}>
                <Typography component = 'h1' color = "info.main" align="center" sx={{p:2, fontWeight: 'bold'}}>
                  Couse being mapped: {selectedCourse[0]['course_name']}
                </Typography>
              </Grid>
      	      <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Typography component='h1' variant="overline" color="info.main" align="left" gutterBottom sx={{p:2, fontWeight: 'bold'}}>
                    Choose your desired skill
                </Typography>
                <Table stickyheader size="small" sx={{
                  backgroundColor: "white",
                  borderRadius: '16px',  
                    }}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Skill Id</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Skill Name</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Skill Description</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Skill Status</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Selection</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {skillOutput.map((singleoutput) => (
                        <TableRow>
                        <TableCell>{singleoutput.skill_id}</TableCell>
                        <TableCell>{singleoutput.skill_name}</TableCell>
                        <TableCell>{singleoutput.skill_desc}</TableCell>
                        <TableCell>{singleoutput.skill_status}</TableCell>
                        <TableCell><Checkbox onChange={(event)=>handleCheck(event, singleoutput)} /></TableCell>
                      </TableRow>
                      ))}
                    </TableBody>
                    {/* End of the Body Table  */}
                  </Table>
                </TableContainer>
              </Grid>

            </Grid>

            <Grid container className="button">
              <Grid item xs={12} align='center'>
                  {checked.length <= 1 ? (<Button variant="contained" onClick={addCourse} disabled>Add mapping</Button>):
                  (
                    <Button variant="contained" onClick={addCourse}>Add mapping</Button>
                  )
                  }
                </Grid>
            </Grid>
          </Box>
        </Container>
    )
}

export default Courseskills;
