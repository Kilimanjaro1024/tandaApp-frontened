import axios from "axios";
import React, { useEffect, useState } from "react";

const JoinOrg = (props) => {
  const [orgs, setOrgs] = useState([]);

  //#region API Calls
  const getOrgs = () => {
    axios
      .get(props.url + "/organisations", {
        headers: { authorization: "bearer " + sessionStorage.getItem("token") },
      })
      .then((orgs) => {
        setOrgs(orgs.data);
      })
      .then(() => {
        props.setRefresh(false);
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
        console.log(user);
        sessionStorage.setItem("org_id", user.data.organisation_id);
        props.setRefresh(true);
      });
  };
  //#endregion

  //#region Functions that control moving back and forth while waiting for the page data to load
  const moveToEdit = (_callback) => {
    props.history.push("/edit");
    _callback();
  };
  const selectedOrg = async (org) => {
    await props.setSelectedOrg(org.id);
    moveToEdit(() => {
      console.log(props.selectedOrg);
    });
  };
  //#endregion

  useEffect(() => {
    getOrgs();
  }, [props.refresh]);

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
            <span
              onClick={() => {
                selectedOrg(org);
              }}
            >
              Edit
            </span>
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
