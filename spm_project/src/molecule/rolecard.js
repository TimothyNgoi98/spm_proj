import './roles.css'
import Grid from '@mui/material/Grid';
import {useNavigate} from 'react-router-dom';
import {useDispatch } from 'react-redux';
import { setjobrole_desc, setjobrole_id, setjobrole_name} from '../reduxslice/jobrolesSlice'


const Card = ({jobrole}) =>  {
    const { jobrole_desc, jobrole_id, jobrole_name} = jobrole

    let navigate = useNavigate()
    let dispatch = useDispatch()

    dispatch(setjobrole_desc(jobrole_desc))
    dispatch(setjobrole_id(jobrole_id))
    dispatch(setjobrole_name(jobrole_name))
    // const redirect = () => {
    //     navigate("/Viewskills", {replace: true})
    //   }

    // const redirect = (data) => {
    //     navigate("/Viewskills", {data: data})
    //   }

    const redirect = (data) => {
        navigate("/Viewskills", {state: jobrole})
      }

    // const redirect = (data) => {
    //     navigate("/Viewskills")
    //   }
        return (
            // <div className='lower-container' key={jobrole_id}>
            //     <h2>{jobrole_name}</h2>
            //     <p> {jobrole_desc}</p>
            // </div>

            <div className='display-card'>
                <Grid item xs={4}>
                    <div className='Card'>
                        <div className='lower-container'>
                            <h4>{ jobrole_name }</h4>
                            <p>{ jobrole_desc }</p>
                            {/* <button onClick={redirect}>Add Role to Learning Journey</button> */}
                            <button onClick={() => redirect()}>Add Role to Learning Journey</button>
                        </div>
                    </div>
                </Grid>
            </div>

        )
}

export default Card 