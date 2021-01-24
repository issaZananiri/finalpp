import React, { Component } from 'react';
import ReactSnackBar from "react-js-snackbar";
const axios = require('axios')

class addorder extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            phonenumber: '',
            ID: '',
            area: '',
            show:false,
            showing:false
        }
    }

    updateFields = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addord =  (e) => {
        if (this.state.Showing) return;
        this.setState({show: true, showing:true})
        setTimeout(() => {
          this.setState({show: false, showing:false});
        }, 2000);
        if (!this.state.name || !this.state.phonenumber || !this.state.ID ||!this.state.area  ) {
            return
        }
        axios.post('http://localhost:8080/DashBoard/addorder', {
            name:  this.state.name,
            phoneNumber: this.state.phonenumber,
            id: this.state.ID,
            area: this.state.area,
        }).then(() => {
                this.setState({
                name: "",
                phonenumber: "",
                ID: "",
                
                area:""
            })
            }).catch(function (err) {
                    console.log(err);
            });
    }

    render() {
        return(

<div id="container">
                <input type="text"  placeholder="name" name="name" value={this.state.name} onChange={this.updateFields} />
                <input type="text" placeholder="phonenumber" name="phonenumber" value={this.state.phonenumber} onChange={this.updateFields} />
                <input type="text" placeholder="ID" name="ID" value={this.state.ID} onChange={this.updateFields} />
               
                <input type="text" placeholder="Area" name="area" value={this.state.area} onChange={this.updateFields} />
                <div id="buttons">
                    <button name="addord" class=" theme-bg2" onClick={this.addord}>Add Order                                   <ReactSnackBar Icon={<span>🦄</span>} Show={this.state.show}>
                        The Order has been Added.
                    </ReactSnackBar></button>
               
                </div>
            </div>
        )
    }
}

export default addorder;