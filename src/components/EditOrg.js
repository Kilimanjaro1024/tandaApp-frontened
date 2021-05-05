import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EditOrg = (props) => {
  const [org, setOrg] = useState([]);
  const getOrg = () => {
    axios
      .get(props.url + "/organisations/" + props.selectedOrg, {
        headers: { authorization: "bearer " + sessionStorage.getItem("token") },
      })
      .then((org) => {
        console.log(org.data);
        setOrg(org);
      });
  };

  const [orgs, setOrgs] = useState([]);
  const creatOrg = (orgData) => {
    axios.post(
      props.url + "/organisations",
      {
        name: orgData.name[0],
        hourly_rate: orgData.hourly_rate[0],
      },
      {
        headers: { authorization: "bearer " + sessionStorage.getItem("token") },
      }
    );
  };

  const editOrg = (orgData) => {
    axios.put(
      props.url + "/organisations/" + props.selectedOrg,
      {
        name: orgData.name[0],
        hourly_rate: orgData.hourly_rate[0],
      },
      {
        headers: { authorization: "bearer " + sessionStorage.getItem("token") },
      }
    );
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
    console.log(formData);
    creatOrg(formData); // update passed down state from App.js with the form data
  };

  const handleEdit = (event) => {
    event.preventDefault(); // Prevent Form from Refreshing
    console.log(formData);
    editOrg(formData); // update passed down state from App.js with the form data
  };
  useEffect(() => {
    getOrg();
    
  }, []);

  const loaded = () => {
    return (
      <div>
        <h1>Edit Organisation</h1>
        <form onSubmit={handleEdit}>
          <h2>Name:</h2>
          <input
            type="text"
            name="name"
            placeholder={org.data.name}
            onChange={handleChange}
          />
          <h2>Hourly Rate: $</h2>
          <input
            type="text"
            name="hourly_rate"
            placeholder={org.data.hourly_rate}
            onChange={handleChange}
          />
          <br />
          <input style={{ margin: "15px 0 5px" }} type="submit" value="Edit" />
        </form>
        <span onClick={() => {
          props.history.goBack()
        }}>Back</span>
      </div>
    );
  };

  const loading = () => {
    return <h1>LOADING...</h1>;
  };

  return org.data ? loaded() : loading()
};

export default EditOrg;
