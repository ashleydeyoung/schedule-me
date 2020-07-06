import React, { Component, Fragment } from 'react';
import TimeSlot from './TimeSlot';
import API from '../../lib/API';
import moment from 'moment';

class TimeSlotWrapper extends Component {
    state = {
        timeSlots: [],
        dateString: ""
    }
    async componentDidMount() {
        const dateString = moment(this.props.appointment.startDate).format('yyyy-MM-DD');
        const timeSlots = await API.Appointments.getAvailability(dateString);
        this.setState({timeSlots, dateString});
    }

    render() {
        if(this.state.timeSlots){
            return (
                <Fragment>
                    <div className="card-body">
                        <h6>Below are the available time slots for <br/>{this.state.dateString}.</h6><br/>
                        {this.state.timeSlots.map(timeSlot => (<TimeSlot time={timeSlot.time} isAvailable={timeSlot.isAvailable} key={timeSlot.time} />))}
                    </div>
                    <div className="card-footer">
                        &nbsp;
                    </div>
                </Fragment>
            )
        }
        
        return (<div>Loading...</div>)
    }

}

export default TimeSlotWrapper;
