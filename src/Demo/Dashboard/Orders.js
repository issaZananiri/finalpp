import React, { useEffect, useState } from 'react';
import Order from './Order'
import axios from "axios";
import NVD3Chart from 'react-nvd3';
import ReactSnackBar from "react-js-snackbar";
export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [drivers,setDrivers] = useState([]); 
    const [driverSelected , setDriver]=useState();
    const [refresh ,setRefresh] = useState(false)
    const [sh, setSh] = useState({show: false, showing: false})



    const getOrders = async function () {
        const orders = await axios.get('http://localhost:8080/DashBoard/totalOrders');
        setOrders(orders.data.Orders);

    }
    const getdrivers = async function() {
        const driversFromServer = await axios.get('http://localhost:8080/drivers')
        setDrivers( driversFromServer.data.drivers);
    }
  
    
    useEffect(() => {
        getOrders();
        getdrivers();
        piec();
    }, [])

    useEffect(()=>{
        getOrders();
        getdrivers();
    },[refresh])

    const handleSelect = (e) => {
        setDriver(e.target.value)
    }
   const  piec = ()=>{
        let datum = [
            {key: "Received", y:orders.length, color: "#ff8a65"},
        
            {key: "Not Received", y: orders.length  , color: "#1de9b6"},
        
        ];
        return datum;

    }
    const received = () => {
        let count = 0
        const order = getOrders()
        for (let i = 0; i < order.length; i++) {
            if (order[i].received) {
                count++;
            }
        }
        return count
    }
    return (

        <div className="ordersContainer">
             
            <div id='orderTable'>
            <h2 Style="    font-size: 26px;color: #536175;font-weight: bold;">Please <span Style="color: #8e9aad;">Assign</span> the following orders to the <span  Style="color: #8e9aad;">Selected</span>  Driver :</h2>
                <div class="dropdown dropdown-dark"  >
                    <select name="two" className="dropdown-select" value={driverSelected} onChange ={handleSelect}>
                        <option >Select Driver </option>
                        {drivers.map(v => <option value={v._id}>{v.name}</option> )}
                    </select>
                </div>
                
                <div id="header" >


                    <span>Costumer Name</span>
                    <span>Phone Number</span>
                    <span>Date</span>
                    <span>Costumer Id</span>
                    <span>Order Id</span>
                    <span>Area</span>
                    <span>Assign</span>
                    <span>Delete</span>

                </div>

                <div id='orders'>
              
                    {orders.filter(v => !v.assignedTO).map(v => <Order v={v} key={v._id}  driver ={driverSelected} r={refresh} refresh={setRefresh}/>)}
                    
                </div>

            </div>
        </div>

    )
}