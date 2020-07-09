import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LinkButton extends Component {
    render() {
        return (
            <Link to={this.props.redirectTo}>
                <button className={`btn btn-default ${this.props.buttonClass}`} style={this.props.style}>
                    {this.props.label}
                </button>
            </Link>
        );
    }
}

export default LinkButton;
