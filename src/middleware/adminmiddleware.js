
import React from "react";
import { Navigate } from "react-router-dom";

const AdminAuthmiddleware = ({ children }) => {

    return localStorage.getItem('adminToken') ? children : <Navigate to="/" />;
}

export default AdminAuthmiddleware;