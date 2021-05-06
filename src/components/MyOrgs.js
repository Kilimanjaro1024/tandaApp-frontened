import axios from "axios";
import React, { useEffect, useState } from "react";

//.
const MyOrgs = (props) => {
  const [org, setOrg] = useState([]);

  //#region API Calls

  //Gets the current organisation you belong to
  const getOrg = () => {
    axios
      .get(props.url + "/organisations/" + props.orgId, {
        headers: { authorization: "bearer " + sessionStorage.getItem("token") },
      })
      .then((org) => {
        setOrg(org.data);
      })
      .then(() => {
        props.setRefresh(false);
      });
  };

  // Leave an Organisation
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
    getOrg();
  }, [props.refresh]);

  return (
    <div>
      <h1>My Organizations</h1>
      <h2>{org.name}</h2>
      <span
        onClick={() => {
          props.history.push("/shifts");
        }}
      >
        View Shifts
      </span>
      <span
        onClick={() => {
          selectedOrg(org);
        }}
      >
        Edit
      </span>
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
