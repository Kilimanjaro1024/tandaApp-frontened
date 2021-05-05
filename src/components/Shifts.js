import axios from "axios";
import React, { useEffect, useState } from "react";

const Shifts = (props) => {
  const [shifts, setShifts] = useState([]);
  const [thisOrg, setThisOrg] = useState({});
  const [users, setUsers] = useState({});
  const thisOrgsShifts = []

  const getUsers = () => {
    axios
      .get(props.url + "/users", {
        headers: { authorization: "bearer " + sessionStorage.getItem("token") },
      })
      .then((users) => {
        setUsers(users.data);
      })
      .then(() => {
        props.setRefresh(false);
      });
  };

  const getAllShifts = () => {
    axios
      .get(props.url + "/shifts", {
        headers: { authorization: "bearer " + sessionStorage.getItem("token") },
      })
      .then((orgShifts) => {
        setShifts(orgShifts.data);
      });
  };

  const getOrg = () => {
    axios
      .get(props.url + "/organisations/" + sessionStorage.getItem("org_id"), {
        headers: { authorization: "bearer " + sessionStorage.getItem("token") },
      })
      .then((org) => {
        setThisOrg(org);
      });
  };

  const createShift = (shiftData, start_time, end_time) => {
    console.log(start_time);
    console.log(end_time);
    axios.post(
      props.url + "/shifts",
      {
        user_id: sessionStorage.getItem("id"),
        start: start_time,
        end: end_time,
        break_length: shiftData.break_length[0],
      },
      {
        headers: { authorization: "bearer " + sessionStorage.getItem("token") },
      }
    );
  };

  const emptyShiftFormData = {
    date: "",
    start: "",
    end: "",
    break_length: "",
  };

  const [formData, setFormData] = React.useState(emptyShiftFormData);

  const convertToDatetime = (shift_point) => {
    const time = new Date(formData.date[0] + "T" + shift_point + "Z");
    return time;
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: [event.target.value],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent Form from Refreshing
    console.log("hello");
    createShift(
      formData,
      convertToDatetime(formData.start[0]),
      convertToDatetime(formData.end[0])
    );
    props.setRefresh(true);
  };

  useEffect(() => {
    getUsers();
    getOrg();
    getAllShifts();
    for (let shift = 0; shift < shifts.length; shift++) {
      for (let user = 0; user < users.length; user++) {
        if (
          users[user].organisation_id ===
          parseInt(sessionStorage.getItem("org_id"))
        ) {
          if (shifts[shift].user_id == users[user].id) {
            thisOrgsShifts.push(shifts[shift]);
            setShifts(thisOrgsShifts)
            console.log(shifts)
          }
        }
      }
    }
    
    console.log(thisOrg);
    console.log(users);
  }, [props.refresh]);
  const loaded = () => {
    return (
      <div>
        <h1>{thisOrg.data.name}</h1>
        <h3>Shifts</h3>
        <table>
          <tbody>
            <tr>
              <th>Employee Name</th>
              <th>Shift Date</th>
              <th>Start Time</th>
              <th>Finish Time</th>
              <th>Break Length</th>
              <th>Hours Worked</th>
              <th>Shift Cost</th>
            </tr>
            {shifts.map((shift, key) => {
              console.log(shifts);

              return (
                <tr>
                  <th>{shift.user_id}</th>
                  <th>
                    {new Date(shift.start).getDate()}-
                    {new Date(shift.start).getMonth()}-{" "}
                    {new Date(shift.start).getFullYear()}
                  </th>
                  <th>
                    {new Date(shift.start).getUTCHours()}:
                    {new Date(shift.start).getUTCMinutes()}
                  </th>
                  <th>
                    {new Date(shift.end).getUTCHours()}:
                    {new Date(shift.end).getUTCMinutes()}
                  </th>
                  <th>{shift.break_length}</th>
                  <th>
                    {parseInt(new Date(shift.end).getUTCHours()) -
                      parseInt(new Date(shift.start).getUTCHours())}
                    :
                    {parseInt(new Date(shift.end).getUTCMinutes()) -
                      parseInt(new Date(shift.start).getUTCMinutes())}
                  </th>
                </tr>
              );
            })}

            <tr>
              <th>{sessionStorage.getItem("user")}</th>
              <th>
                <input type="text" name="date" onChange={handleChange} />
              </th>
              <th>
                <input type="text" name="start" onChange={handleChange} />
              </th>
              <th>
                <input type="text" name="end" onChange={handleChange} />
              </th>
              <th>
                <input
                  type="number"
                  name="break_length"
                  onChange={handleChange}
                />
              </th>
              <th>
                <input type="button" onClick={handleSubmit} />
              </th>
            </tr>
          </tbody>
        </table>
        <span
          onClick={() => {
            props.history.goBack();
          }}
        >
          Back
        </span>
      </div>
    );
  };
  const loading = () => {
    return <h1>LOADING...</h1>;
  };

  return thisOrg.data ? loaded() : loading();
};

export default Shifts;

// axios.get(props.url + "/users", {
//   headers: {
//     authorization: "bearer " + sessionStorage.getItem("token"),
//   },
// }).then((users) => {
//   console.log(users)
//   console.log(shifts)
//   for(let shift; shift < shifts.length; shift++){
//     console.log(shift)
//     for (let user = 0; user < users.length; user++) {
//       console.log(user)
//       // if(users[user].data.organisation_id === sessionStorage.getItem("org_id") && users[user].data.id === thisOrg.data.id){
//       //   thisOrgsShifts.push(shifts[shift])
//       //   console.log(shifts)
//       // }

//     }
//   }
// });
