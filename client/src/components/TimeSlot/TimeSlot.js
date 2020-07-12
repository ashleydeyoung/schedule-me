import React, { Component } from 'react';

class TimeSlot extends Component {
    onClick = () => {
        this.props.onClick(this.props.timeSlot);
    }

    render() {
        return (
            <button type="button" className={`btn btn-sm btn-block rounded-pill ${this.props.timeSlot.state.btnStyle}`}
                onClick={this.onClick} style={this.props.timeSlot.state.timeSlotStyle}>
                    {this.props.timeSlot.time > "12:59" ? `${Number(this.props.timeSlot.time.split(":")[0]) - 12}:${this.props.timeSlot.time.split(":")[1]}` : this.props.timeSlot.time} |
                <span className={this.props.timeSlot.state.textClass}
                    style={this.props.timeSlot.state.textStyle}> {this.props.timeSlot.state.status}
                </span>
            </button>
        )
    }
}

export default TimeSlot;
