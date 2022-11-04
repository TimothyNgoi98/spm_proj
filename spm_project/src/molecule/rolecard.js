import './roles.css'
import Grid from '@mui/material/Grid';
import {useNavigate} from 'react-router-dom';
import {useDispatch } from 'react-redux';
import { setjobrole_desc, setjobrole_id, setjobrole_name} from '../reduxslice/jobrolesSlice'


const Card = ({jobrole}) =>  {
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
   
                <Grid  className='display-card'>
                    <div className='Card'>
                        <div className='lower-container'>
                            <h4>{ jobrole_name }</h4>
                            <p>{ jobrole_desc }</p>
                            <p> <b>Department:</b> { department }</p>
                            <button onClick={() => redirect()}>Select role for Learning Journey</button>
                        </div>
                    </div>
                </Grid>

        )
}

export default Card 