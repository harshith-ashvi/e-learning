import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import Layout from "./components/Layout";
import RouteComp from "./components/RouteComp";
import { startGetAdminDetails, startGetStudentDetails } from "./actions/userActions";
import jwtDecode from "jwt-decode";

const App = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      const decode = jwtDecode(token)
      if(decode.role === "admin") {
        dispatch(startGetAdminDetails(token))
      } else {
        dispatch(startGetStudentDetails(decode._id, token))
      } 
    }
  }, [])

  return (
    <Router>
      <Layout/>
      <RouteComp/>
    </Router>
  );
}

export default App;
