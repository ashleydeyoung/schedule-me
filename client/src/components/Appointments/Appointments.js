import React, { Component, Fragment } from "react";
import LinkButton from "../Button/LinkButton";


class Appointments extends Component {
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
            <h6 className= "pb-2"><span className= "text-primary"></span>You currently have no appointments.</h6> 
          
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="col-8 offset-2">
              <LinkButton
                label="Back"
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