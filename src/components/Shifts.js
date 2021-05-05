import axios from "axios";
import React, { useEffect, useState } from "react";

const Shifts = (props) => {
  const [shifts, setShifts] = useState([]);
  const getAllShifts = () => {
    axios
      .get(props.url + "/shifts", {
        headers: { authorization: "bearer " + sessionStorage.getItem("token") },
      })
      .then((orgShifts) => {
        setShifts(orgShifts.data);
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
    const time =new Date( formData.date[0] + "T" + shift_point + "Z");
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
  };

  useEffect(() => {
    getAllShifts();
  }, [props.refresh]);
  return (
    <div>
      <h1>org name</h1>
      <h3>Shifts</h3>
      <table>
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
          return <tr>
            <th>{shift.user_id}</th>
            <th>{new Date(shift.start).getDate()}-{new Date(shift.start).getMonth()}- {new Date(shift.start).getFullYear()}</th>
            <th>{new Date(shift.start).getUTCHours()}:{new Date(shift.start).getUTCMinutes()}</th>
            <th>{new Date(shift.end).getUTCHours()}:{new Date(shift.end).getUTCMinutes()}</th>
            <th>{shift.break_length}</th>
            <th>{parseInt(new Date(shift.end).getUTCHours()) -parseInt(new Date(shift.start).getUTCHours())}:{parseInt(new Date(shift.end).getUTCMinutes()) -parseInt(new Date(shift.start).getUTCMinutes())}</th>
          </tr>;
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
            <input type="number" name="break_length" onChange={handleChange} />
          </th>
          <th>
            <input type="button" onClick={handleSubmit} />
          </th>
        </tr>
      </table>
    </div>
  );
};

export default Shifts;
