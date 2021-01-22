

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
 
    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);
    
    const  AssignOrdersByArea = async function(){
         const orders=await axios.get('http://localhost:8080/DashBoard/totalOrders');
         setOrders(orders.data.Orders);
       console.log(orders.data.Orders);
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

  useEffect(() => {
      AssignOrdersByArea()
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
    Area
  </Dropdown.Toggle>

  <Dropdown.Menu>
    {redusceForAreas().map(v => {return <Dropdown.Item href="#/action-3">{v}</Dropdown.Item> })}
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
                                <Card.Title as="h5">Drivers </Card.Title>
                                <span className="d-block m-t-5">Orders assigned to each Driver</span>
                            </Card.Header>
                            <Card.Body>
                                <Table striped responsive>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Names</th>
                                        <th>Areas</th>
                                        <th>Number of Orders:</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Jerusalem</td>
                                        <td>30</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Taybe</td>
                                        <td>30</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Larry</td>
                                        <td>Akko</td>
                                        <td>22</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
        </div>
    );
  }
  
  export default Popup ;