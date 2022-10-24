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
  const [filterParam, setFilterParam] = useState(["All"]) //added for filter

  useEffect(() => {

    const LoadJobs = async () => {
      let response = await fetch("http://127.0.0.1:5000/jobrole/jobrole/")
      response = await response.json()
      setJobroles(response.data)
      setCollection([... new Set(jobroles.map((item)=> item.jobrole_name))]) //currently just using jobrole name as the department to filter by to be change will db have been edited wioth department
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
    const filterData = jobroles.filter((item)=> item.jobrole_name == itemData);
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
            <Searchbar onChangeHandler={onSearchChange} placeholder="Search..."></Searchbar>
          </Grid>
        <Grid item xs={1}></Grid>

        {/* filter function */}

        <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <div className="galleryWrapper">
              <div className="filterItem">
                  <button onClick={()=> setData(jobroles)}>All Job Roles</button>
                  
                  {
                    collection.map((item)=> <button onClick={()=>{gallery_filter(item)}}>{item}</button>)
                  }
              </div>
              <div className="galleryContainer">
                {
                  // data.map((item)=> <div  key={item.jobrole_id}>{item.jobrole_name} {item.jobrole_desc} {item.jobrole_id}</div> )
                  // data.map((item)=> <Card jobroles={item.jobrole_name}/>)
                  <Grid item xs={10}><RoleCardList jobroles={data}/></Grid>
                }
              </div>
            </div>


                {/* <select onChange={(e) => {setFilterParam(e.target.value)}}>
                  <option value="All">Filter By Department</option>
                  <option value="System Analyst">System Analyst</option>
                  <option value="Software Developer">Software Developer</option>
                  <option value="UX UX Designer">UX UX Designer</option>
                </select>  */}

                   
          </Grid>
        <Grid item xs={1}></Grid>

        {/* roles card */}

        <Grid item xs={1}></Grid>
          <Grid item xs={10}><RoleCardList jobroles={filteredJobroles}/></Grid>
        <Grid item xs={1}></Grid>
{/* 
        <Grid item xs={1}></Grid>
          <Grid item xs={10}><Roles></Roles></Grid>
        <Grid item xs={1}></Grid> */}
      </Grid>
  );
  }

  else {
    return (
      <div>
        Please log in.
      </div>
    )
  }
}

export default Home;
