import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class UpdateModal extends Component {
    render() {
        return (
            <Modal
                show={this.props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton onClick={this.props.onHide}>
                </Modal.Header>
                <Modal.Body>
                    {this.props.children}
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-primary" onClick={this.props.onHide}>
                        OK!
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default UpdateModal;