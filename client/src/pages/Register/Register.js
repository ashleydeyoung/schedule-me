import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import API from '../../lib/API';

class Register extends Component {
  state = {
    error: ""
  }

  handleSubmit = (email, password, confirm) => {
    if (password !== confirm) {
      return this.setState({ error: "Passwords do not match." });
    } else if (!email) {
      return this.setState({ error: "Please enter an email."})
    }

    API.Users.create(email, password)
      .then(response => response.data)
      .then(this.props.history.push('/login'))
      .catch(err => this.setState({ error: err.message }));
  }

  render() {
    return (
      <div className='Register'>
        <div className='row'>
          <div className='col'>
            <h1>Register</h1>
          </div>
        </div>
        {this.state.error &&
          <div className='row'>
            <div className='col'>
              <div className='alert alert-danger mb-3' role='alert'>
                {this.state.error}
              </div>
            </div>
          </div>}
        <div className='row'>
          <div className='col'>
            <RegistrationForm onSubmit={this.handleSubmit} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
