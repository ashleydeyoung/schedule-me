import React, { Component, Fragment } from 'react';
import TimeSlot from './TimeSlot';
import API from '../../lib/API';
import moment from 'moment';
import LinkButton from '../Button/LinkButton'

class TimeSlotWrapper extends Component {
    state = {
        timeSlots: [],
        dateString: ""
    }

    availableState = {
        status: "Available",
        timeSlotStyle: { backgroundColor: "#dae0e5" },
        textClass: "text-success",
        textStyle: { fontWeight: "bold" },
        btnStyle: "",
    }

    unAvailableState = {
        status: "Unavailable",
        timeSlotStyle: {},
        textClass: "",
        textStyle: {},
        btnStyle: "btn-secondary",
    }

    selectedState = {
        status: "Selected",
        timeSlotStyle: {},
        textClass: "text-white",
        textStyle: {},
        btnStyle: "btn-primary",
    }

    async componentDidMount() {
        const dateString = moment(this.props.appointment.startDate).format('yyyy-MM-DD');
        const timeSlots = await API.Appointments.getAvailability(dateString);
        this.setAvailibility(timeSlots);
        timeSlots.forEach(timeSlot => {
            if(timeSlot.time === this.props.appointment.startTime){
                timeSlot.state = this.selectedState;
            }
        })
        this.setState({ timeSlots, dateString });
    }

    setAvailibility(timeSlots) {
        timeSlots.forEach(timeSlot => {
            if (timeSlot.isAvailable) {
                timeSlot.state = this.availableState;
            } else {
                timeSlot.state = this.unAvailableState;
            }
        });
    };

    onClick = (clickedSlot) => {
        const timeSlots = this.state.timeSlots;
        this.setAvailibility(timeSlots);
        if(clickedSlot.isAvailable){
            clickedSlot.state = this.selectedState;
        }
        this.setState({ timeSlots: this.state.timeSlots });
        this.props.appointment.startTime = clickedSlot.time;
    }

    submit = async () => {
        await API.Appointments.create(this.props.appointment);
        window.location = '/appointments';
    }

    render() {
        if (this.state.timeSlots) {
            return (
                <Fragment>
                    <div className="card-body">
                        <h6>Below are the available time slots for <br />{this.state.dateString}.</h6><br />
                        {this.state.timeSlots.map(timeSlot => (<TimeSlot timeSlot={timeSlot}
                            onClick={this.onClick} key={timeSlot.time} />))}
                    </div>
                    <div className="card-footer">
                        <div className="row">
                            <div className="col-8 offset-2">
                                <LinkButton
                                    label="Calendar"
                                    redirectTo="/schedule/calendar"
                                    buttonClass="btn-secondary float-left"
                                />
                                <button className="btn btn-default btn-primary float-right" onClick={this.submit}>Submit</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        }
        return (<div>Loading...</div>)
    }
}

export default TimeSlotWrapper;
