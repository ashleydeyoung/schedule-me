import React, { Fragment, Component } from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import UserManagement from './UserManagement';
import BusinessSettings from './Settings';

class Admin extends Component {
    render() {
        return (
            <Fragment>
                <Tabs className="justify-content-center" defaultActiveKey="settings" id="uncontrolled-tab-example">
                    <Tab eventKey="mgmt" title="User Management">
                        <UserManagement />
                    </Tab>
                    <Tab eventKey="settings" title="Business Settings">
                        <BusinessSettings />
                    </Tab>
                </Tabs>
            </Fragment>
        );
    }
}

export default Admin;
