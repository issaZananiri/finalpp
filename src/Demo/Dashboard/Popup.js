import React from 'react';
import { Row, Col,Card,Table,Label } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import { Button, ButtonToolbar} from 'react-bootstrap';
import axios from "axios";
import { Dropdown } from 'react-bootstrap';


function Popup() {

    const [orders, setOrders] = useState([]);
    
    const [show, setShow] = useState(false);

    const [drivers,setDrivers] = useState([]); 


    const [driver,setDriver] = useState([]); 
    const [order, setOrder] = useState([]);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const orderss = [];  
    const  AssignArea = async function(){
         const orders=await axios.get('http://localhost:8080/DashBoard/totalOrders');
         setOrders(orders.data.Orders);
       console.log(orders.data.Orders);
    }

   const getdrivers = async function() {
      const driversFromServer = await axios.get('http://localhost:8080/drivers')
      console.log(driversFromServer.data.drivers[1].name);
      setDrivers( driversFromServer.data.drivers);
  }

   const updateDrivers =  (e) => {
        if (!drivers.userName || !drivers.password) {
            return
        }
        axios.post('http://localhost:8080/DashBoard/assignOrder', {
            userName: drivers.userName,
            name: drivers.password,
            id: drivers.id,

        }).then(() => {
               
            }).catch(function (err) {
                    console.log(err);
            });
    }

    const  deleteorder = async function(){
      const orders=await axios.delete(`http://localhost:8080/DashBoard/deleteorder/${orders.name}`);
      this.orders()
 }

  const redusceForAreas = () => {
      const results = orders.reduce(function (r, a) {
          r[a.area] = r[a.area] || [];
          r[a.area].push(a);
          return r;
      }, Object.create(null));
      const keys = Object.keys(results)
      return keys
      }
  const redusceFornames = () => {
    const results = orders.reduce(function (r, a) {
        r[a.name] = r[a.name] || [];
        r[a.name].push(a);
        return r;
    }, Object.create(null));
    const keys = Object.keys(results)
    return keys
}
  const redusceFordrivers = () => {
    const results = drivers.reduce(function (r, a) {
        r[a.name] = r[a.name] || [];
        r[a.name].push(a);
        return r;
    }, Object.create(null));
    const keys = Object.keys(results)
    return keys
}

const handleSelect=(e)=>{
 
  setDriver(e)

}
const handleSelectA=(e)=>{
  

  setOrder(e);
  

  
}
const saveorder = ()=>{
  
}
  useEffect(() => {
      AssignArea()
      getdrivers()
  }, [])


    return (
      
     <div class="container">
        <Button variant="primary"  onClick={handleShow}>
          Enter City 
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header >
            <Modal.Title>Assign Area:</Modal.Title>
          </Modal.Header>
        
         
          <Dropdown>
   <Dropdown.Toggle variant="success" id="dropdown-basic">
    Driver:   {driver}
  </Dropdown.Toggle>

  <Dropdown.Menu>
    {redusceFordrivers().map(v => {return <Dropdown.Item  onSelect={handleSelect} eventKey={v}>{v}</Dropdown.Item> })}
  </Dropdown.Menu>
</Dropdown>
  <Dropdown>
   <Dropdown.Toggle variant="success" id="dropdown-basic">
    Areas:   {order}
  </Dropdown.Toggle>

  <Dropdown.Menu>
    {redusceFornames().map(v => {return <Dropdown.Item  onSelect={handleSelectA} eventKey={v}>{v}</Dropdown.Item> })}
  </Dropdown.Menu>
</Dropdown>
          <Modal.Footer>
              
            <Button variant="secondary" onClick={handleClose}>
              Save
            </Button>
            <Button variant="primary" onClick={handleClose}>         
            Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Assign Orders </Card.Title>
                                <span className="d-block m-t-5">Orders assigned to each Driver</span>
                            </Card.Header>
                            <Card.Body>
                                <Table striped responsive>
                                    <thead>
                                    <tr>                                      
                                        <th>Drivers Names</th>
                                        <th>Items</th>
                                        <th>Area</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                      
                                        <td>   {driver}</td>
                                        <td> {redusceFornames().map(v => {return <Dropdown.Item href="#/action-3">{v}</Dropdown.Item> })}</td>
                                        <td>   {redusceForAreas().map(v => {return <Dropdown.Item href="#/action-3">{v}</Dropdown.Item> })}</td>
                                    </tr>
                                
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
        </div>
    );
  }
  export default Popup ;
  