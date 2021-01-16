import React from "react";
import {
    Redirect,
    Route,
} from "react-router-dom";

import getUserToken from '../../utils'


const ProtectedRoute = ({ path, component: Component, data, ...rest }) => {
    if (!getUserToken()) {
        return (
            <Redirect to={{
                pathname: "/login",
                state: { from: path }
            }} />
        )
    } else {
        return <Route {...rest} exact path={path} component={Component} />
    }
};
export default ProtectedRoute;