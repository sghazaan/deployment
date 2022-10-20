import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const Staff = (props) => ( //Record
 <tr>
   <td>{props.staff.name}</td>
   <td>{props.staff.number}</td>
   <td>{props.staff.level}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.staff._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteStaff(props.staff._id);
       }}
     >
       Delete 
     </button>
   </td>
 </tr>
);
 
export default function StaffList() {
 const [waiters, setStaff] = useState([]); //records
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getStaff() {
     const response = await fetch(`http://localhost:3001/staff/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const waiters = await response.json();
     setStaff(waiters); //setRecords(records)
   }
 
   getStaff();
 
   return;
 }, [waiters.length]); //records
 
 // This method will delete a record
 async function deleteStaff(id) {
   await fetch(`http://localhost:3001/${id}`, {
     method: "DELETE"
   });
 
   const newWaiter = waiters.filter((el) => el._id !== id);
   setStaff(newWaiter);
 }
 
 // This method will map out the records on the table
 function staffList() { //recordList
   return waiters.map((staff) => {
     return (
       <Staff
         staff={staff}
         deleteStaff={() => deleteStaff(staff._id)}
         key={staff._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>Waiter Staff List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Name</th>
           <th>Number</th>
           <th>Level</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{staffList()}</tbody>
     </table>
   </div>
 );
}