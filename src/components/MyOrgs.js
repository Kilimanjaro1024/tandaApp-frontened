import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";

const MyOrgs = (props) => {
  const [org, setOrg] = useState([]);
  const getOrg = () => {
    axios
      .get(props.url + "/organisations/" + props.orgId, {
        headers: { authorization: "bearer " + sessionStorage.getItem("token") },
      })
      .then((org) => {
        setOrg(org.data);
      });
  };

  const leaveOrg = (user) => {
    axios
      .put(
        props.url + "/users/" + sessionStorage.getItem("id"),
        {
          ...user,
          organisation_id: 0,
        },
        {
          headers: {
            authorization: "bearer " + sessionStorage.getItem("token"),
          },
        }
      )
      .then((user) => {
        console.log(user);
        sessionStorage.setItem("org_id", user.data.organisation_id);
      });
  };

  useEffect(() => {
    getOrg();
  }, []);

  return (
    <div>
      <h1>My Organizations</h1>
      <h2>{org.name}</h2>
      <span>View Shifts</span>
      <span >Edit</span>
      <span
        onClick={() => {
          leaveOrg(sessionStorage.getItem("id"));
        }}
      >
        Leave
      </span>
    </div>
  );
};

export default MyOrgs;
