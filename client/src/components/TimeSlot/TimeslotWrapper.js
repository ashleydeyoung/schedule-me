import React, { Component, Fragment } from 'react';
import TimeSlot from './TimeSlot';
import API from '../../lib/API';
import moment from 'moment';
import LinkButton from '../Button/LinkButton'
import OkModal from '../Modal/OkModal';

class TimeSlotWrapper extends Component {
    state = {
        timeSlots: [],
        dateString: "",
        showModal: false,
        showUnavailableModal: false,
        openTime: null,
        closeTime: null
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
        const {timeSlots, timeSlotInterval}  = await API.Appointments.getAvailability(dateString);
        this.setAvailibility(timeSlots);
        timeSlots.forEach(timeSlot => {
            if(timeSlot.time === this.props.appointment.startTime){
                timeSlot.state = this.selectedState;
            }
        })
        this.setState({ timeSlots, dateString, timeSlotInterval });
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

        const endTime = moment(`1900-01-01 ${clickedSlot.time.split(":")[0]}:${clickedSlot.time.split(":")[1]}`).add(this.props.appointment.length, "minute").format("HH:mm");
        const closeTimeParts = timeSlots[timeSlots.length-1].time.split(":");
        const closeTime = moment(`1900-01-01 ${closeTimeParts[0]}:${closeTimeParts[1]}`).format("HH:mm");

        const unavailable = timeSlots.filter(timeSlot => !timeSlot.isAvailable && (timeSlot.time >= clickedSlot.time && timeSlot.time < endTime));

        if(endTime > closeTime
            || unavailable.length) {
            this.setState({showUnavailableModal: true});
            return;
        }

        if(clickedSlot.isAvailable){
            clickedSlot.state = this.selectedState;
        }
        this.setState({ timeSlots: this.state.timeSlots });
        this.props.appointment.startTime = clickedSlot.time;
    }

    submit = async () => {
        if(this.state.timeSlots.some(slot => slot.state.status === "Selected")) {
            await API.Appointments.create(this.props.appointment);
            window.location = '/appointments';
        } else {
            this.setState({showModal: true});
        }
    }

    render() {
        if (this.state.timeSlots) {
            return (
                <Fragment>
                    <div className="card-body">
                        <h6>Below are the available time slots for
                            <br />{moment(this.props.appointment.startDate).format("dddd, MM-DD-yyyy")}
                        </h6><br />
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
                                <button
                                    className="btn btn-default btn-primary float-right"
                                    onClick={this.submit}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                    <OkModal
                        show={this.state.showModal}
                        onHide={() => this.setState({showModal: false})}
                    >
                        <p>Select a time</p>
                    </OkModal>
                    <OkModal
                        show={this.state.showUnavailableModal}
                        onHide={() => this.setState({showUnavailableModal: false})}
                    >
                        <p>The requested service takes longer than the allotted time.</p>
                        <p>Please select another available time.</p>
                    </OkModal>
                </Fragment>
            )
        }
        return (<div>Loading...</div>)
    }
}

export default TimeSlotWrapper;
