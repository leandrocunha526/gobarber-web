import React from "react";
import { Switch } from "react-router-dom";
import Route from "./routes.jsx";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/register" component={SignUp} />
            <Route path="/dashboard" component={Dashboard} isPrivate />
            <Route
                path="/profile"
                component={Profile}
                isPrivate
            />
        </Switch>
    );
}
