import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export default function Create() {
    const [form, setForm] = useState( {
        name: "",
        number: "",
        level: "",
    });

    const navigate = useNavigate();

    //updating state properties
    function updateForm(value) {
        return setForm((prev) => {
            return {...prev, ...value};
        });
    }
    
    //handling submission
    async function onSubmit(e) {
        e.preventDefault();

        //when post req is sent to url, we'll add new rec to db
        const newPerson = { ...form };

        await fetch("http://localhost:3001/staff/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        })
        .catch(error => {
            window.alert(error);
            return;
        });

        setForm( {name: "", number: "", level: ""});
        navigate("/");
    }

    //displaying form that takes input from user
    return(
        <div>
            <h3> Add New Waiter</h3>
            <form onSubmit = {onSubmit}>
                <div className = "form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={(e) => updateForm({name: e.target.value})}
                        />
                </div>
                <div className="form-group">
                 <label htmlFor="number">Number</label>
                 <input
                     type="text"
                     className="form-control"
                    id="number"
                    value={form.number}
                    onChange={(e) => updateForm({ number: e.target.value })}
                     />
                 </div>

                 <div className="form-group">   
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="levelOptions"
             id="levelJunior"
             value="Junior"
             checked={form.level === "Junior"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="levelJunior" className="form-check-label">Junior</label>
            </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="levelOptions"
             id="levelSenior"
             value="Senior"
             checked={form.level === "Senior"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="levelSenior" className="form-check-label">Senior</label>
         </div>
       </div>
                 <div className="form-group">
         <input
           type="submit"
           value="Create person"
           className="btn btn-primary"
         />
       </div>
            </form>
        </div>
    );
}