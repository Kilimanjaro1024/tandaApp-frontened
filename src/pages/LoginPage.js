import React from "react";
import Login from "../components/Login";

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
