import React, { Component } from 'react';

class BasePage extends Component {
    render() {
        let Page = this.props.page;
        return (
            <div className='Home'>
                <div className='row'>
                    <div className='col'>
                        <h1>Hair-Did Stylists</h1>
                        <p style={{ fontStyle: "italic" }}>Keepin' you styled!!!</p>
                        <div className="card text-center">
                            <div className="card-header">
                                <h4>Welcome {this.props.user?.email}</h4>
                            </div>
                            <Page />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BasePage;
