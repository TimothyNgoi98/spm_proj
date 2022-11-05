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
import Hrroles from './molecule/hrjobroles';
import Hraddjobrole from './molecule/hraddjobrole';
import SelectCourse from './molecule/selectcourse';
import SelectJobRole from './molecule/selectrole';
import ConfirmCourseMapping from './molecule/confirmcoursemapping'
import Jobroleskills from './molecule/jobroleskills';
import Confirmjobrolemapping from './molecule/confirmjobrolemapping';
import Main from "./molecule/main"
import All from "./molecule/all"
import Ljviewcourse from './molecule/ljviewcourse';
import Ljaddskills from './molecule/ljaddskills';
// Import ALL material UI things here


function App() {
  return (
    <div className="App">

          <Navbar />
          <Routes>
            <Route path="/" element = {<All />} />
            <Route path="/signin" element ={<Signin />} />
            {/* Protected Routes for User */}
            <Route element = {<ProtectedRoutesforUser />}>
              <Route path="/user" element ={<User />} />
              <Route path="/main" element= {<Main/>}/>
              <Route path="/learningjourney" element = {<Home />} />
              <Route path="/learningjourneyviewcourse" element = {<Ljviewcourse />} />
              <Route path="/learningjourneyaddskills" element={<Ljaddskills/>} />
 
                {/* Protected Routes for HR */}
                <Route element = {<ProtectedRoutesforhr />}>
                  <Route path="/Hradmin" element = {<Hrskills/>}/>
                  <Route path="/Hraddskill" element = {<Hraddskill/>}/>
                  <Route path="/mappings" element = {<Coursemapping/>}/>
                  <Route path="/courseskills" element = {<Courseskills/>}/>
                  <Route path="/selectjobrole" element = {<SelectJobRole/>}/>
                  <Route path="/selectcourse" element = {<SelectCourse/>}/>
                  <Route path="/jobroleskills" element = {<Jobroleskills/>}/>
                  <Route path="/confirmcoursemapping" element = {<ConfirmCourseMapping/>}/>
                  <Route path="/confirmjobrolemapping" element = {<Confirmjobrolemapping/>}/>
                  <Route path="/hrarchiveskills" element= {<Hrarchiveskills/>}/>
                  <Route path="/Hrjobrole" element = {<Hrroles/>}/>
                  <Route path="/Hraddjobrole" element = {<Hraddjobrole/>}/>
                  <Route path="/Hrarchivedjobroles" element = {<Hraddjobrole/>}/>

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
