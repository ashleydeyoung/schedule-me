import React, { Component } from 'react';

class TimeSlot extends Component {
    time;
    status;
    timeSlotStyle;
    textClass;
    textStyle;
    btnStyle;

    componentDidMount(){
        this.time = this.props.time;
        if(this.props.isAvailable){
            this.status = "Available";
            this.timeSlotStyle = {backgroundColor:"#dae0e5"}
            this.textClass = "text-success";
            this.textStyle = {fontWeight:"bold"};
            this.btnStyle = "";
        }else{
            this.status = "Unavailable";
            this.timeSlotStyle = {}
            this.textClass = "";
            this.textStyle = {};
            this.btnStyle = "btn-secondary";  
        };
    };
    
    render() {
        return (
            <button type="button" className={`btn btn-sm btn-block rounded-pill ${this.btnStyle}`} style={this.timeSlotStyle}>{this.time} | 
                <span className={this.textClass} style={this.textStyle}> {this.status}</span></button>
        )
    }

}

export default TimeSlot;
