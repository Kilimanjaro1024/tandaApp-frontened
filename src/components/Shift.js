// import React from "react";

// const Shift = (props) => {
//     const convertWorkedToFraction = (hours, minutes) => {
//         return (hours + (minutes / 60)).toFixed(2)
//       }
    
//       const convertToCents = (num) => {
//         if ((num / 60) * (props.thisOrg.data.hourly_rate * 10) < 10) {
//           return "0" + num;
//         } else return (num / 60) * (props.thisOrg.data.hourly_rate * 10);
//       };
    
//       const convertMinutes = (start, end, break_length) => {
//         // console.log(break_length);
//         if (-(end - start) > 0) {
//           if (
//             -(end - start) - break_length < 10 &&
//             -(end - start) - break_length >= 0
//           ) {
//             return "0" + -(end - start);
//           } else if (-(end - start) - break_length < 0) {
//             const remainder = -(end - start) - break_length;
//             // console.log(remainder);
//             return -(end - start) + (60 + remainder);
//           } else return -(end - start);
//         } else {
//           if (end - start - break_length < 10 && end - start - break_length >= 0) {
//             return "0" + (end - start);
//           } else if (end - start - break_length < 0) {
//             const remainder = end - start - break_length;
//             // console.log(remainder);
//             if (-(end - start) + (60 - remainder) < 60) {
//               return -(end - start) + (60 - remainder);
//             }
//             else{
//               return -(end - start) + (60 - break_length);
//             }
//           } else return end - start;
//         }
//       };
    
//       const adjustHours = (startMin, endMin, startHr, endHr, break_length) => {
//         // console.log(-(endMin - startMin));
//         if (-(endMin - startMin) - break_length > 0) {
//           return -(endHr - startHr) - 1;
//         } else if (-(endMin - startMin) - break_length < 0) {
//           // console.log(-(endMin - startMin) - break_length);
//           return -(endHr - startHr) - 1;
//         } else return -(endHr - startHr);
//       };
    
//       const adjustTime = (hours, minutes) => {
//         if (hours < 11) {
//           if (minutes < 10) {
//             return hours + ":0" + minutes + "am";
//           } else {
//             return hours + ":" + minutes + "am";
//           }
//         } else if (hours >= 12) {
//           if (hours > 12) {
//             if (minutes < 10) {
//               return Math.round(hours / 2) + ":0" + minutes + "pm";
//             } else {
//               return Math.round(hours / 2) + ":" + minutes + "pm";
//             }
//           } else {
//             if (minutes < 10) {
//               return hours + ":0" + minutes + "pm";
//             } else {
//               return hours + ":" + minutes + "pm";
//             }
//           }
//         }
//       };
//   return (
//       <div>
//           {props.lastState.map((shift, key) => {
                   
//               return (
//                 <tr>
//                   <th>{shift.name}</th>
//                   <th>
//                     {new Date(shift.start).getDate()}-
//                     {new Date(shift.start).getMonth()}-{" "}
//                     {new Date(shift.start).getFullYear()}
//                   </th>
//                   <th>
//                     {adjustTime(
//                       parseInt(new Date(shift.start).getUTCHours()),
//                       parseInt(new Date(shift.start).getUTCMinutes())
//                     )}
//                   </th>
//                   <th>
//                     {adjustTime(
//                       parseInt(new Date(shift.end).getUTCHours()),
//                       parseInt(new Date(shift.end).getUTCMinutes())
//                     )}
//                   </th>
//                   <th>{shift.break_length}</th>
//                   <th>
//                     {adjustHours(
//                       parseInt(new Date(shift.start).getUTCMinutes()),
//                       parseInt(new Date(shift.end).getUTCMinutes()),
//                       parseInt(new Date(shift.end).getUTCHours()),
//                       parseInt(new Date(shift.start).getUTCHours()),
//                       shift.break_length
//                     )}
//                     :
//                     {convertMinutes(
//                       parseInt(new Date(shift.start).getUTCMinutes()),
//                       parseInt(new Date(shift.end).getUTCMinutes()),
//                       shift.break_length
//                     )}
//                   </th>
//                   <th>
//                     {
//                     (convertWorkedToFraction(adjustHours(
//                       parseInt(new Date(shift.start).getUTCMinutes()),
//                       parseInt(new Date(shift.end).getUTCMinutes()),
//                       parseInt(new Date(shift.end).getUTCHours()),
//                       parseInt(new Date(shift.start).getUTCHours()),
//                       shift.break_length
//                     ), convertMinutes(
//                       parseInt(new Date(shift.start).getUTCMinutes()),
//                       parseInt(new Date(shift.end).getUTCMinutes()),
//                       shift.break_length
//                     ))  *
//                       props.thisOrg.data.hourly_rate).toFixed(2)}
                    
//                   </th>
//                 </tr>
//               );
//             })}
//       </div>
//   );
// };

// export default Shift;
