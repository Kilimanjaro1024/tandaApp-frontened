import { Route, Switch } from "react-router-dom";
import "./App.css";
import React from "react";

import Homepage from "./pages/Homepage";
import RegisterPage from "./pages/Registerpage";
import LoginPage from "./pages/LoginPage";

function App() {
  const url = "http://localhost:5000";
  const [user, setUser] = React.useState();

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(rp) => <LoginPage {...rp} url={url} setUser={setUser} user={user} />}
      />
      <Route
          exact
          path="/register"
          render={(rp) => <RegisterPage {...rp} url={url} />}
        />
        <Route exact
          path="/homepage"
          render={(rp) => <Homepage {...rp} url={url}/>}/>
    </Switch>
  );
}

export default App;
