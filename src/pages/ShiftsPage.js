import React from "react";
import EditOrg from "../components/EditOrg";
import Logout from "../components/Logout";
import Shifts from "../components/Shifts";


const ShiftsPage = (props) => {
  return (
    <div>
      <Logout history={props.history} />
      <Shifts
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

export default ShiftsPage;