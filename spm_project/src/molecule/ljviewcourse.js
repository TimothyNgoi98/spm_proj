// Import All React Related files here
import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import { useState,useEffect, useCallback } from 'react';

// Import All Redux ToolKit here
import { useSelector, useDispatch } from 'react-redux';


// Import all the molecules files here

// Import ALL material UI things here
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ButtonGroup from '@mui/material/ButtonGroup';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



function Ljviewcourse() {
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

    let navigate = useNavigate();
    const learningjourney_id = useSelector((state) => state.viewlearningjourney.current_learningjourney)
    const jobrole_id = useSelector((state) => state.viewlearningjourney.jobrole_id)

    console.log(learningjourney_id)
    const staff_id = useSelector((state) => state.session.staff_id)
    const staff_fname = useSelector((state) => state.session.staff_fname)
    const staff_lname = useSelector((state) => state.session.staff_lname)
    const dept = useSelector((state) => state.session.dept)
    const email = useSelector((state) => state.session.email)
    const role_id = useSelector((state) => state.session.role_id)
    const role_name = useSelector((state) => state.session.rolename)

    const [output, setoutput] = useState([])
    const [jobname, setjobname] = useState([])

    const [openArchiveModal , setArchiveModal] = useState(false)
    const [openDeleteModal, setDeleteModal] = useState(false)

    const ArchiveModal = (data) => {

    }
    // Second OnClick to Close the Modal and return all other fields to zero
    const closeArchiveModal = () => {

    }
    // Upon Clicking on the Submit Button in the Modal, it will update the skill description
    const updatedatabase = () => {

    }
    // This is to fetch the Job Name 
    useEffect(() => {
      // I need to know who have logged in. 
      const result = {"jobrole": jobrole_id}
      const options = {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "http://localhost:3000/learningjourneyviewcourse"
          },
          body: JSON.stringify(result)
      }
      const fetchMyAPI = async () => {
          let response = await fetch("http://127.0.0.1:5000/learningjourney/jobrole_name", options)
          response = await response.json()
          setjobname(response.data['jobrole_name'])
          console.log("This is the LjViewCourse",response.data['jobrole_name'])
    }
    
    fetchMyAPI()
  },[])

    // Fetch back the Table Rows 
    useEffect(() => {
      // I need to know who have logged in. 
      const result = {"jobroleid": jobrole_id, "learningjourneyid": learningjourney_id}
      const options = {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "http://localhost:3000/learningjourneyviewcourse"
          },
          body: JSON.stringify(result)
      }
      const fetchMyAPI = async () => {
          let response = await fetch("http://127.0.0.1:5000/learningjourney/viewcourselearningjourney", options)
          response = await response.json()
          setoutput(response.data)
          console.log("This is from hr Skills: " + response.data)
          console.log(response.data)
    }
    
    fetchMyAPI()
  },[])

    console.log(output)
    return (
      <Container>
        {/* {archive}
        {openArchiveModal} */}
        <Box marginTop="5%">
          <Grid container spacing={1}>
            <Grid item xs={6} alignContent="left">
              <Typography variant="h6" textAlign="left">
                Saved Learning Journey ID: {learningjourney_id} 
              </Typography>
            </Grid>
            <Grid item xs={2}></Grid>

            <Grid item xs={4}>
                <Button >Add Skills</Button>
            </Grid>
          </Grid>
          
          <Grid container spacing={1}>
            <Grid item xs={6} alignContent="left">
              <Typography textAlign="left">
                Job: {jobname}
              </Typography>
            </Grid>
            <Grid item xs={2}></Grid>

            <Grid item xs={4}>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>

                      <TableCell>Course Name</TableCell>
                      <TableCell>Course Description</TableCell>
                      <TableCell>Completion Status</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell colSpan={2}></TableCell>


                    </TableRow>
                  </TableHead>
                  {/* The body of the Table Goes here */}
                  <TableBody>
                    {output.map((singleoutput) => {
                      if (singleoutput.skill_status == "Active") {
                        return(
                      <TableRow>
                      <TableCell>{singleoutput.skill_id}</TableCell>
                      <TableCell>{singleoutput.skill_name}</TableCell>
                      <TableCell>{singleoutput.skill_desc}</TableCell>
                      <TableCell>{singleoutput.skill_status}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={()=> ArchiveModal(singleoutput.skill_id)}><EditIcon/></IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton color="primary" ><MoveToInboxIcon/></IconButton>
                      </TableCell>
                    </TableRow>
                        )
                      }
                    }
                    )}
                  </TableBody>
                  {/* End of the Body Table  */}
                </Table>
              </TableContainer>
            </Grid>
          </Grid>

        </Box>
        {/* This is the modal part for archive and Delete */}
        {/* Model 1 For Archive of skills. ######################################################### */}
        <Modal  
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openArchiveModal}
            onClose={closeArchiveModal}
        >
          <Fade in={openArchiveModal}>
            <Box sx={Modalstyle}>
              
            </Box>
          </Fade>
        </Modal>
        {/* Model 2 For deletion of skills ###############################################################################################*/}


        </Container>
  );
}

export default Ljviewcourse;