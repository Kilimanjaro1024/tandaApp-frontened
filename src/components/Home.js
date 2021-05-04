import React, { useEffect } from "react";

import Logout from "./Logout";
import JoinOrg from "./JoinOrg";
import OrgForm from "./OrgForm";

const Home = (props) => {
  let orgId=parseInt(sessionStorage.getItem("org_id"))
  console.log(sessionStorage.getItem("org_id"));

  useEffect(() => {

  }, [])
  if (orgId < 1) {
    return (
      <div>
        <Logout history={props.history}/>
        <JoinOrg url={props.url} create={props.create}/>
        <OrgForm orgId={orgId} url={props.url}/>
      </div>
    );
  } else {
    return (
      <div>
        der
        <Logout history={props.history}/>
        <OrgForm orgId={orgId} url={props.url}/>
      </div>
    );
  }
};

export default Home;
