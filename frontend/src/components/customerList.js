import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const CustFunc = (props) => ( //Record
 <tr>
   <td>{props.cust.name}</td>
   <td>{props.cust.number}</td>
   <td>{props.cust.level}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.cust._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteCustomer(props.cust._id);
       }}
     >
       Delete 
     </button>
   </td>
 </tr>
);
 
export default function CustomerList() {
 const [Customer, setCustomer] = useState([]); //records
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getCustomer() {
     const response = await fetch(`http://localhost:3001/CustomerRoutes/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const Customer = await response.json();
     setCustomer(Customer); //setRecords(records)
   }
 
   getCustomer();
 
   return;
 }, [Customer.length]); //records
 
 // This method will delete a record
 async function deleteCustomer(id) {
   await fetch(`http://localhost:3001/${id}`, {
     method: "DELETE"
   });
 
   const newWaiter = Customer.filter((el) => el._id !== id);
   setCustomer(newWaiter);
 }
 
 // This method will map out the records on the table
 function customerList() { //recordList
   return Customer.map((cust) => {
     return (
       <CustFunc
         cust={cust}
         deleteCustomer={() => deleteCustomer(cust._id)}
         key={cust._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>Customer List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Name</th>
           <th>Number</th>
           <th>Level</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{customerList()}</tbody>
     </table>
   </div>
 );
}