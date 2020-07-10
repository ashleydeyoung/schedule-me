import React, { Component, Fragment } from "react";
import LinkButton from "../Button/LinkButton";
import Mail from "../../lib/Mail";
import OkModal from "../Modal/OkModal";

class Feedback extends Component {
  state = {
    email: "",
    text: "",
    modalShow: false
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, text } = this.state;
    await Mail.feedback(email, text);
   this.setState({modalShow: true})  
  };

  render() {
    const { email, text } = this.state;

    return (
      <Fragment>
        <div className="card-body">
          <h6 className="pb-2">
            <span className="text-primary">Give </span> us your feedback
          </h6>
          <form className="FeedbackForm" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Your email address:</label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
                name="email"
                value={email}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                Let us know your thoughts:
              </label>
              <textarea
                className="form-control"
                id="textarea"
                rows="3"
                name="text"
                value={text}
                onChange={this.handleInputChange}
              ></textarea>
            </div>
          </form>
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="col-8 offset-2">
              <LinkButton
                label="Home"
                redirectTo="/"
                buttonClass="btn-secondary float-left"
              />
              <button type="button" className="btn btn-primary float-right" onClick={this.handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
        <OkModal show={this.state.modalShow} onHide={() => { this.setState({ modalShow: false }); window.location = '/' }}>
          <p>Thank you for your feedback.</p>
        </OkModal>
      </Fragment>
    );
  }
}

export default Feedback;
