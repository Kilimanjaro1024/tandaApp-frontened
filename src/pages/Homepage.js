import React, { useState } from "react";
import Login from "../components/Login"
import Home from "../components/Home"

const Homepage = (props) => {
    console.log(props.url)
    return(
        <Home history={props.history} url={props.url}/>
    )
};

export default Homepage;