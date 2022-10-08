// Import All React Related files here
import React, {useState, useEffect} from 'react';
import './roles.css'
import './home.js'
import axios from "axios";

// Import All Router Links here

// Import All Redux ToolKit here

// Import all the molecules files here

// Import ALL material UI things here
import Grid from '@mui/material/Grid';

function Roles() {

    const [posts, setPosts] = useState([])

    // useEffect(() => {
    //     const loadJobs = async () => {
    //     const response = await axios.get("http://127.0.0.1:5000/api/jobrole");
    //     console.log(response.json().data)
    //     setPosts(response.json().data);

    //   }
    //   loadJobs();
    // }, []);

    // console.log(typeof posts)
    // console.log(posts)

    useEffect(() => {

        const LoadJobs = async () => {
          let response = await fetch("http://127.0.0.1:5000/api/jobrole")
            response = await response.json()
            setPosts(response.data)
        }
        LoadJobs();
      },[])
      console.log(typeof posts)
      console.log(posts)


      const renderCard = (card) => {
        return (
            <div>
                <Grid item xs={4}>
                    <div className='Card'>
                        {/* <div className='upper-container'>
                            <div className='image-container'> 
                                <img src="https://cdn2.vectorstock.com/i/1000x1000/98/61/cartoon-man-working-at-laptop-vector-13379861.jpg" alt='' height='100px' with='100px'/>
                            </div> 
                        </div>      */}

                        <div className='lower-container'>
                            <h4>{ card.jobrole_name }</h4>
                            <p>{ card.jobrole_desc }</p>
                            <button>Add Role to Learning Journey</button>
                        </div>
                    </div>
                </Grid>
            </div>

          
        );
      };

    return <div className="grid">{posts.map(renderCard)}</div>;
    }




export default Roles;