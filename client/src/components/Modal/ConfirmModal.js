import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class ConfirmModal extends Component {
    render() {
        return (
            <Modal
                show = {this.props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton onClick={this.props.onHide}>
                <Modal.Title id="contained-modal-title-vcenter">
                    {this.props.title}
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.children}
                </Modal.Body>
                <Modal.Footer>
                <Button className="btn-danger" onClick={this.props.onNo}>
                    No
                </Button>
                <Button className="btn-primary" onClick={this.props.onYes}>
                    Yes
                </Button>
                </Modal.Footer>
            </Modal>
            );
    }
}

export default ConfirmModal;
