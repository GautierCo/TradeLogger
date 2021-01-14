import React from "react";
import { Route, Redirect } from "react-router";

const ProtectedRoutes = ({ component: Component, isAuth, ...rest }) => (
    <>
        <Route {...rest} render={(props) => (isAuth === true ? <Component {...props} /> : <Redirect to="/login" />)} />
    </>
);

export default ProtectedRoutes;
