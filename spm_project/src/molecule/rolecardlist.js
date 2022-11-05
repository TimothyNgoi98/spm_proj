import { v4 as uuidv4 } from 'uuid';
import CardRole from './rolecard';
import './roles.css'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';



function RoleCardList({jobroles}) {
        return (
            // sx={{flexGrow: 1,display: { xs: "flex", sm: "none", md: "none" },}}
            <Container marginTop="30px" >
                <Grid container xs={12} spacing={2}>
                {/* <Grid className="display-card" key={uuidv4()}  > */}
                    {jobroles.map((jobrole) => {
                        return(
                        // <Grid item xs={4}>
                        <>
                        <Grid item className="display-card" key={uuidv4()} xs={3} sx={{flexGrow: 1,display: { xs: "none", sm: "flex", md: "flex" },}}>
                            <CardRole jobrole={jobrole} key={jobrole.id}/>
                        </Grid>

                        <Grid item className="display-card" key={uuidv4()} xs={12} sx={{flexGrow: 1,display: { xs: "flex", sm: "none", md: "none" },}}>
                            <CardRole jobrole={jobrole} key={jobrole.id}/>
                        </Grid>
                        </>
                        )
                        })}
                {/* </Grid> */}
                </Grid>
            </Container>
        )
}

export default RoleCardList;