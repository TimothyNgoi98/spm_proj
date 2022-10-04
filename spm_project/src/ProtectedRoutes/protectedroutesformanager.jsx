// import { useRef } from "React"
import { Outlet } from "react-router";
import { useSelector,useDispatch } from "react-redux";
import React, { Component } from 'react';
import Signin from "../molecule/signin";

const useAuthformanager = () => {

    const role_name = useSelector((state) => state.session.rolename)

    if (role_name == "Manager") {
        return true
    }
    else {
        return false
    }
}

const ProtectedRoutesformanager = () => {
    const isAuth = useAuthformanager()
    return isAuth ? <Outlet/> : <Signin />


}

export default ProtectedRoutesformanager;