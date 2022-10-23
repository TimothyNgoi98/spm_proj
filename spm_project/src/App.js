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
import User from './molecule/user'
import Hrskills from './molecule/hrskills';
import Hraddskill from './molecule/hraddskill';
import Coursemapping from './molecule/coursemapping';
import Courseskills from './molecule/courseskills'
import Viewskills from './molecule/viewskills';
import Hrarchiveskills from './molecule/hrarchiveskills';

// Import ALL material UI things here


function App() {
  return (
    <div className="App">

          <Navbar />
          <Routes>
            <Route path="/" element = {<Home />} />
            <Route path="/signin" element ={<Signin />} />
            {/* Protected Routes for User */}
            <Route element = {<ProtectedRoutesforUser />}>
              <Route path="/user" element ={<User />} />
                {/* Protected Routes for HR */}
                <Route element = {<ProtectedRoutesforhr />}>
                  <Route path="/Hradmin" element = {<Hrskills/>}/>
                  <Route path="/Hraddskill" element = {<Hraddskill/>}/>

                  <Route path="/mappings" element = {<Coursemapping/>}/>
                  <Route path ="/courseskills" element = {<Courseskills/>}/>
                  <Route path="/hrarchiveskills" element= {<Hrarchiveskills/>}/>
                </Route>

                {/* Protected Routes for Manager  */}
                <Route element = {<ProtectedRoutesformanager />}>
                  <Route path="/Manager" element = {<Manager/>}/>
                </Route>
              <Route path="/Viewskills" element ={<Viewskills />} />
            </Route>
          </Routes>
    </div>
  );
}

export default App;
