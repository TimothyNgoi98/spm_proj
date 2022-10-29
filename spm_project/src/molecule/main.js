// Import All React Related files here
import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import { useState,useEffect, useCallback } from 'react';

// Import All Router Links here

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



function Main() {
    const navigate = useNavigate();

    const [output, setoutput] = useState([])

    // Fetching Async 
    const staff_id = useSelector((state) => state.session.staff_id)
    useEffect(() => {
        // I need to know who have logged in. 
        const result = {"staff_id": staff_id}
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "http://localhost:3000/main"
            },
            body: JSON.stringify(result)
        }
        const fetchMyAPI = async () => {
            let response = await fetch("http://127.0.0.1:5000/learningjourney/displaymain", options)
            response = await response.json()
            setoutput(response.data)
            console.log("This is from hr Skills: " + response.data)
            console.log(response.data)
      }
      
      fetchMyAPI()
    },[])
    const createlj = () => {
        navigate("/learningjourney", {replace: true})
    }
    const ljbutton = (data) => {
        navigate("/learningjourneyviewcourse", {replace: true})

        console.log(data)
    }





    return (
        <Container maxWidth="lg">
            <Box marginTop="5%" marginBottom="5%">
                <Grid container marginBottom="2%">
                    <Grid item xs={12}>
                        <Typography variant="h5">Empower yourself today and take charge of your learning!</Typography>
                    </Grid>
                    <Grid item xs={12} marginTop="2%">
                        <Button variant="contained" onClick={createlj}>Create Learning Journey</Button>
                    </Grid>

                </Grid>
                
                <hr></hr>
                {
                    output.length == 0 ?
                    <Typography marginTop="5px" variant="h5">You do not have any mapped learning journey.</Typography> 
                    :
                    <Typography marginTop="5px" variant="h5">Your Learning Journey: </Typography>
                }

                <Grid container marginTop="5px" justifyContent="center" direction="row" alignItems="center">
                    {/* In Small View */}
                        {output.map((singleoutput)=>
                            <Grid justifyContent="center" alignContent="center" item xs={12} sx={{flexGrow: 1,display: { xs: "flex", sm: "none", md: "none" },}}>
                                <CardActionArea  >
                                    <Card alignContent="center "sx={{minWidth:200}}>
                                        <CardActionArea  onClick={() => ljbutton(singleoutput.learningjourney_id)}>
                                        <CardContent>
                                            <Typography>Learning Journey: {singleoutput.learningjourney_id}</Typography>
                                        </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </CardActionArea >
                            </Grid>
                        )}
                    {/* In Bigger View */}
                    {output.map((singleoutput)=>
                            <Grid justifyContent="center" alignContent="center" marginTop="15px" item xs={4} sx={{flexGrow: 1,display: { xs: "none", sm: "flex", md: "flex" },}}
                            >
                                <CardActionArea onClick={() => ljbutton(singleoutput.learningjourney_id)}>
                                    <Card sx={{minWidth:200}} >
                                        <CardContent>
                                            <Typography >Learning Journey: {singleoutput.learningjourney_id}</Typography>
                                        </CardContent>
                                    </Card>
                                </CardActionArea>
                            </Grid>
                        )}
                </Grid>

            </Box>
        </Container>
  );
}

export default Main;