import React from "react";
import moment from "moment"

function AppointmentCard(props) {
  //console.log(props);
  const appointments = props.appointments.map((appointment) => {
    return (
      <div
        className="appt-card"
        style={{ padding: "30px" }}
      >
        {/* <h3>Appointment</h3> */}
        {appointment.Services.map((Service) => (
          <p>{Service.name}</p>
        ))}
        <p>{moment(appointment.startTime).format('MMMM Do YYYY, h:mm:ss a')}</p>
      </div>
    );
  });
  return (
    <div className="card" style={{ padding: "30px" }}>
      {appointments}
      
    </div>
  );
}
export default AppointmentCard;
