import './roles.css'
import Grid from '@mui/material/Grid';


const Card = ({jobrole}) =>  {
    const { jobrole_desc, jobrole_id, jobrole_name} = jobrole
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
                            <button>Add Role to Learning Journey</button>
                        </div>
                    </div>
                </Grid>
            </div>

        )
}

export default Card