import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


export function PrivateRoute({ children }) {
    const auth = useSelector((state) => state.auth);
    console.log("authP", auth);
    console.log("authtoken", auth.token);
    return (
        auth.token ? children : <Navigate to="/login" />
    )
}


export function PublicRoute({ children }) {
    const auth = useSelector((state) => state.auth);
    return (
        !auth.token ? children : <Navigate to="/header" />
    )
}

