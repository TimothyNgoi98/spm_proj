// import { v4 as uuidv4 } from 'uuid';
import Card from './rolecard';
import './roles.css'
import Grid from '@mui/material/Grid';


function RoleCardList({jobroles}) {
        return (
            <div className='card-list' >
            <Grid className="display-card" item xs={4}>
                {jobroles.map((jobrole) => {
                    return(
                    <Card jobrole={jobrole} key={jobrole.id}/>
                    )
                    })}
            </Grid>
            </div>
        )
}

export default RoleCardList;