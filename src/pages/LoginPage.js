import React, { useState } from "react";
import Login from "../components/Login";
import Home from "../components/Home";

const LoginPage = (props) => {
  return (
    <Login
      url={props.url}
      setUser={props.setUser}
      user={props.user}
      history={props.history}
      orgId={props.orgId}
      setOrgId={props.setOrgId}
    />
  );
};

export default LoginPage;
