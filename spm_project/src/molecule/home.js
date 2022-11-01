// Import All React Related files here
import * as React from 'react';
import {NavLink,BrowserRouter} from 'react-router-dom';
import axios from "axios";
// Import All Router Links here
import { useState,useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


// Import All Redux ToolKit here

// Import all the molecules files here

// Import ALL material UI things here
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Grid from '@mui/material/Grid';
import Searchbar from './searchbar';
import Roles from './roles';
import RoleCardList from './rolecardlist';
import Card from './rolecard';



function Home() {
  // Check if have logged in
  // Retrieving the session stored:
  const staff_id = useSelector((state) => state.session.staff_id)
  const staff_fname = useSelector((state) => state.session.staff_fname)
  const staff_lname = useSelector((state) => state.session.staff_lname)
  const dept = useSelector((state) => state.session.dept)
  const email = useSelector((state) => state.session.email)
  const role_id = useSelector((state) => state.session.role_id)
  const role_name = useSelector((state) => state.session.rolename)


  const [searchField, setSearchField] = useState('')
  const [jobroles, setJobroles] = useState([]);
  const [filteredJobroles, setFilteredJobroles] = useState(jobroles)
  const [collection,setCollection] = useState([]); //added for filter
  const [data,setData] = useState([]); //added for filter
  const [filterParam, setFilterParam] = useState(false) //added for filter

  useEffect(() => {

    const LoadJobs = async () => {
      let response = await fetch("http://127.0.0.1:5000/jobrole/jobrole")
      // let response = await fetch("http://127.0.0.1:5000/jobrole/view/jobrolesmapped");
      response = await response.json()
      setJobroles(response.data)
      setCollection([... new Set(response.data.map((item)=> item.department))]) //currently just using jobrole name as the department to filter by to be change will db have been edited wioth department
    }
    LoadJobs()
  },[])

  console.log(typeof jobroles)
  console.log(jobroles)
  console.log(collection)

  useEffect(() => {
    const newFilteredJobroles = jobroles.filter((jobrole) => {
      return jobrole.jobrole_name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredJobroles(newFilteredJobroles);
  }, [jobroles, searchField])

  console.log(typeof filteredJobroles)
  console.log(filteredJobroles)


  const onSearchChange = (event) => {
    console.log(event.target.value)
    
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString)
  }

  //added for filter function
  
  const gallery_filter = (itemData) =>{
    const filterData = jobroles.filter((item)=> item.department == itemData);
    setData(filterData);
    console.log(filterData)
  }
  
console.log(data)


  if (staff_id != "") {
  return (
    
      <Grid container spacing={2}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
            Welcome back {staff_fname}, you are a {role_name}.
        </Grid>
        <Grid item xs={1}></Grid>

        {/* search bar */}

        <Grid item xs={1}></Grid>
          <Grid item xs={10}>
          {/* {filterParam === 'true' && */}
            <Searchbar onChangeHandler={onSearchChange} placeholder="Search..."></Searchbar>
          {/* } */}
          </Grid>
        <Grid item xs={1}></Grid>

        {/* filter function */}

        <Grid item xs={1}></Grid>
          <Grid item xs={10}>

            {searchField.length === 0 &&
            <div className="galleryWrapper">
              <div className="filterItem">
                  <button style={{borderRadius: "50px", padding: "8px 40px"}} onClick={()=> {setData(jobroles) ;setFilterParam(true) }}>All Job Roles</button>
                  {
                  collection.map((item)=> <button style={{borderRadius: "50px", padding: "8px 40px"}} onClick={()=>{gallery_filter(item); setFilterParam(true)}}>{item}</button>)
                  }
              </div>
              <div className="galleryContainer">
                {
                  <Grid item xs={10}>
                    <RoleCardList jobroles={data}/>
                  </Grid>
                }
              </div>
            </div>
            } 
            {/* this serves as if else statement to check if user ahve searched on something alrdy, if have input, then filter function will be gone */}

          </Grid> 
        <Grid item xs={1}></Grid>

        {/* roles card */}
        
        {/* <Grid item xs={1}></Grid> 
        {searchField.length === 0 && filterParam === false &&
          <Grid item xs={10}>
            <RoleCardList jobroles={filteredJobroles}/>
          </Grid>
        }
        {searchField.length > 0 && 
          <Grid item xs={10}>
            <RoleCardList jobroles={filteredJobroles}/>
          </Grid>
        }
        <Grid item xs={1}></Grid> */}


        {/* roles card */}
        
        
        {searchField.length === 0 && filterParam === false &&
        <Grid container>
        <Grid item xs={1}></Grid> 
          <Grid item xs={10}>
            <RoleCardList jobroles={filteredJobroles}/>
          </Grid>
        <Grid item xs={1}></Grid> 
        </Grid> 
        }

        {searchField.length > 0 && 
        <Grid container>
        <Grid item xs={1}></Grid> 
          <Grid item xs={10}>
            <RoleCardList jobroles={filteredJobroles}/>
          </Grid>
        <Grid item xs={1}></Grid> 
        </Grid> 
        }

      </Grid>
  );
  }

}

export default Home;
