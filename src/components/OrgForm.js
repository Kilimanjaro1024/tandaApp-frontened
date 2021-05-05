import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const OrgForm = (props) => {
  const [orgs, setOrgs] = useState([]);
  const createOrg = (orgData) => {
    axios
      .post(props.url + "/organisations", {
        name: orgData.name[0],
        hourly_rate: orgData.hourly_rate[0],
      },
      {
        headers: { authorization: "bearer " + sessionStorage.getItem("token") },
      })
  };

  const editOrg = (orgData) => {
    axios
      .put(props.url + "/organisations", {
        name: orgData.name[0],
        hourly_rate: orgData.hourly_rate[0]
      },
      {
        headers: { authorization: "bearer " + sessionStorage.getItem("token") },
      })
  };

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
  
  const handleCreate = (event) => {
    event.preventDefault(); // Prevent Form from Refreshing
    console.log(formData.hourly_rate.type);
    props.setRefresh(true)
    createOrg(formData); // update passed down state from App.js with the form data
  };

  const handleEdit = (event) => {
    event.preventDefault(); // Prevent Form from Refreshing
    console.log(formData);
    editOrg(formData); // update passed down state from App.js with the form data
  };

  if(props.orgId < 1) {
      return (
        <div>
          <h1>Create Organisation</h1>
          <form onSubmit={handleCreate}>
              
              <h2>Name:</h2>
              <input type="text" name="name" onChange={handleChange} />
              <h2>Hourly Rate: $</h2>
              <input type="number" name="hourly_rate" onChange={handleChange} />
              <br />
              <input
                style={{ margin: "15px 0 5px" }}
                type="submit"
                value="Create"
              />
            </form>
        </div>
      );
  }
  else{
    return (
        <div>
          <h1>Edit Organisation</h1>
          <form onSubmit={handleEdit}>
              
              <h2>Name:</h2>
              <input type="text" name="name" onChange={handleChange} />
              <h2>Hourly Rate: $</h2>
              <input type="number" name="hourly_rate" onChange={handleChange} />
              <br />
              <input
                style={{ margin: "15px 0 5px" }}
                type="submit"
                value="Edit"
              />
            </form>
        </div>
      );
  }
};

export default OrgForm;