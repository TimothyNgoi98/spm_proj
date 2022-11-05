// Import React Related
import * as React from 'react';
import {NavLink,BrowserRouter} from 'react-router-dom';
import { useState,useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setstaffid, setstafffname, setstafflname, setdept, setemail, setroleid, setrolename} from '../reduxslice/sessionSlice'

// Import Material UI Design 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';




const Navbar = () => {
    const dispatch = useDispatch();

    // Retrieving the session stored:
    const staff_id = useSelector((state) => state.session.staff_id)
    const staff_fname = useSelector((state) => state.session.staff_fname)
    const staff_lname = useSelector((state) => state.session.staff_lname)
    const dept = useSelector((state) => state.session.dept)
    const email = useSelector((state) => state.session.email)
    const role_id = useSelector((state) => state.session.role_id)
    const role_name = useSelector((state) => state.session.rolename)

    console.log(role_name + "This is from navbar.js. ")

    // Sign out will remove the global state 
    const signout = () => {
        dispatch(setstaffid(""))
        dispatch(setstafffname(""))
        dispatch(setstafflname(""))
        dispatch(setdept(""))
        dispatch(setemail(""))
        dispatch(setroleid(""))
        dispatch(setrolename(""))
    }

    return (
        <>
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <MenuBookIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                        mr: 2,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        LJPS |
                    </Typography>
                    <Box display="flex" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }} >
                        {/* Normal User ####################################################################################################################*/}
                        {role_name == "" && 
                        <Box display="flex" >
                            <Box display="flex">
                                <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/">
                                    <Button sx={{color:"white",fontWeight: 700,}} variant="outlined" > 
                                        Home 
                                    </Button>
                                </NavLink>

                                <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/signin">
                                    <Button sx={{color:"white",fontWeight: 700,}} variant="outlined" > 
                                        Login 
                                    </Button>
                                </NavLink>
                            </Box>
                        </Box>
                        }
                        

                        {/* User ####################################################################################################################*/}
                        {(role_name == "User" || role_name == "Admin" || role_name == "Manager" || role_name == "Trainer") && 
                        <Box display="flex" >
                            <Box display="flex">
                                <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/main">
                                    <Button sx={{color:"white",fontWeight: 700,}} variant="outlined" > 
                                        Home 
                                    </Button>
                                </NavLink>

                            </Box>

                        </Box>
                        }

                        {/* HR ####################################################################################################################*/}
                        {role_name == "Admin" && 
                        <Box display="flex" >
                            <Box display="flex">
                                <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/Hradmin">
                                    <Button sx={{color:"white",fontWeight: 700,}} variant="outlined" > 
                                        Skills Management
                                    </Button>
                                </NavLink>

                                <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/Hrjobrole">
                                    <Button sx={{color:"white",fontWeight: 700,}} variant="outlined" > 
                                        Roles Management
                                    </Button>
                                </NavLink>

                                <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/mappings">
                                    <Button sx={{color:"white",fontWeight: 700,}} variant="outlined" > 
                                        Manage Mappings
                                    </Button>
                                </NavLink>
                            </Box>

                        </Box>
                        }

                        {/* Manager ####################################################################################################################* */}
                        {role_name == "Manager" && 
                        <Box display="flex" >
                            <Box display="flex">
                                <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/">
                                    <Button sx={{color:"white",fontWeight: 700,}} variant="outlined" > 
                                        Manage Page 
                                    </Button>
                                </NavLink>

                                <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/Manager">
                                    <Button sx={{color:"white",fontWeight: 700,}} variant="outlined" > 
                                        Staff Management
                                    </Button>
                                </NavLink>
                            </Box>

                        </Box>
                        }

                        {/* Add a signout Button as long as they are logged in.  */}
                        {role_name != "" &&
                            <Box display="flex"justifyContent="flex-end">
                            {/* <Link to="/signup"> */}
                                <Button sx={{color:"white", borderRadius:"8px"}} variant="outlined" onClick={signout}>  
                                    Sign Out
                                </Button>
                            {/* </Link> */}
                            </Box>
                        
                        }
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
            <Accordion sx={{  display: { xs: 'flex', sm: 'none' } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    Quick Links
                </AccordionSummary>
                {role_name == "" && 
                    <>
                    <AccordionDetails>
                        <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/main">
                                <Typography>Home</Typography>
                        </NavLink>
                    </AccordionDetails>
                    <AccordionDetails>
                    <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/signin">
                                <Typography>Sign In</Typography>
                                </NavLink>
                        </AccordionDetails>
                        
                    </>
                        }
                {(role_name == "User" || role_name == "Admin" || role_name == "Manager" || role_name == "Trainer") && 
                   <>
                   <AccordionDetails>
                        <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/">
                                <Typography>Home</Typography>
                        </NavLink>
                    </AccordionDetails>

                    </>
                        }
                {role_name == "Admin" && 
                <>
                    <AccordionDetails>
                        <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/Hradmin">
                                <Typography>Skills Management</Typography>
                        </NavLink>
                    </AccordionDetails>
                    <AccordionDetails>
                        <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/Hrjobrole">
                            <Typography>Roles Management</Typography>
                        </NavLink>
                    </AccordionDetails>

                    <AccordionDetails>
                                <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/mappings">
                                    <Typography>Manage Mapping</Typography>
                                </NavLink>
                    </AccordionDetails>

                </>
                }
                {role_name == "Manager" && 
                <>
                    <AccordionDetails>
                    <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/">
                        <Typography>Manage Page </Typography>
                        </NavLink>
                    </AccordionDetails>
                    <AccordionDetails>
                        <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/Manager">
                            <Typography>Staff Management </Typography>
                        </NavLink>
                    </AccordionDetails>
                </>
                }
                {role_name != "" &&
                    <AccordionDetails>
                                {/* <Link to="/signup"> */}
                                    <Typography onClick={signout}>  
                                        Sign Out
                                    </Typography>
                                {/* </Link> */}
                    </AccordionDetails>        
                }
            </Accordion>
        
        </>
    )
    

}

export default Navbar