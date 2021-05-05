import axios from "axios";
import React, { useEffect, useState } from "react";

const Shifts = (props) => {
  const [refresh, setRefresh] = useState(false);
  const [shifts, setShifts] = useState([]);
  const [thisOrg, setThisOrg] = useState({});
  const [user, setUser] = useState({});
  let name = "";
  let thisOrgsShifts = [];
  const [lastState, setLastState] = useState([]);

  const getUser = () => {
    axios
      .get(props.url + "/users/" + sessionStorage.getItem("id"), {
        headers: { authorization: "bearer " + sessionStorage.getItem("token") },
      })
      .then((user) => {
        setUser(user.data);
      });
  };

  const getAllShifts = () => {
    axios
      .get(props.url + "/orgshifts", {
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
        sessionStorage.setItem("this_org_id", org.data.id);
        setThisOrg(org);
      })
      .then(() => setRefresh());
  };
  
  const convertWorkedToFraction = (hours, minutes) => {
    return (hours + (minutes / 60)).toFixed(2)
  }

  const convertToCents = (num) => {
    if ((num / 60) * (thisOrg.data.hourly_rate * 10) < 10) {
      return "0" + num;
    } else return (num / 60) * (thisOrg.data.hourly_rate * 10);
  };

  const convertMinutes = (start, end, break_length) => {
    // console.log(break_length);
    if (-(end - start) > 0) {
      if (
        -(end - start) - break_length < 10 &&
        -(end - start) - break_length >= 0
      ) {
        return "0" + -(end - start);
      } else if (-(end - start) - break_length < 0) {
        const remainder = -(end - start) - break_length;
        // console.log(remainder);
        return -(end - start) + (60 + remainder);
      } else return -(end - start);
    } else {
      if (end - start - break_length < 10 && end - start - break_length >= 0) {
        return "0" + (end - start);
      } else if (end - start - break_length < 0) {
        const remainder = end - start - break_length;
        // console.log(remainder);
        if (-(end - start) + (60 - remainder) < 60) {
          return -(end - start) + (60 - remainder);
        }
        else{
          return -(end - start) + (60 - break_length);
        }
      } else return end - start;
    }
  };

  const adjustHours = (startMin, endMin, startHr, endHr, break_length) => {
    // console.log(-(endMin - startMin));
    if (-(endMin - startMin) - break_length > 0) {
      return -(endHr - startHr) - 1;
    } else if (-(endMin - startMin) - break_length < 0) {
      // console.log(-(endMin - startMin) - break_length);
      return -(endHr - startHr) - 1;
    } else return -(endHr - startHr);
  };

  const adjustTime = (hours, minutes) => {
    if (hours < 11) {
      if (minutes < 10) {
        return hours + ":0" + minutes + "am";
      } else {
        return hours + ":" + minutes + "am";
      }
    } else if (hours >= 12) {
      if (hours > 12) {
        if (minutes < 10) {
          return Math.round(hours / 2) + ":0" + minutes + "pm";
        } else {
          return Math.round(hours / 2) + ":" + minutes + "pm";
        }
      } else {
        if (minutes < 10) {
          return hours + ":0" + minutes + "pm";
        } else {
          return hours + ":" + minutes + "pm";
        }
      }
    }
  };
  const createShift = (shiftData, start_time, end_time) => {
    console.log(start_time);
    console.log(end_time);
    console.log(user[0].name)
    axios
      .post(
        props.url + "/orgshifts",
        {
          org: sessionStorage.getItem("this_org_id"),
          user_id: sessionStorage.getItem("id"),
          start: start_time,
          end: end_time,
          break_length: shiftData.break_length[0],
          name: user[0].name
        },
        {
          headers: {
            authorization: "bearer " + sessionStorage.getItem("token"),
          },
        }
      )
      .then((shift) => {
        name = 
        console.log(typeof thisOrg.data.id);
        console.log(typeof shift.data.org + " This is org");
        console.log(typeof shift.data.id);
        console.log(parseInt(sessionStorage.getItem("org_id")));
        console.log(shift);
      });
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
    setRefresh(true);
  };

  const createShiftList = () => {
    for (let shift = 0; shift < shifts.length; shift++) {
      console.log(shifts[shift].org);
      if (shifts[shift].org === thisOrg.data.id) {
        console.log(shifts[shift]);
        thisOrgsShifts.push(shifts[shift]);
        console.log(thisOrgsShifts);
      }
    }
  }

  useEffect(() => {
    getUser();
    getOrg();
    getAllShifts();
    createShiftList()
    setLastState(thisOrgsShifts);
    
    // console.log(users);
  }, [refresh]);
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
            {lastState.map((shift, key) => {
             
              return (
                <tr>
                  <th>{shift.name}</th>
                  <th>
                    {new Date(shift.start).getDate()}-
                    {new Date(shift.start).getMonth()}-{" "}
                    {new Date(shift.start).getFullYear()}
                  </th>
                  <th>
                    {adjustTime(
                      parseInt(new Date(shift.start).getUTCHours()),
                      parseInt(new Date(shift.start).getUTCMinutes())
                    )}
                  </th>
                  <th>
                    {adjustTime(
                      parseInt(new Date(shift.end).getUTCHours()),
                      parseInt(new Date(shift.end).getUTCMinutes())
                    )}
                  </th>
                  <th>{shift.break_length}</th>
                  <th>
                    {adjustHours(
                      parseInt(new Date(shift.start).getUTCMinutes()),
                      parseInt(new Date(shift.end).getUTCMinutes()),
                      parseInt(new Date(shift.end).getUTCHours()),
                      parseInt(new Date(shift.start).getUTCHours()),
                      shift.break_length
                    )}
                    :
                    {convertMinutes(
                      parseInt(new Date(shift.start).getUTCMinutes()),
                      parseInt(new Date(shift.end).getUTCMinutes()),
                      shift.break_length
                    )}
                  </th>
                  <th>
                    {
                    (convertWorkedToFraction(adjustHours(
                      parseInt(new Date(shift.start).getUTCMinutes()),
                      parseInt(new Date(shift.end).getUTCMinutes()),
                      parseInt(new Date(shift.end).getUTCHours()),
                      parseInt(new Date(shift.start).getUTCHours()),
                      shift.break_length
                    ), convertMinutes(
                      parseInt(new Date(shift.start).getUTCMinutes()),
                      parseInt(new Date(shift.end).getUTCMinutes()),
                      shift.break_length
                    ))  *
                      thisOrg.data.hourly_rate).toFixed(2)}
                    
                  </th>
                </tr>
              );
            })}

            <tr>
              <th>{sessionStorage.getItem("user")}</th>
              <th>
                <input type="text" name="date" placeholder={"YYYY-MM-DD"} onChange={handleChange} />
              </th>
              <th>
                <input type="text" name="start" placeholder={"HH:MM:SS"} onChange={handleChange} />
              </th>
              <th>
                <input type="text" name="end" placeholder={"HH:MM:SS"} onChange={handleChange} />
              </th>
              <th>
                <input
                  type="number"
                  name="break_length"
                  placeholder={"Break Length"}
                  onChange={handleChange}
                />
              </th>
              <th>
                <input type="button" value="create shift" onClick={handleSubmit} ></input>
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
