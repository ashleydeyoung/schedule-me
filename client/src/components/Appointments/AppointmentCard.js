import React, { Component } from "react";
import moment from "moment";
import CancelModal from "../Modal/CancelModal";

class AppointmentCard extends Component {
  state = {
    cancelModalShow: false,
  };

  render() {
    const cards = this.props.appointments.map((appointment) => {
      return (
        <div className="col py-2" key={appointment.id}>
          <div className="card py-2 bg-light">
            <p>
              <strong>{moment(appointment.startTime).format("LLLL")}</strong>
            </p>
            {appointment.Services.map((Service) => (
              <p className="text-secondary" key={Service.id}>
                {Service.name}
              </p>
            ))}
            <span>
              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={() => this.setState({ cancelModalShow: true })}
              >
                Cancel
              </button>
            </span>
          </div>
          <CancelModal
            show={this.state.cancelModalShow}
            onHide={() => this.setState({ cancelModalShow: false })} 
            cancelAppointment={(e) => this.props.cancelAppointment(appointment.id, e)}
            title={`Confirm cancel?`}
          >
            <p>Are you sure you would like to cancel this appointment?</p>
          </CancelModal>
          
        </div>
      );
    });
    return cards;
  }
}
export default AppointmentCard;