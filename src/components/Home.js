import React, { useEffect } from "react";

import Logout from "./Logout";
import JoinOrg from "./JoinOrg";
import OrgForm from "./OrgForm";
import MyOrgs from "./MyOrgs";

const Home = (props) => {
  console.log(props);
  useEffect(() => {
    props.setOrgId(parseInt(sessionStorage.getItem("org_id")));
  }, [props.refresh]);
  if (props.orgId < 1) {
    return (
      <div>
        <Logout history={props.history} />
        <JoinOrg
          history={props.history}
          url={props.url}
          create={props.create}
          selectedOrg={props.selectedOrg}
          setSelectedOrg={props.setSelectedOrg}
          refresh={props.refresh}
          setRefresh={props.setRefresh}
        />
        <OrgForm
          orgId={props.orgId}
          url={props.url}
          refresh={props.refresh}
          setRefresh={props.setRefresh}
        />
      </div>
    );
  } else {
    return (
      <div>
        <Logout history={props.history} />
        <MyOrgs orgId={props.orgId} url={props.url} />
      </div>
    );
  }
};

export default Home;
