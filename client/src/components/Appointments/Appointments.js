import React, { Component, Fragment } from "react";
import LinkButton from "../Button/LinkButton";
import { Link } from "react-router-dom";
import API from "../../lib/API"

class Appointments extends Component {
  linkStyle = { color: "#000" };
  async componentDidMount() {
    const appointments = await API.Appointments.getByClientId(2);
    console.log(appointments.data)
  }
  render() {
    return (
      <Fragment>
        <div className="card-body">
          <h6 className="pb-2">
            <span className="text-primary"></span>You currently have no
            appointments.
          </h6>
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
