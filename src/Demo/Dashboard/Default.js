import React from 'react';
import { Row, Col, Card, Table, Label } from 'react-bootstrap';
import axios from "axios";
import Aux from "../../hoc/_Aux";
import avatar1 from '../../assets/images/user/avatar-2.jpg';
import { observer, inject } from 'mobx-react'
import ReactSnackBar from "react-js-snackbar";


class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            packages: [],
            drivers: [],
            contact:[],
            show:false,
            showing:false


        }
    }
  

    makeRow(val) {
        return (

            <Card className='Recent-Users'>

                <Card.Body className='px-0 py-2'>
                    <Table responsive hover>
                        <tbody>
                            <tr className="unread">
                                <td><img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" /></td>
                                <td>
                                    <h6 className="mb-1">{val.name}</h6>
                                    <p className="m-0">{val.phoneNumber}</p>
                                </td>
                          
                                <td><a href='track' Style="float: right;" onClick={()=>this.save(val)} className="label theme-bg2 text-white f-12">Track</a><a href='Orders' Style="float: right;"  className="label theme-bg text-white f-12">Assign Orders</a>

                                </td>
                                <td><span name={val._id} onClick={() => this.removeDriver(val._id)}><i className="fa fa-times trash1">   
                                   <ReactSnackBar Icon={<span>🦄</span>} Show={this.state.show}>
                        The Driver has been deleted .
                    </ReactSnackBar></i></span></td>

                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        )
    }

 
    save(userName){
        localStorage.clear()
        localStorage.setItem('currentUser', JSON.stringify(userName))    
    }

    

    orders = async () => {
        const ordersFromServer = await axios.get('http://localhost:8080/totalOrders')
        this.setState({
            packages: ordersFromServer.data.drivers

        })
    }
    Contact = async () => {
        const contactFromServer = await axios.get('http://localhost:8080/contacts')
        this.setState({
            contact: contactFromServer.data.drivers

        })
    }
    drivers = async () => {
        const driversFromServer = await axios.get('http://localhost:8080/drivers')
        console.log(driversFromServer.data.drivers[0].name)
        this.setState({
            drivers: driversFromServer.data.drivers
        })
    }

    received = () => {
        let count = 0
        const order = this.state.packages
        for (let i = 0; i < order.length; i++) {
            if (order[i].received) {
                count++;
            }
        }
        return count
    }
    removeDriver = async (e) => {
        
        if (this.state.Showing) return;
        this.setState({show: true, showing:true})
        setTimeout(() => {
          this.setState({show: false, showing:false});
        }, 2000);
        await axios.delete(`http://localhost:8080/deleteaccount/${e}`)
        this.drivers()
    }

    componentDidMount() {
        this.orders()
        this.drivers()
        this.Contact()
    }

    render() {
        return (
           
            <Aux>
                <Row>
                    <Col md={6} xl={4}>
       
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total Deliveries</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-5" />{this.state.packages.length}</h3>
                                    </div>

                                </div>
                                <div className="progress m-t-30" style={{ height: '7px' }}>
                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '50%' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Undelivered :</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-down text-c-red f-30 m-r-5" />{this.state.packages.length - this.received()}</h3>
                                    </div>


                                </div>
                                <div className="progress m-t-30" style={{ height: '7px' }}>
                                    <div className="progress-bar progress-c-theme2" role="progressbar" style={{ width: '35%' }} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100" />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Delivered :</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather  icon-map-pin  text-c-green f-30 m-r-5" />{this.received()}</h3>
                                    </div>


                                </div>
                                <div className="progress m-t-30" style={{ height: '7px' }}>
                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '70%' }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} xl={8}>
                        <Card.Header>
                            <Card.Title as='h5'>Drivers:<a href="/dashboard/createDriver" className=" fa fa-plus-circle add1 "> </a></Card.Title>

                        </Card.Header>
                        {this.state.drivers && this.state.drivers.map(v => this.makeRow(v))}
                    </Col>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body className='border-bottom'>
                                <div className="row d-flex align-items-center">
                                    <div className="col-auto">
                                        <i className="feather icon-zap f-30 text-c-green" />
                                    </div>
                                    <div className="col">
                                        <h3 className="f-w-300">10</h3>
                                        <span className="d-block text-uppercase">Total Orders </span>
                                    </div>
                                </div>
                            </Card.Body>
                          
                          
                        </Card>
                    </Col>


                </Row>
            </Aux>
        );
    }
}


export default Dashboard