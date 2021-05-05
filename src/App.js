import { Route, Switch } from "react-router-dom";
import "./App.css";
import React, { useEffect, useState } from "react";

import Homepage from "./pages/Homepage";
import RegisterPage from "./pages/Registerpage";
import LoginPage from "./pages/LoginPage";
import EditPage from "./pages/EditPage";
import ShiftsPage from "./pages/ShiftsPage";

function App() {
  const url = "http://localhost:5000";
  const [user, setUser] = useState();
  const [selectedOrg, setSelectedOrg] = useState();
  const [orgId, setOrgId] = useState();
  const [refresh, setRefresh] = useState( false);

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(rp) => (
          <LoginPage
            {...rp}
            url={url}
            setUser={setUser}
            user={user}
            orgId={orgId}
            setOrgId={setOrgId}
          />
        )}
      />
      <Route
        exact
        path="/register"
        render={(rp) => <RegisterPage {...rp} url={url} />}
      />
      <Route
        exact
        path="/homepage"
        render={(rp) => (
          <Homepage
            {...rp}
            url={url}
            orgId={orgId}
            setOrgId={setOrgId}
            selectedOrg={selectedOrg}
            setSelectedOrg={setSelectedOrg}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        )}
      />
      <Route
        exact
        path="/edit"
        render={(rp) => (
          <EditPage
            {...rp}
            url={url}
            orgId={orgId}
            setOrgId={setOrgId}
            selectedOrg={selectedOrg}
            setSelectedOrg={setSelectedOrg}
          />
        )}
      />
      <Route
        exact
        path="/shifts"
        render={(rp) => (
          <ShiftsPage
            {...rp}
            url={url}
            orgId={orgId}
            setOrgId={setOrgId}
            selectedOrg={selectedOrg}
            setSelectedOrg={setSelectedOrg}
          />
        )}
      />
    </Switch>
  );
}

export default App;
