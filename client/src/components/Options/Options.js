import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class Options extends Component {
  linkStyle = { color: "#000" };
  render() {
    return (
      <Fragment>
        <div className="card-body">
          <p>
            <Link to="/schedule/services" style={this.linkStyle}>
              <span className="text-primary bold">Schedule</span> Appointment
            </Link>
          </p>
          <p>
            <Link to="/appointments" style={this.linkStyle}>
              <span className="text-secondary">View</span> Appointment(s)
            </Link>
          </p>
          <img src="./assets/images/scissors.png" alt="logo" />
          <p>
            <Link to="/availability" style={this.linkStyle}>
              <span className="text-success">Check</span> Availability
            </Link>
          </p>
        </div>
        <div className="card-footer">&nbsp;</div>
      </Fragment>
    );
  }
}

export default Options;
