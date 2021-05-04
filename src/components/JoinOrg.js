import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";

const JoinOrg = (props) => {
  const [orgs, setOrgs] = useState([]);
  const getOrgs = () => {
    axios
      .get(props.url + "/organisations", {
        headers: { authorization: "bearer " + sessionStorage.getItem("token") },
      })
      .then((orgs) => {
        setOrgs(orgs.data);
      });
  };

  const joinOrg = (user, id) => {
    axios
      .put(
        props.url + "/users/" + sessionStorage.getItem("id"),
        {
          ...user,
          organisation_id: id,
        },
        {
          headers: {
            authorization: "bearer " + sessionStorage.getItem("token"),
          },
        }
      )
      .then((user) => {
        console.log(user)
        sessionStorage.setItem("org_id", user.data.organisation_id)
      })
      
  };

  useEffect(() => {
    getOrgs();
  }, []);

  return (
    <div>
      <p>
        You aren't a member of any organizations.
        <br />
        Join and existing one or create a new one.
      </p>
      <h1>Organizations</h1>
      {orgs.map((org, key) => {
        return (
          <div>
            <h1>{org.name}</h1>
            <Link>Edit</Link>
            <span
              onClick={() => {
                joinOrg(sessionStorage.getItem("id"), org.id);
              }}
            >
              Join
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default JoinOrg;
