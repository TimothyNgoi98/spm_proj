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

function User() {
  
  // UseNavigate, for internal routing. 
  let navigate = useNavigate()

  const [output , handleoutput] = useState([])

  // Fetching Async 
  useEffect(() => {

    const fetchMyAPI = async () => {
      let response = await fetch("http://127.0.0.1:5000/api/allcourse")
      response = await response.json()
      handleoutput(response.data)
    }

    fetchMyAPI()
  },[])

  console.log(typeof output)
  console.log(output)

  // define a function and iterate through output go into each if field is active display
  // course category is redux (one place to another)
  const addbutton = () => {
    navigate("/YUXUANHERE", {replace: true})
  }

  return (
    <div>
        UserVIew.
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
      </Grid>
        
      <Container>
        <Box marginTop="5%">

          
          <Grid container spacing={1}>
            <Grid item xs={6} alignContent="left">
              <Typography variant="h6" textAlign="left">
                Course Dashboard
              </Typography>
            </Grid>
            <Grid item xs={2}></Grid>

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
                  {/* The body of the Table Goes here */}
                  <TableBody>
                    {output.map((singleoutput) => (
                      <TableRow>
                      <TableCell>{singleoutput.course_id}</TableCell>
                      <TableCell>{singleoutput.course_name}</TableCell>
                      <TableCell>{singleoutput.course_desc}</TableCell>
                      <TableCell>{singleoutput.course_status}</TableCell>
                    </TableRow>
                    ))}
                    {/* For Loop the Content here */}
                    
                  </TableBody>
                  {/* End of the Body Table  */}
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