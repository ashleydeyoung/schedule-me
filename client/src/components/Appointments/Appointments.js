import React, { Component, Fragment } from "react";
import LinkButton from "../Button/LinkButton";
import { Link } from "react-router-dom";
import API from "../../lib/API";
import AppointmentCard from "./AppointmentCard";

class Appointments extends Component {
  state = {
    appointments: [],
  };
  linkStyle = { color: "#000" };

  async componentDidMount() {
    const appointments = await API.Appointments.getByClientId(
      this.props.user?.id
    );
    this.setState({ appointments: appointments.data });
  }
  cancelAppointment = async (id, e) => {
    await API.Appointments.cancel(id);
    alert("Your appointment has been cancelled!");

    window.location.reload(false);
  };

  render() {
    return (
      <Fragment>
        <h6 className="pt-4 pb-3"><span className="text-primary">Scheduled</span> Appointments</h6>
        <div className="card-body pt-0">
          {this.state.appointments.length === 0 && (
            <Fragment>
              <p className="pb-2">
                You currently have{" "}
                <span className="text-primary">no appointments.</span>
              </p>
              <p>
                <img src="./assets/images/scissors.png" alt="logo" />
              </p>

              <p>
                <Link to="/schedule/services" style={this.linkStyle}>
                  <span className="text-primary bold">Schedule</span>{" "}
                  Appointment
                </Link>
              </p>
            </Fragment>
          )}
          {this.state.appointments.length > 0 && (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
              <AppointmentCard
              appointments={this.state.appointments}
              cancelAppointment={this.cancelAppointment}
            />
            </div>
          )}
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="col-8 offset-2">
              <LinkButton
                label="Home"
                redirectTo="/"
                buttonClass="btn-secondary"
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Appointments;
