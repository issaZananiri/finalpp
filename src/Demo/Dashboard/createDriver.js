import React, {useState} from 'react'; 
import {useHistory} from 'react-router-dom';
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown} from 'react-bootstrap';
const axios = require('axios')

const CreateDriver = function()  {
    const [statee, setUserInfo] = useState({})

    const history = useHistory()

    const  updateFields = (e) => {
        setUserInfo({...statee ,[e.target.name]: e.target.value})
    }

    const updateDrivers =  (e) => {
        if (!statee.name || !statee.userName || !statee.id || !statee.phoneNumber || !statee.vehicle || !statee.password) {
            return
        }
        axios.post('http://localhost:8080/createAccount', {
            userName: statee.userName,
            name: statee.name,
            id: statee.id,
            password:statee.password,
            vehicle:statee.vehicle,
            phoneNumber:statee.phoneNumber
        }).then(() => {
                history.push('/dashboard/default')
            }).catch(function (err) {
                    console.log(err);
            });
    }


        return(
        <div id="container">
                <input type="text" required  placeholder="UserName" name="userName" value={statee.userName} onChange={updateFields} />
                <input type="text" required placeholder="Name" name="name" value={statee.name} onChange={updateFields} />
                <input type="text" required placeholder="password" name="password" value={statee.password} onChange={updateFields} />
                <input type="text" required placeholder="Id" name="id" value={statee.id} onChange={updateFields} />
                <input type="Number" required placeholder="vehicle" name="vehicle" value={statee.vehicle} onChange={updateFields} />
                <input type="text" required placeholder="phoneNumber" name="phoneNumber" value={statee.phoneNumber} onChange={updateFields} />
                <div id="buttons">
                    <button className="label theme-bg2 text-white f-12" name="Create" onClick={updateDrivers}>Create</button>
                   
                </div>
       </div>
       
        )
    
}

  

export default CreateDriver;
