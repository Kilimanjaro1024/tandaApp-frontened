import React from "react";
import Home from "../components/Home";

const Homepage = (props) => {
  console.log(props.url);
  return (
    <Home
      history={props.history}
      url={props.url}
      orgId={props.orgId}
      setOrgId={props.setOrgId}
      selectedOrg={props.selectedOrg}
      setSelectedOrg={props.setSelectedOrg}
      refresh={props.refresh}
      setRefresh={props.setRefresh}
    />
  );
};

export default Homepage;
