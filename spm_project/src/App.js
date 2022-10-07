// Import All React Related files here
import './App.css';
import * as React from 'react';


// Import All Router Links here
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

// Import All Redux ToolKit here

// Import all the molecules files here
import Home from './molecule/home';
import Signin from "./molecule/signin";
import Manager from './molecule/manager';
import Navbar from './molecule/navbar';
import ProtectedRoutesforUser from './ProtectedRoutes/protectedroutesforuser';
import ProtectedRoutesforhr from './ProtectedRoutes/protectedroutesforhr';
import ProtectedRoutesformanager from './ProtectedRoutes/protectedroutesformanager';
import Hrskills from './molecule/hrskills';
import Coursemapping from './molecule/coursemapping';
import Courseskills from './molecule/courseskills'

// Import ALL material UI things here


function App() {
  return (
    <div className="App" style={{height: "100%", backgroundColor: "#edf2f4"}}>

          <Navbar />
          <Routes>
            <Route path="/" element = {<Home />} />
            <Route path="/signin" element ={<Signin />} />
            {/* Protected Routes for User */}
            <Route element = {<ProtectedRoutesforUser />}>
              
            </Route>

            {/* Protected Routes for HR */}
            <Route element = {<ProtectedRoutesforhr />}>
              <Route path="/Hradmin" element = {<Hrskills/>}/>
              <Route path="/mappings" element = {<Coursemapping/>}/>
              <Route path ="/courseskills" element = {<Courseskills/>}/>
            </Route>

            {/* Protected Routes for Manager  */}
            <Route element = {<ProtectedRoutesformanager />}>
              <Route path="/Manager" element = {<Manager/>}/>
            </Route>

          </Routes>
    </div>
  );
}

export default App;
