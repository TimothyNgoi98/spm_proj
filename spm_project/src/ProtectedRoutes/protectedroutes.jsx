// import { useRef } from "React"
import { Outlet } from "react-router";
import { useSelector,useDispatch } from "react-redux";
import React, { Component } from 'react';
import Signin from "../molecule/signin";

const useAuth = () => {
    
}

const ProtectedRoutes = () => {
    const isAuth = useAuth()
    return isAuth ? <Outlet/> : <Signin />


}

export default ProtectedRoutes;