// Import All React Related files here
import * as React from 'react';
import { useState,useEffect, useCallback } from 'react';



// Import All Router Links here
import {useNavigate} from 'react-router-dom';

// Import All Redux ToolKit here
import {useSelector} from 'react-redux';

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
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

function Hrarchivejobroles() {
// Just to try: 
  // state.transfer (this transfer refers to the store.js , what name you linked it to )
  // 3rd paramter will be the initial state , one of the ojbect name 

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


  // UseNavigate, for internal routing. 
  let navigate = useNavigate()

  const [output , handleoutput] = useState([])

  // Modal Archive Input Fields
  const [input_name, setinput_name] = useState("")
  const [input_description, setinput_description] = useState("")

  const changeinput_name = (event) => {
    setinput_name(event.target.value)
  }

  const changeinput_description = (event) => {
    setinput_description(event.target.value)
  }


  // Modal 
  const [archive, setarchive] = useState("")
  const [deleteitem, setDeleteitem] = useState("")
  const [restore_name, setrestore_name] = useState("")

  const [openArchiveModal , setArchiveModal] = useState(false)
  const [openDeleteModal, setDeleteModal] = useState(false)

  // First onClick to open up the Modal for Archive
  const ArchiveModal = (data) => {
    console.log("Archive Modal::", data)
    setArchiveModal(true)
    setarchive(data.jobrole_id)
    setrestore_name(data.jobrole_name)
  }
  // Second OnClick to Close the Modal and return all other fields to zero
  const closeArchiveModal = () => {
    setArchiveModal(false)
    setinput_name("")
    setinput_description("")
    setarchive("")
  }
  // Upon Clicking on the Submit Button in the Modal, it will update the skill description
  const updatedatabase = () => {

    if (input_name.length === 0 || input_name.length > 50 || input_description.length === 0 || input_description.length > 250 ) {
      alert("Please check if your input fields fulfills the criteria.")
    }
    else {
    const result = {'jobrole_id': archive, "jobrole_name" : input_name, "jobrole_description" : input_description } 
    const options = {
      method: "PUT",
      headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "http://localhost:3000/Hradmin"
            },
      body: JSON.stringify(result)
    }
    fetch("http://127.0.0.1:5000/jobrole/updatedescription/", options)
    .then(response => response.json())
    .then(data => {
      alert(data.Message)
    })
    setArchiveModal(false)
    setarchive("")
    }
  }

  // Restore MODAL ############################################################
  const deletebuttonclicked = (data) => {
    setDeleteModal(true)
    setDeleteitem(data.jobrole_id)
    setrestore_name(data.jobrole_name)
  }

  const closingDeletemodal = (data) => {
    setDeleteModal(false)
    setDeleteitem("")

  }
  // Upon Clicking on the delete Button in the Modal, it will Delete the skill from the database. 
  const deletefrom_database = () => {
    // console.log("Successfully deleted!")
    console.log(deleteitem)
    const result = {'jobrole_id': deleteitem} 
    const options = {
      method: "PUT",
      headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "http://localhost:3000/signin"
            },
      body: JSON.stringify(result)
    }
    fetch("http://127.0.0.1:5000/jobrole/archivejobrole/", options)
    .then(response => response.json())
    .then(data => {
      alert(data.message)
    })

    setDeleteModal(false)
    setDeleteitem("")
  }

  // Navigate to Archive Skills 
  const jobrolePage = () => {
    navigate("/Hrjobrole", {replace: true})
  }


    // Fetching Async 
    useEffect(() => {

      const fetchMyAPI = async () => {
        let response = await fetch("http://127.0.0.1:5000/jobrole/view/alljobroles")
        response = await response.json()
        handleoutput(response.data)
        console.log("This is from the jobroles " + response.data)
        console.log(response)
      }
  
      fetchMyAPI()
    },[openDeleteModal,openArchiveModal])

  return (
      <Container>
        {/* {archive}
        {openArchiveModal} */}

        <Box marginTop="5%">
          <Grid container spacing={1}>
            <Grid item xs={6} alignContent="left">
              <Typography variant="h6" textAlign="left">
                Archived Roles
              </Typography>
            </Grid>
            <Grid item xs={2}></Grid>

            <Grid item xs={4}>
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={jobrolePage}>Back to Active Roles</Button>
              </ButtonGroup>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>

                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell colSpan={2}></TableCell>


                    </TableRow>
                  </TableHead>
                  {/* The body of the Table Goes here */}
                  <TableBody>
                    {output.map((singleoutput) => {
                      if (singleoutput.jobrole_status === "Retired") {
                        return(
                      <TableRow>
                      <TableCell>{singleoutput.jobrole_id}</TableCell>
                      <TableCell>{singleoutput.jobrole_name}</TableCell>
                      <TableCell>{singleoutput.jobrole_desc}</TableCell>
                      <TableCell>{singleoutput.jobrole_status}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={()=> ArchiveModal(singleoutput)}><EditIcon/></IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => deletebuttonclicked(singleoutput)}><LibraryAddIcon/></IconButton>
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
        {/* Model 1 For Archive of jobroles. ######################################################### */}
        <Modal  
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openArchiveModal}
            onClose={closeArchiveModal}
        >
          <Fade in={openArchiveModal}>
            <Box sx={Modalstyle}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Update Jobrole Information
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Jobrole_Id : {archive}
              </Typography>
              <TextField sx={{mt:2}} fullWidth label="Jobrole Name" helperText="Jobrole name has to be less than 50 characters." onChange={changeinput_name}/>
              <TextField sx ={{mt: 2}} fullWidth label="Jobrole Description" id="fullWidth" helperText="Jobrole Description has to be less than 250 characters."onChange={changeinput_description} />
              <Button sx={{mt:2}}variant="contained" color="success" onClick={updatedatabase}>
                Update Jobrole
              </Button>
            </Box>
          </Fade>
        </Modal>
        {/* Model 2 For deletion of skills ###############################################################################################*/}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openDeleteModal}
          onClose={closingDeletemodal}
          >
            <Fade in={openDeleteModal}>
            <Box sx={Modalstyle}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Restore <strong>{restore_name}</strong>?
              </Typography>
              <Button sx={{mt:2}} variant="contained" color="error" onClick={deletefrom_database}>
                Change Role Status
              </Button>
            </Box>
          </Fade>
        </Modal>

        </Container>
  );
}

export default Hrarchivejobroles;