import axios from "axios";
import React from "react";

const Shifts = (props) => {
  let start_time = null;
  let end_time = null;
  const createShift = (shiftData) => {
    axios.post(
      props.url + "/shifts",
      {
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

  const convertToDatetime = () => {
    start_time = new Date(formData.date[0] + " " + formData.start[0]);
    end_time = Date(formData.date[0] + " " + formData.end[0] + " GMT");
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: [event.target.value],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent Form from Refreshing
    console.log("hello")
    convertToDatetime();
    createShift(formData);
  };
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
            <input
              type="button"
              onClick={
                handleSubmit
              }
            />
          </th>
        </tr>
      </table>
    </div>
  );
};

export default Shifts;
