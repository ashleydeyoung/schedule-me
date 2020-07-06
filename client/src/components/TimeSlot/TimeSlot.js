import React, { Component } from 'react';

class TimeSlot extends Component {
    state = {
        time: null,
        status: null,
        timeSlotStyle: null,
        textClass: null,
        textStyle: null,
        btnStyle: null,
    }

    componentDidMount(){
        let newState = {
            time: this.props.time
        }
        if(this.props.isAvailable){
            newState.status = "Available";
            newState.timeSlotStyle = {backgroundColor:"#dae0e5"}
            newState.textClass = "text-success";
            newState.textStyle = {fontWeight:"bold"};
            newState.btnStyle = "";
        }else{
            newState.status = "Unavailable";
            newState.timeSlotStyle = {}
            newState.textClass = "";
            newState.textStyle = {};
            newState.btnStyle = "btn-secondary";  
        };

        this.setState(newState);
    };
    
    render() {
        return (
            <button type="button" className={`btn btn-sm btn-block rounded-pill ${this.state.btnStyle}`} style={this.state.timeSlotStyle}>{this.state.time} | 
                <span className={this.state.textClass} style={this.state.textStyle}> {this.state.status}</span></button>
        )
    }

}

export default TimeSlot;
