// import { useRef } from "React"
import { Outlet } from "react-router";
import { useSelector,useDispatch } from "react-redux";
import React, { Component } from 'react';
import Signin from "../molecule/signin";
import Home from "../molecule/home"

const useAuthforhr = () => {
    const role_name = useSelector((state) => state.session.rolename)
    // alert(role_name)

    if (role_name == "Admin") {
        return true
    }
    else {
        return false
    }
}

const ProtectedRoutesforhr = () => {
    const isAuth = useAuthforhr()
    // console.log(isAuth)
    return isAuth ? <Outlet/> : <Home />


}

export default ProtectedRoutesforhr;