import React, { Component } from 'react';

import Octicon, { Mail, Key, Person, Smiley } from '@githubprimer/octicons-react';

class RegistrationForm extends Component {
  state = {
    email: '',
    password: '',
    passwordConfirm: '',
    firstName: '',
    lastName: '',
    preferredName: ''
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = event => {
    const { email, password, passwordConfirm, firstName, lastName, preferredName } = this.state;

    this.props.onSubmit(email, password, passwordConfirm, firstName, lastName, preferredName);
    event.preventDefault();
  }

  render() {
    const { email, password, passwordConfirm, firstName, lastName, preferredName } = this.state;

    return (
      <div className='LoginForm'>
        <div className='card'>
          <div className='card-body'>
            <form onSubmit={this.handleSubmit}>

              <div className='input-group mb-3'>
                <div className="input-group-prepend">
                  <span className="input-group-text"><Octicon icon={Person} /></span>
                </div>
                <input
                  className='form-control'
                  id='first-name'
                  name='firstName'
                  placeholder='First Name'
                  value={firstName}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className='input-group mb-3'>
                <div className="input-group-prepend">
                  <span className="input-group-text"><Octicon icon={Person} /></span>
                </div>
                <input
                  className='form-control'
                  id='last-name'
                  name='lastName'
                  placeholder='Last Name'
                  value={lastName}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className='input-group mb-3'>
                <div className="input-group-prepend">
                  <span className="input-group-text"><Octicon icon={Smiley} /></span>
                </div>
                <input
                  className='form-control'
                  id='preferred-name'
                  name='preferredName'
                  placeholder='Preferred Name'
                  value={preferredName}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className='input-group mb-3'>
                <div className="input-group-prepend">
                  <span className="input-group-text"><Octicon icon={Mail} /></span>
                </div>
                <input
                  className='form-control'
                  id='email'
                  type='email'
                  name='email'
                  placeholder='email@provider.com'
                  value={email}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className='input-group mb-3'>
                <div className="input-group-prepend">
                  <span className="input-group-text"><Octicon icon={Key} /></span>
                </div>
                <input
                  className='form-control'
                  id='password'
                  type='password'
                  name='password'
                  placeholder='password'
                  value={password}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className='input-group mb-3'>
                <div className="input-group-prepend">
                  <span className="input-group-text"><Octicon icon={Key} /></span>
                </div>
                <input
                  className='form-control'
                  id='password-confirm'
                  type='password'
                  name='passwordConfirm'
                  placeholder='password (again)'
                  value={passwordConfirm}
                  onChange={this.handleInputChange}
                />
              </div>

              <button className='btn btn-primary' type='submit'>Register Now!</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default RegistrationForm;
