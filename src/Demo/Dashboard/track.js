import React from 'react';
import NVD3Chart from 'react-nvd3';
import axios from "axios";
import {Row, Col, Card, Form, InputGroup, Button} from 'react-bootstrap';
import {Map,GoogleMapReact , Marker, GoogleApiWrapper, InfoWindow, Polyline, Polygon}  from 'google-maps-react';
import Aux from "../../hoc/_Aux";
import  MapContainer  from './MapComponents/LeafletMap';
import ReactSnackBar from "react-js-snackbar";


class GoogleMap extends React.Component {
    constructor() {
        super()
        this.state = {
            packages: [],
            drivers: [],
            driverTrack :{}
        }
    }

    state = {
        activeMarker: {},
        selectedPlace: {},
        showingInfoWindow: false,
        position: null
    };

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

    orders = async () => {
        const currentUser = this.checkLocalStorage()
        if(!currentUser){
            return
        }
        const ordersFromServer = await axios.post('http://localhost:8080/orders',{userName :currentUser.userName, password : currentUser.password } )

        this.setState({
            packages: ordersFromServer.data.packages
        })
    }

    piec = async ()=>{
        const x = this.received()
        const y = this.state.packages.length -x
        let datum = [
            {key: "Received", y:x, color: "#ff8a65"},
            {key: "Not Received", y: y, color: "#1de9b6"},
        ];
        return datum;
    }
    
    drivers = async () => {
        const driversFromServer = await axios.get('http://localhost:8080/drivers')
        this.setState({
            drivers: driversFromServer.data.drivers
        })
    }
   
    componentDidMount() {
        this.orders()
        this.drivers()
        this.piec()
    }

  
    checkLocalStorage() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            return {}
        }
        return currentUser
    }
   

    render() {
        const { position } = this.state;
        const currenUser =  this.checkLocalStorage()
        return (<div className='container'>
  
            <Aux>
                <Row>
                    <Col xl={6}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Map</Card.Title>
                              
                            </Card.Header>
                            <Card.Body>
                              {currenUser ? <MapContainer lat={currenUser.lat ||0} lan ={currenUser.lan ||0}/> : <div />}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCE0nvTeHBsiQIrbpMVTe489_O5mwyqofk'
})(GoogleMap);