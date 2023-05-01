import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
//import Data from './Data';
//import { useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';

function DataCreate() {
    // const location = useLocation();
    // console.log(location.state?.token)
    // const token = location.state?.token;
    const cookies = new Cookies();
    const token = cookies.get('TOKEN');
    const [organizationName, setorganizationName] = useState('');
    const [emailUsed, setemailUsed] = useState('');
    const [passwordUsed, setpasswordUsed] = useState('');
    const navigate = useNavigate();


    //Controlling POST from frontend
    const submit = (e) => {
        e.preventDefault();
        fetch('https://password-protector.cyclic.app/saver', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`
              },
            body: JSON.stringify({ organizationName, emailUsed,passwordUsed })
        },[token]).then(() => navigate('/data'),{ state: { token: token } });
    }

    return (
        //It coontain code for creating another entry when we click Add data and fill data
            <form onSubmit={submit}>
                <label>Organization</label>
                <input type="text" name="organizationName"
                    onChange={e => setorganizationName(e.target.value)}
                    required
                />
                <label>Email</label>
                <input type="text" name="emailUsed"
                    onChange={e => setemailUsed(e.target.value)}
                    required
                />
                <label>Password</label>
                <input type="text" name="passwordUsed"
                    onChange={e => setpasswordUsed(e.target.value)}
                    required
                />
                <button type="submit">Add Data</button>
            </form>
    )
}
export default DataCreate
