import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactSnackBar from "react-js-snackbar";

const randomFloat = require('random-float');
function Order(props) {
    const [sh, setSh] = useState({show: false, showing: false})
    const getFormmatedDate = date => {
        date = new Date(date);
        let day = date.getDate() - 1;
        const month = date.toLocaleString('en-us', { month: 'long' });
        let year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    };
//deleteorder
    const assignTO = async () => {
        if (sh.Showing) return;
        setSh({show: true, showing:true})
        setTimeout(() => {
          setSh({show: false, showing:false});
        }, 2000);
        // component  props = order , idDeliveryWorker , idOrder 
        const lat = randomFloat(30.304606, 32.853749)
        await axios.post('http://localhost:8080/DashBoard/assingnOrderTo',{
            order:{
               name : props.v.name,
               phoneNumber:props.v.phoneNumber,
               id:props.v.id,
               area:props.v.area,
               lat:lat
            },
            deliveryWorkerId:props.driver,
            OrderDBid:props.v._id
        })
        setTimeout(() => {
         props.refresh(!props.r)
          }, 3500);
      
    }
const deleteorder = async(id) => {

    await axios.delete(`http://localhost:8080/deleteorder/${id}`)
  
}
    return (
        
            <div className="order" >
                <span>{props.v.name}</span>
                <span>{props.v.phoneNumber}</span>
                <span>{getFormmatedDate(props.v.date)}</span>
                <span>{props.v.id}</span>
                <span>{props.v._id}</span>
                <span>{props.v.area} </span>
              
                <span onClick={assignTO}>
                
                    {props.v.received ? <i className="fas fa-check" /> : <i class="fa fa-truck" id='check'><ReactSnackBar Icon={<span>🦄</span>} Show={sh.show}>
                        The order has been Assigned!
                    </ReactSnackBar></i>}</span>
                    <span><i class="fa fa-trash"  onClick={() => deleteorder(props.v.id)} ></i></span>
            </div>
        
    )


}

export default Order