import React, { Component } from "react";

class BasePage extends Component {
    render() {
        let Page = this.props.page;
        if (this.props.user) {
            return (
                <div className='Home'>
                    <div className='row'>
                        <div className='col'>
                            <h1 className="mb-1">Hair-Did Stylists</h1>
                            <p className="mb-4" style={{ fontStyle: "italic" }}>Keepin' you styled!!!</p>
                            <div className="card text-center" style={{ paddingBottom: "50px" }}>
                                <div className="card-header">
                                    <h4 className="mb-0">Welcome, <span className= "text-primary">{this.props.user?.preferredName}</span></h4>
                                </div>
                                <Page {...this.props.pageProps} user={this.props.user} />
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <div>Loading...</div>
        }
    }
}

export default BasePage;
