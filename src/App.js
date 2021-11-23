import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import Layout from "./components/Layout";
import RouteComp from "./components/RouteComp";
import { startGetAdminDetails } from "./actions/userActions";

const App = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      dispatch(startGetAdminDetails(token))
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
