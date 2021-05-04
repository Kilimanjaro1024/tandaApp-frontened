import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CreateOrg = (props) => {
  const [orgs, setOrgs] = useState([]);
  const getOrgs = () => {
    axios
      .get(props.url + "/organisations", {
        headers: { authorization: "bearer " + sessionStorage.getItem("token") },
      })
      .then((orgs) => {
        setOrgs(orgs.data);
      });
  };

  const hand

  const emptyOrgFormData = {
    name: "",
    hourly_rate: "",
  };

  const [formData, setFormData] = React.useState(emptyOrgFormData);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: [event.target.value],
    });
  };

//   const handleCreate = (event) => {
//     event.preventDefault(); // Prevent Form from Refreshing
//     console.log(formData);
//     handleLogin(formData); // update passed down state from App.js with the form data
//   };

//   const handleEdit = (event) => {
//     event.preventDefault(); // Prevent Form from Refreshing
//     console.log(formData);
//     handleLogin(formData); // update passed down state from App.js with the form data
//   };

  useEffect(() => {
    getOrgs();
  }, []);

  return (
    <div>
      <p>
        You aren't a member of any organizations.
        <br />
        Join and existing one or create a new one.
      </p>
      <h1>Organizations</h1>
      <p>Name</p>
      
    </div>
  );
};

export default CreateOrg;