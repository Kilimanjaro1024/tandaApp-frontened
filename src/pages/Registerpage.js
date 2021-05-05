import React from "react";
import Register from "../components/Register";

const RegisterPage = (props) => {
  return (
    <div>
      <Register url={props.url} history={props.history} />
    </div>
  );
};

export default RegisterPage;
