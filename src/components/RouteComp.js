import React from "react";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const RouteComp = (props) => {
    return (
        <>
           <Route path="/" component={Home} exact/> 
           <Route path="/register" component={Register} />
           <Route path="/login" component={Login} />
        </>
    )
}

export default RouteComp