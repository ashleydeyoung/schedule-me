import React, { Component, Fragment } from "react";
import LinkButton from "../Button/LinkButton";
import { Link } from "react-router-dom";
import API from "../../lib/API";
import AppointmentCard from "../AppointmentCard/AppointmentCard";

class Appointments extends Component {
  state = {
    appointments: [],
  };
  linkStyle = { color: "#000" };
  async componentDidMount() {
      //console.log(this.props)
    const appointments = await API.Appointments.getByClientId(this.props.user?.id);
    this.setState({ appointments: appointments.data });
    //console.log(appointments.data);
    //console.log(this.state.appointments);
  }

  render() {
    return (
      <Fragment>
        <h2>Appointments</h2>
        <div className="card-body">
          {this.state.appointments.length === 0 && (
            <h6 className="pb-2">
              <span className="text-primary"></span>You currently have no
              appointments.
            </h6>
          )}
          {this.state.appointments.length > 0 && (
            <AppointmentCard appointments={this.state.appointments} />
          )}
          <p>
            <Link to="/schedule/services" style={this.linkStyle}>
              <span className="text-primary bold">Schedule</span> Appointment
            </Link>
          </p>
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="col-8 offset-2">
              <LinkButton
                label="Home"
                redirectTo="/"
                buttonStyle="btn-secondary content-center"
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Appointments;
