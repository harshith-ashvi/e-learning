import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const Layout = (props) => {
    const user = useSelector(state => state.user)

    const { isLoading, data } = user

    return (
        <>
            <Navbar loading={isLoading} data={data}/>
        </>
    )
}

export default Layout