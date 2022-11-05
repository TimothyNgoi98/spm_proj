// Import All React Related files here
import * as React from "react";
import { useState, useEffect, useCallback } from "react";

// Import All Router Links here
import { useNavigate } from "react-router-dom";

// Import All Redux ToolKit here
import { useSelector } from "react-redux";

// Import all the molecules files here

// Import ALL material UI things here
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";

import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Hrroles() {
    const Modalstyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    // UseNavigate, for internal routing.
    let navigate = useNavigate();

    const [output, handleoutput] = useState([]);

    const addbutton = () => {
        navigate("/Hraddjobrole", { replace: true });
    };
    // Modal Update Input Fields
    const [input_name, setinput_name] = useState("");
    const [input_department, setinput_department] = useState("");
    const [input_description, setinput_description] = useState("");
    const [current_role_name, setcurrent_role_name] = useState("");
    const [current_role_description,setcurrent_role_description]= useState("")
    const [current_role_department,setcurrent_role_department] = useState("")

    const changeinput_name = (event) => {
        setinput_name(event.target.value);
    };
    
    const changeinput_department = (event) => {
        setinput_department(event.target.value);
    };

    const changeinput_description = (event) => {
        setinput_description(event.target.value);
    };

    // Modal
    const [update, setupdate] = useState("");
    const [deleteitem, setDeleteitem] = useState("");
    const [archive_role_name, setarchive_role_name] = useState("");
    const [openUpdateModal, setUpdateModal] = useState(false);
    const [openDeleteModal, setDeleteModal] = useState(false);
    // Prepopulating the data for the modal

    // First onClick to open up the Modal for Update
    const UpdateModal = (data) => {
        console.log("Update Modal:", data);
        setUpdateModal(true);
        setupdate(data[0]);
        setcurrent_role_name(data[1])
        setcurrent_role_description(data[3])
        setcurrent_role_department(data[2])
    };
    // Second OnClick to Close the Modal and return all other fields to zero
    const closeUpdateModal = () => {
        setUpdateModal(false);
        setinput_name("");
        setinput_department("");
        setinput_description("");
        setupdate("");
    };
    // Upon Clicking on the Submit Button in the Modal, it will update the role details
    const updatedatabase = () => {
        if (input_name.length === 0 || input_name.length > 30 || input_department.length === 0 || input_department.length > 20 || input_description.length === 0 || input_description.length > 500) {
            alert("Please check if your updated input fields fulfills the criteria.")
        }
        else {
            const result = {"role_id": update, "role_name" : input_name, "department" : input_department, "role_description" : input_description, "current_role_name" : current_role_name} 
            const options = {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "http://localhost:3000/Hrroles"
                    },
                body: JSON.stringify(result)
            }
            fetch("http://127.0.0.1:5000/jobrole/updateinformation", options)
            .then(response => response.json())
            .then(data => {
                alert(data.Message) 
            })
            setUpdateModal(false)
            setupdate("")
        }
    };

    // Soft Delete OF Roles MODAL ############################################################
    const deletebuttonclicked = (data) => {
        setDeleteModal(true);
        setDeleteitem(data.jobrole_id);
        setarchive_role_name(data.jobrole_name);
    };

    const closingDeletemodal = (data) => {
        setDeleteModal(false);
        setDeleteitem("");
    };
    // Upon Clicking on the delete Button in the Modal, it will Delete the skill from the database.
    const deletefrom_database = () => {
        // console.log("Successfully deleted!");
        const result = { jobrole_id: deleteitem };
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000/Hrroles",
            },
            body: JSON.stringify(result),
        };
        fetch("http://127.0.0.1:5000/jobrole/archivejobrole", options)
            .then((response) => response.json())
            .then((data) => {
                alert(data.message);
            });

        setDeleteModal(false);
        setDeleteitem("");
    };

    // Navigate to Archive Skills
    const archivepage = () => {
        navigate("/hrarchivejobroles", { replace: true });
    };

    // Fetching Async
    useEffect(() => {
        const fetchMyAPI = async () => {
            let response = await fetch("http://127.0.0.1:5000/jobrole/view/alljobroles");
            response = await response.json();
            handleoutput(response.data);
            console.log("This is from hr JobRoles: " + response.data);
            console.log(response.data);
        };

        fetchMyAPI();
    }, [openDeleteModal, openUpdateModal ]);

    return (
        <Container>

            <Box marginTop="5%">
                <Grid container spacing={1}>
                    <Grid item xs={6} alignContent="left">
                        <Typography variant="h6" textAlign="left">
                            Role Management Dashboard
                        </Typography>
                    </Grid> 
                    <Grid item xs={2}></Grid>

                    <Grid item xs={4}>
                        {/* <ButtonGroup
                            variant="contained"
                            aria-label="outlined primary button group"
                        > */}
                            <Button style={{margin: 2}} variant="contained" onClick={addbutton}>Create New Role</Button>
                            <Button style={{margin: 2}}  variant="contained" onClick={archivepage}>Archived Roles</Button>
                        {/* </ButtonGroup> */}
                    </Grid>
                </Grid>

                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Role Name</TableCell>
                                        <TableCell>Department</TableCell>
                                        <TableCell>Role Description</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell colSpan={2}></TableCell>
                                    </TableRow>
                                </TableHead>
                                {/* The body of the Table Goes here */}
                                <TableBody>
                                    {output.map((singleoutput) => {
                                        if (singleoutput.jobrole_status === "Active") {
                                            return (
                                                <TableRow>
                                                    <TableCell>{singleoutput.jobrole_id}</TableCell>
                                                    <TableCell>{singleoutput.jobrole_name}</TableCell>
                                                    <TableCell>{singleoutput.department}</TableCell>
                                                    <TableCell>{singleoutput.jobrole_desc}</TableCell>
                                                    <TableCell>{singleoutput.jobrole_status}</TableCell>
                                                    <TableCell>
                                                        <IconButton
                                                            color="primary"
                                                            onClick={() =>
                                                                // Actually can just put single output for this
                                                                UpdateModal([singleoutput.jobrole_id, singleoutput.jobrole_name, singleoutput.department,singleoutput.jobrole_desc,
                                                                singleoutput.jobrole_status])
                                                            }
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                    <TableCell>
                                                        <IconButton
                                                            color="primary"
                                                            onClick={() =>
                                                                deletebuttonclicked(singleoutput)
                                                            }
                                                        >
                                                            <MoveToInboxIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        }
                                    })}
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
                open={openUpdateModal}
                onClose={closeUpdateModal}
            >
                <Fade in={openUpdateModal}>
                    <Box sx={Modalstyle}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Update Role Information
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 3 }} color="primary">
                            Current Role Name:
                        </Typography>
                        <Typography sx={{mt: 1}}>
                        {current_role_name}
                        </Typography>
                        <TextField
                            sx={{ mt: 2 }}
                            fullWidth
                            label="New Role Name"
                            helperText="Role name has to be less than 30 characters."
                            // defaultValue={current_role_name}       
                            onChange={changeinput_name}
                        />
                        <Typography id="transition-modal-description" sx={{ mt: 3 }} color="primary">Current Department:</Typography>
                        <Typography sx={{mt: 1}}>
                        {current_role_department}
                        </Typography>
                        <TextField
                            sx={{ mt: 2 }}
                            fullWidth
                            label="New Department"
                            helperText="Department has to be less than 20 characters."
                            // defaultValue={current_role_department}    
                            onChange={changeinput_department}
                        />
                        <Typography  id="transition-modal-description" sx={{ mt: 3 }} color="primary">Current Role Description:
                        </Typography>
                        <Typography sx={{mt: 1}} fontSize={14}>{current_role_description}</Typography>
                        <TextField
                            sx={{ mt: 2 }}
                            multiline
                            fullWidth
                            label="New Role Description"
                            id="fullWidth"
                            helperText="Role Description has to be less than 500 characters."
                            // defaultValue={current_role_description}
                            onChange={changeinput_description}
                        />
                        <Button
                            sx={{ mt: 2 }}
                            variant="contained"
                            color="success"
                            onClick={updatedatabase}
                        >
                            Update Role
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
                            Archive <strong>{archive_role_name}</strong>?
                        </Typography>
                        <Button
                            sx={{ mt: 2 }}
                            variant="contained"
                            color="error"
                            onClick={deletefrom_database}
                        >
                            Archive Role
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </Container>
    );
}

export default Hrroles;
