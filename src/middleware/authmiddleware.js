
import React from "react";
import { Navigate } from "react-router-dom";

const Authmiddleware = ({ children }) => {

    return localStorage.getItem('user') ? children : <Navigate to="/" />;
}

export default Authmiddleware;