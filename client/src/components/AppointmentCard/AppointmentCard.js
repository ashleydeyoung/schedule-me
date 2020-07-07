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
        <p><strong>{moment(appointment.startTime).format('LLLL')}</strong></p>
        {appointment.Services.map((Service) => (
          <p>{Service.name}</p>
        ))}
        
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
