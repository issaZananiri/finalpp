import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import Routing from "./RoutingMachine";



export default class LeafletMap extends Component {
  state = {
    zoom: 7,
    isMapInit: false
  };

  saveMap = map => {
    this.map = map;
    this.setState({
      isMapInit: true
    });
  };

  render() {
    const position = [] 
    position.push(this.props.lat)
    position.push(this.props.lan)

  
    return (
      <Map center={position} zoom={this.state.zoom} ref={this.saveMap}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {this.state.isMapInit && <Routing map={this.map} locations={this.props.locations}/>}
        <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
      </Map>
    );
  }
}