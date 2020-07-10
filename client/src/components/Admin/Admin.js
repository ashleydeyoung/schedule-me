import React, { Fragment, Component } from 'react';
import { AutoComplete, Checkbox, Form } from 'antd';
import API from '../../lib/API';
import hasRole from '../../lib/HasRole';

class Admin extends Component {
    state = {
        users: null,
        roles: null,
        roleState: null
    }

    async componentDidMount() {
        const response = await API.Users.getAll();
        const users = response.data.map(user => {
            return { id: user.id, value: `${user.firstName} ${user.lastName}`, roles: user.Roles }
        })
        const getRoles = await API.Roles.getAll();
        this.setState({ users, roles: getRoles.data })
    };

    onSelect = (value, selectedUser) => {
        const roleState = this.state.roles.map(role => {
            return { name: [role.id], value: hasRole(role.title, selectedUser.roles) }
        })
        this.setState({ roleState });
    }

    render() {
        if (this.state.users && this.state.roles) {
            return (
                <Fragment>
                    <div className='card-body'>
                        <h6 className="mb-3"><span className="text-primary">Manage</span> user roles</h6>
                        <AutoComplete placeholder='Select User'
                            style={{ minWidth: '150px' }}
                            options={this.state.users}
                            onSelect={this.onSelect}
                        />
                        <Form fields={this.state.roleState}>
                            {this.state.roles.map(role => {
                                return (
                                    <Form.Item
                                        valuePropName="checked"
                                        name={role.id}
                                        key={role.id}
                                    >
                                        <Checkbox>{role.title}</Checkbox>
                                    </Form.Item>
                                )
                            })}
                        </Form>
                    </div>
                    <div className='card-footer'>&nbsp;</div>
                </Fragment>
            );
        } else {
            return <div>Loading...</div>
        }
    }
}

export default Admin;
