import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = (props) => {
  const handleLogin = (loginInfo) => {
    axios
      .post(props.url + "/login", {
        name: loginInfo.name[0],
        password: loginInfo.password[0],
      })
      .then((data) => {
        console.log(data.data);
        props.setUser(data.data);
        sessionStorage.setItem("user", data.data.user.name);
        sessionStorage.setItem("id", data.data.user.id);
        sessionStorage.setItem("email", data.data.user.email);
        sessionStorage.setItem("token", data.data.token);
        sessionStorage.setItem("org_id", data.data.user.organisation_id);
      })
      .then(() => {
        console.log(sessionStorage.getItem("token"));
        props.setOrgId(parseInt(sessionStorage.getItem("org_id")));
      })
      .then(() => {
        console.log(props.user);
        props.history.push("/homepage");
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const emptyLoginFormData = {
    name: "",
    password: "",
  };

  const [formData, setFormData] = React.useState(emptyLoginFormData);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: [event.target.value],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent Form from Refreshing
    console.log(formData);
    handleLogin(formData); // update passed down state from App.js with the form data
    
  };
  return (
    <div>
      <h1>Login</h1>
      <h2>Username:</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <h2>Password:</h2>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <br />
        <input style={{ margin: "10px 0 5px" }} type="submit" value="submit" />
      </form>
      <Link to="/register/">Register</Link>
    </div>
  );
};

export default Login;
