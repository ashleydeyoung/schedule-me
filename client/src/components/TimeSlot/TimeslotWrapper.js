import React, { Component, Fragment } from 'react';
import TimeSlot from './TimeSlot';
import API from '../../lib/API';

class TimeSlotWrapper extends Component {
    async componentDidMount() {
        this.setState({timeSlots: await API.Appointments.getAvailability(this.props.appointment.day)});
    }

    render() {
        return (
            <Fragment>
                <div className="card-body">
                    <h6>Below are the available time slots for today.</h6><br/>
                    {this.state?.timeSlots.map(timeSlot => (<TimeSlot time={timeSlot.time} isAvailable={timeSlot.isAvailable} key={timeSlot.time} />))}
                </div>
                <div className="card-footer">
                    &nbsp;
                </div>
            </Fragment>
        )
    }

}

export default TimeSlotWrapper;
