import React, { Component } from 'react';
import LinkButton from '../Button/LinkButton';
import Octicon, { Person, Smiley } from '@githubprimer/octicons-react';

import API from '../../lib/API';

class Update extends Component {
    state = {
        firstName: '',
        lastName: '',
        preferredName: '',
        id: ''
    };

    componentDidMount() {
        this.setState(this.props.user)
    }

    updateUser = async () => {
        const user = await API.Users.update(this.state, this.props.pageProps.authToken);
        this.props.pageProps.handleLogin(user.data, this.props.pageProps.authToken)
        alert("Your information has been updated!")
        window.location = "/"
    }

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
        const { firstName, lastName, preferredName } = this.state;
        return (
            <div className='UpdateForm'>
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
                            <div className="card-footer">
                                <div className="row">
                                    <div className="col-8 offset-2">
                                        <LinkButton
                                            label='Home'
                                            redirectTo='/'
                                            buttonClass='btn-secondary float-left'
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-primary float-right"
                                            onClick={this.updateUser}
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Update;