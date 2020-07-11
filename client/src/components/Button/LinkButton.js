import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LinkButton extends Component {
    render() {   
        const btn = 
        (<button
            disabled={this.props.disabled}
            className={`btn btn-default ${this.props.buttonClass}`}
            style={this.props.style}
            onClick={this.props.onClick}
        >
            {this.props.label}
        </button>);

        if(this.props.allowRedirect === false){
            return btn;
        } else {
            return (
                <Link to={this.props.redirectTo}>
                    {btn}
                </Link>
            );
        }
        
    }
}

export default LinkButton;
