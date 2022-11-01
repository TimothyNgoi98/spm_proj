import { v4 as uuidv4 } from 'uuid';
import Card from './rolecard';
import './roles.css'
import Grid from '@mui/material/Grid';


function RoleCardList({jobroles}) {
        return (
            <div className='card-list' >
                <Grid container spacing={5}>
                {/* <Grid className="display-card" key={uuidv4()}  > */}
                    {jobroles.map((jobrole) => {
                        return(
                        // <Grid item xs={4}>
                        <Grid className="display-card" key={uuidv4()} item xs={3} >
                            <Card jobrole={jobrole} key={jobrole.id}/>
                        </Grid>
                        // {/* </Grid> */}
                        )
                        })}
                {/* </Grid> */}
                </Grid>
            </div>
        )
}

export default RoleCardList;