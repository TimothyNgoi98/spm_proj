// Import React Related
import * as React from 'react';
import {NavLink,BrowserRouter} from 'react-router-dom';


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




const Navbar = () => {
    return (
        <div>
                <AppBar position="static">
                    <Toolbar >
                        <Box display="flex">
                            <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/">
                                <Button sx={{color:"white"}} variant="outlined" startIcon={<HomeIcon/>} > 
                                    Home 
                                </Button>
                            </NavLink>

                        </Box>

                        {/* Flush Right */}
                        <Box justifyContent="flex-end"  display="flex">
                            {/* <Link to="/signup"> */}
                                <Button sx={{color:"white"}} variant="outlined" >  
                                    <NavLink style={{ color: 'inherit', textDecoration: 'inherit'}} to="/signin"> Login </NavLink>
                                </Button>
                            {/* </Link> */}
                        </Box>

                    </Toolbar>
                </AppBar>
        </div>
    )
}

export default Navbar