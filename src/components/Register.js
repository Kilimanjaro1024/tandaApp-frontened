import React from "react";
import axios from "axios";

const Register = (props) => {
  //#region Form Functions
  const handleRegister = (registerInfo) => {
    axios
      .post(props.url + "/users", {
        name: registerInfo.name[0],
        email_address: registerInfo.email_address[0],
        password: registerInfo.password[0],
        organisation_id: 0,
      })
      .then((data) => {});
  };

  const emptyRegisterFormData = {
    name: "",
    email_address: "",
    password: "",
    organisation_id: 0,
  };

  let submited_password = "";
  let confirm_password = "";

  const [formData, setFormData] = React.useState(emptyRegisterFormData);

  //Function that makes sure both password and confirm password match befor running the create user function
  const handleChange = (event) => {
    console.log(event.target.name);
    if (event.target.name === "submited_password") {
      console.log("hi");
      submited_password = event.target.value;
      console.log(submited_password);
    }
    if (event.target.name === "confirm_password") {
      confirm_password = event.target.value;
      console.log(confirm_password);
    }
    if (submited_password === confirm_password) {
      setFormData({ ...formData, password: [submited_password] });
    }
    if (
      event.target.name !== "submited_password" &&
      event.target.name !== "confirm_password"
    ) {
      console.log("name");
      setFormData({
        ...formData,
        [event.target.name]: [event.target.value],
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent Form from Refreshing
    console.log(formData);
    handleRegister(formData); // update passed down state from App.js with the form data
    if (formData.password !== "") {
      props.history.push("/");
    }
  };
  //#endregion

  return (
    <div>
      <div>
        <h1 onClick={() => props.history.push("/")}>Back</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <h2>Username:</h2>
          <input type="text" name="name" onChange={handleChange} />
          <h2>Email:</h2>
          <input type="text" name="email" onChange={handleChange} />
          <h2>Password:</h2>
          <input
            type="password"
            name="submited_password"
            onChange={handleChange}
          />
          <h2>Confirm Password:</h2>
          <input
            type="password"
            name="confirm_password"
            onChange={handleChange}
          />
          <br />
          <input
            style={{ margin: "15px 0 5px" }}
            type="submit"
            value="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
