import React, { Component } from 'react';
import {Dropdown} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ChatList from './ChatList';
import Aux from "../../../../../hoc/_Aux";

//<img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" />
class NavRight extends Component {
    state = {
        listOpen: false
    };

    render() {

        return (
            <Aux>
              
                <div className="nav-link-wrapper">
                    <div><a href='Default'>Dashboard</a><i className="fas " style={{marginLeft : '0.3em'}}></i></div>
                </div>
                <div className="nav-link-wrapper">
                    <div><a href='addorder'>Add Order</a><i className="fas " style={{marginLeft : '0.3em'}}></i></div>
                </div>
                <div className="nav-link-wrapper">
                    <div><a href='Orders'>Assign Orders</a><i className="fas " style={{marginLeft : '0.3em'}}></i></div>
                </div>
             
                <div className="nav-link-wrapper">
                    <div><a href='createDriver'>Add Driver</a><i className="fas " style={{marginLeft : '0.3em'}}></i></div>
                </div>
            
             
               
              
                <ChatList listOpen={this.state.listOpen} closed={() => {this.setState({listOpen: false});}} />
            </Aux>
        );
    }
}

export default NavRight;
