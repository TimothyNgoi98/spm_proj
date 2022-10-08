// Import All React Related files here
import * as React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";


// Import All Router Links here

// Import All Redux ToolKit here

// Import all the molecules files here

// Import ALL material UI things here
import Box from '@mui/material/Box';


function Searchbar({placeholder, onChangeHandler}) {

    // const [searchRole, setSearchRole] = useState("")
    // const [loading, setLoading] = useState(false)
    // const [posts, setPosts] = useState([])

    // useEffect(() => {
    //     const loadPosts = async () => {
    //       setLoading(true);
    //       const response = await axios.get(
    //         "http://127.0.0.1:5000/api/jobrole/"
    //       );

    //     console.log(response.json().data)
    //     setPosts(response.json().data);
    //     setLoading(false);
    //     }

    //     loadPosts();
    //   }, []);
    

    return (
        <div>
            {/* <Box>
                <h3>Search for Roles</h3>
                <input type='text' style={{  marginTop: 20, width: 300, height: 40, fontSize: 20, paddingLeft: 10}} placeholder="Search..." onChange={(e) => setSearchRole(e.target.value)}/>
                    {loading ? (
                    <h4>Loading ...</h4>
                    ) : (
                    posts
                        .filter((value) => {
                        if (searchRole === "") {
                            return value;
                        } else if (
                            value.jobrole_name.toLowerCase().includes(searchRole.toLowerCase())
                        ) {
                            return value;
                        }
                        })
                        .map((item) => <h5 key={item.jobrole_id}>{item.jobrole_desc}</h5>)
                    )}
            </Box> */}


        <input type="search" style={{  marginTop: 20, width: 400, height: 50, fontSize: 20, paddingLeft: 10, borderRadius: 15}} placeholder={placeholder} onChange={onChangeHandler} />
        </div>
    );
}

export default Searchbar; 