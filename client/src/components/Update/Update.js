import React, { Component } from 'react';
import LinkButton from '../Button/LinkButton';
import Octicon, { Person, Smiley } from '@githubprimer/octicons-react';
import UpdateModal from '../Modal/UpdateModal'

import API from '../../lib/API';

class Update extends Component {
    state = {
        firstName: '',
        lastName: '',
        preferredName: '',
        id: '',
        updateModalShow: false
    };

    componentDidMount() {
        this.setState(this.props.user)
    }

    updateUser = async () => {
        const user = await API.Users.update(this.state, this.props.authToken);
        this.props.handleLogin(user.data, this.props.authToken)
        this.setState({ updateModalShow: true })
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

            <div className="card-body">
                <h6 className="pb-2">
                    <span className="text-primary">Update</span> your info:
                </h6>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <Octicon icon={Person} />
                            </span>
                        </div>
                        <input
                            className="form-control"
                            id="first-name"
                            name="firstName"
                            placeholder="First Name"
                            value={firstName}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <Octicon icon={Person} />
                            </span>
                        </div>
                        <input
                            className="form-control"
                            id="last-name"
                            name="lastName"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <Octicon icon={Smiley} />
                            </span>
                        </div>
                        <input
                            className="form-control"
                            id="preferred-name"
                            name="preferredName"
                            placeholder="Preferred Name"
                            value={preferredName}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <hr />
                    <p>Give us your <a className="text-primary" href="/feedback">feedback</a></p>
                    <img src="./assets/images/scissors.png" alt="logo" />
                    <div className="card-footer">
                        <div className="row">
                            <div className="col-8 offset-2">
                                <LinkButton
                                    label="Home"
                                    redirectTo="/"
                                    buttonClass="btn-secondary float-left"
                                />
                                <button
                                    type="button"
                                    className="btn btn-primary float-right"
                                    onClick={this.updateUser}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                <UpdateModal
                    show={this.state.updateModalShow}
                    onHide={() => { this.setState({ updateModalShow: false }); window.location = '/' }}
                    updateUser={() => this.props.updateUser()}
                />
            </div>
        );
    }
}

export default Update;