import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="card row fixed-bottom bg-dark text-center border-top border-info border-bottom-0"
                    style={{borderWidth: "3px !important"}}>
                    <span className="text-white-50">&copy;2020 Schedule-Me</span>
                    <p className="text-muted">
                        <a className="text-muted" href="https://github.com/ashleydeyoung" target="_blank" rel="noopener noreferrer">Ashley DeYoung | </a>
                        <a className="text-muted" href="https://github.com/hdarden" target="_blank" rel="noopener noreferrer">Helen Darden | </a>
                        <a className="text-muted" href="https://github.com/sm-pixel" target="_blank" rel="noopener noreferrer">Samantha Morrison | </a>
                        <a className="text-muted" href="https://github.com/RyanFCarr" target="_blank" rel="noopener noreferrer">Ryan Carr</a>
                    </p>
                </div>
            </footer>
        );
    }
}

export default Footer;
