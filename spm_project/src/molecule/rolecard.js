import './roles.css'
import Grid from '@mui/material/Grid';
import {useNavigate} from 'react-router-dom';
import {useDispatch } from 'react-redux';
import { setjobrole_desc, setjobrole_id, setjobrole_name} from '../reduxslice/jobrolesSlice'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';


const CardRole = ({jobrole}) =>  {
    const { jobrole_desc, jobrole_id, jobrole_name, department} = jobrole
    console.log(jobrole)

    let navigate = useNavigate()
    let dispatch = useDispatch()

    // dispatch(setjobrole_desc(jobrole_desc))
    // dispatch(setjobrole_id(jobrole_id))
    // dispatch(setjobrole_name(jobrole_name))
    // dispatch(setskill_ids(skill_ids))

    // const redirect = (data) => {
    //     navigate("/Viewskills", {state: jobrole})
    // }

    const redirect = () => {

        // let jobroleId = jobrole_id;
        // var url = `http://127.0.0.1:5000/jobrole/Viewskills/${jobroleId}`
        // var path = `/jobrole/Viewskills/${jobroleId}`
        // navigate(path)
        navigate("/Viewskills/")
        dispatch(setjobrole_desc(jobrole_desc))
        dispatch(setjobrole_id(jobrole_id))
        dispatch(setjobrole_name(jobrole_name))
        console.log(dispatch(setjobrole_name(jobrole_name)))

        // let jobroleId = jobrole_id;
        // var url = `http://127.0.0.1:5000/jobrole/Viewskills/${jobroleId}`


    }

        return (
   
                // <Grid  className='display-card'>
                //     <div className='Card'>
                //         <div className='lower-container'>
                //             <h4>{ jobrole_name }</h4>
                //             <p>{ jobrole_desc }</p>
                //             <p> <b>Department:</b> { department }</p>
                //             <button onClick={() => redirect()}>Select role for Learning Journey</button>
                //         </div>
                //     </div>
                // </Grid>

            <Grid className="display-card">
                <Card style={{ Width: 150, Height: 150, minHeight:"10vh", marginTop: '30px'}}>
                    <CardActionArea>
                        <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                { jobrole_name }
                                </Typography>
                                <hr/>
                                <Typography variant="body2" color="text.secondary">
                                <p>{ jobrole_desc }</p>
                                </Typography>
                                <br />
                                <Typography variant="body2" color="text.secondary">
                                <p> <b>Department:</b> { department }</p>
                                </Typography>
                                <br />
                                <Typography variant="body2" color="text.secondary">
                                <Button variant="contained"  onClick={() => redirect()}>
                                Select role for Learning Journey
                                </Button>
                                </Typography>
                                <br />
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>





        )
}

export default CardRole 