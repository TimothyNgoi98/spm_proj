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
                        display: { xs: 'None', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        LJPS |
                    </Typography>
                    <Box display="flex" sx={{ flexGrow: 1 }}>
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
                        {role_name == "User" && 
                        <Box display="flex" >
                            <Box display="flex">
                                <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/">
                                    <Button sx={{color:"white",fontWeight: 700,}} variant="outlined" > 
                                        Home 
                                    </Button>
                                </NavLink>

                                <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/">
                                    <Button sx={{color:"white",fontWeight: 700,}} variant="outlined" > 
                                        Learning Journey
                                    </Button>
                                </NavLink>
                            </Box>
                            <Box display="flex"justifyContent="flex-end">
                            {/* <Link to="/signup"> */}
                                <Button sx={{color:"white", borderRadius:"8px"}} variant="outlined" onClick={signout}>  
                                   Sign Out
                                </Button>
                            {/* </Link> */}
                            </Box>
                        </Box>
                        }

                        {/* HR ####################################################################################################################*/}
                        {role_name == "Human Resource" && 
                        <Box display="flex" >
                            <Box display="flex">
                                <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/Hradmin">
                                    <Button sx={{color:"white",fontWeight: 700,}} variant="outlined" > 
                                        Skills Management
                                    </Button>
                                </NavLink>

                                <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/">
                                    <Button sx={{color:"white",fontWeight: 700,}} variant="outlined" > 
                                        Roles Management
                                    </Button>
                                </NavLink>
                            </Box>
                            <Box display="flex"justifyContent="flex-end">
                            {/* <Link to="/signup"> */}
                                <Button sx={{color:"white", borderRadius:"8px"}} variant="outlined" onClick={signout}>  
                                   Sign Out
                                </Button>
                            {/* </Link> */}
                            </Box>
                        </Box>
                        }

                        {/* Manager ####################################################################################################################* */}
                        {role_name == "Manager" && 
                        <Box display="flex" >
                            <Box display="flex">
                                <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/">
                                    <Button sx={{color:"white",fontWeight: 700,}} variant="outlined" > 
                                        Home 
                                    </Button>
                                </NavLink>

                                <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/Manager">
                                    <Button sx={{color:"white",fontWeight: 700,}} variant="outlined" > 
                                        Staff Management
                                    </Button>
                                </NavLink>
                            </Box>
                            <Box display="flex"justifyContent="flex-end">
                            {/* <Link to="/signup"> */}
                                <Button sx={{color:"white", borderRadius:"8px"}} variant="outlined" onClick={signout}>  
                                   Sign Out
                                </Button>
                            {/* </Link> */}
                            </Box>
                        </Box>
                        }

                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
    

}

export default Navbar