import React, { Component } from "react";
import moment from "moment";

class AppointmentCard extends Component {
  render() {
    const cards = this.props.appointments.map((appointment) => {
      return (
        <div className="col py-2" key={appointment.id}>
          <div className="card py-2 bg-light">
            <p><strong>{moment(appointment.startTime).format("LLLL")}</strong></p>
            {appointment.Services.map((Service) => (
              <p className="text-secondary" key={Service.id}>{Service.name}</p>
            ))}
            <span>
              <button type="button" className="btn btn-sm btn-danger"
                onClick={(e) => this.props.cancelAppointment(appointment.id, e)}>
                  Cancel
            </button>
            </span>
          </div>
        </div>
      );
    })
    return cards;

  }
}
export default AppointmentCard;
