// import { useRef } from "React"
import { Outlet } from "react-router";
import { useSelector,useDispatch } from "react-redux";
import React, { Component } from 'react';
import Signin from "../molecule/signin";

const useAuthforuser = () => {
    const role_name = useSelector((state) => state.session.rolename)

    if (role_name == "User" || role_name == "Admin" || role_name == "Manager" || role_name == "Trainer") {
        return true
    }
    else {
        return false
    }
}

const ProtectedRoutesforuser = () => {
    const isAuth = useAuthforuser()
    return isAuth ? <Outlet/> : <Signin />


}

export default ProtectedRoutesforuser;