import React from "react";
import EditOrg from "../components/EditOrg";
import Logout from "../components/Logout";
import OrgForm from "../components/OrgForm";

const EditPage = (props) => {
  return (
    <div>
      <Logout history={props.history} />
      <EditOrg
        history={props.history}
        url={props.url}
        orgId={props.orgId}
        setOrgId={props.setOrgId}
        selectedOrg={props.selectedOrg}
        setSelectedOrg={props.setSelectedOrg}
      />
    </div>
  );
};

export default EditPage;
