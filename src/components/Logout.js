import React from "react";

const Logout = (props) => {
  return (
    <p>
      Logged in as {sessionStorage.getItem("user")}{" "}
      <span
        onClick={() => {
          sessionStorage.clear();
          props.history.push("/");
        }}
      >
        Log Out
      </span>
    </p>
  );
};

export default Logout;
