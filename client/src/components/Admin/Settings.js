import React, { Fragment, Component } from 'react';
import DatePicker from 'react-datepicker';
import { Button, Card, Form, Row, Col } from 'react-bootstrap';
import API from '../../lib/API';
import moment from 'moment';
import OkModal from '../Modal/OkModal';

class BusinessSettings extends Component {
    state = {
        hours: null,
        showModal: false
    }

    async componentDidMount() {
        const hours = await API.BusinessSettings.getHours();
        this.setState({ hours });
    }

    onSubmit = async () => {
        await Promise.all([
            this.state.hours.map(hour => API.BusinessSettings.updateSetting(hour))
        ]);
        this.setState({ showModal: true });
    }

    onChange(key, date) {
        const { hours } = this.state;
        const newHours = hours.map(hour => {
            if(hour.name !== key) return hour;
            hour.value = moment(date).format("HH:mm");
            return hour;
        });

        this.setState(this.setHours(newHours))
    }

    setHours = (hours) =>
        (previousState, currentProps) => {
            return { ...previousState, hours };
        }

    render() {
        if (this.state.hours) {
            return (
                <Fragment>
                    <Card.Body>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Label className="mr-2 float-right">Business Opening Time</Form.Label>
                                </Col>
                                <Col>
                                    <span className="float-left">
                                        <DatePicker
                                            selected={new Date(`1900-01-01 ${this.state.hours?.filter(hour => hour.name === "OpenTime")[0].value || "09:00"}`)}
                                            onChange={date => this.onChange("OpenTime", date)}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={30}
                                            timeCaption="Time"
                                            dateFormat="h:mm aa"
                                        />
                                    </span>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label className="mr-2 float-right">Business Closing Time</Form.Label>
                                </Col>
                                <Col >
                                    <span className="float-left">
                                        <DatePicker
                                            selected={new Date(`1900-01-01 ${this.state.hours?.filter(hour => hour.name === "CloseTime")[0].value || "17:00"}`)}
                                            onChange={date => this.onChange("CloseTime", date)}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={30}
                                            timeCaption="Time"
                                            dateFormat="h:mm aa"
                                        />
                                    </span>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={this.onSubmit}>Submit</Button>
                    </Card.Footer>
                    <OkModal
                        show={this.state.showModal}
                        onHide={() => this.setState({ showModal: false })}
                    >
                        <p>Settings updated</p>
                    </OkModal>
                </Fragment>
            );
        } else {
            return <div>Loading...</div>
        }
    }
}

export default BusinessSettings;
