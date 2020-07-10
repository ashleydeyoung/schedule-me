import React, { Fragment, Component } from 'react';
import { AutoComplete, Checkbox, Form } from 'antd';
import API from '../../lib/API';
import hasRole from '../../lib/HasRole';

class Admin extends Component {
    state = {
        users: null,
        roles: null,
        selectedUser: null
    }

    async componentDidMount() {
        const response = await API.Users.getAll();
        const users = response.data.map((user) => {
            return { id: user.id, value: `${user.firstName} ${user.lastName}`, Roles:user.Roles }
        })

        const getRoles = await API.Roles.getAll();

        this.setState({ users, roles: getRoles.data })
    };

    onSelect(value, selectedUser) {
        selectedUser.hasRole = hasRole;
        this.setState({selectedUser}) 
    }

    render() {
        if (this.state.users && this.state.roles) {
            return (
                <Fragment>
                    <div className='card-body'>
                        <AutoComplete placeholder='Select User' style={{ minWidth: '150px' }} options={this.state.users} />
                        <Form>
                        
                        {this.state.roles.map((role) => {
                            return (
                                <Form.Item
                                    valuePropName="checked"
                                    name={role.id}
                                    key={role.id}
                                    initialValue={this.state.selectedUser?.hasRole(role.title)}
                                >
                                    <Checkbox>{role.title}</Checkbox>
                                </Form.Item>
                            )
                        })}
                        </Form>
                    </div>
                    <div className='card-footer'>
                        &nbsp;
                </div>
                </Fragment>
            );
        } else {
            return <div>Loading...</div>
        }
    }
}

export default Admin;