import React, { Component, Fragment } from "react";
import DatePicker from "react-datepicker";
import Moment from "moment";
import LinkButton from "../Button/LinkButton";

import "react-datepicker/dist/react-datepicker.css";

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
    if (this.props.state?.startDate) {
        this.props.state.startDate = date;
    }
  }

  render() {
    return (
      <Fragment>
        <div className="card-body">
            <h6 className= "pb-2"><span className= "text-primary">Choose</span> a Date</h6> 
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            dateFormat="MMMM d, yyyy"
            inline
            minDate={Moment().toDate()}
          />
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="col-8 offset-2">
              <LinkButton
                label="Services"
                redirectTo="/schedule/services"
                buttonStyle="btn-secondary float-left"
              />
              <LinkButton
                label="Schedule"
                redirectTo="/schedule/timeslots"
                buttonStyle="btn-primary float-right"
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Schedule;
