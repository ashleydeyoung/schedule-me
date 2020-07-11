import React, { Component, Fragment } from "react";
import { Form, Collapse, Checkbox } from "antd";

import LinkButton from "../Button/LinkButton";
import OkModal from "../Modal/OkModal";

import "antd/dist/antd.css";
import API from "../../lib/API";

const { Panel } = Collapse;

class Services extends Component {
  state = {
    serviceCategories: [],
    selectedServices: new Set(),
    modalShow: false
  };

  async componentDidMount() {
    const response = await API.Services.getServicesWithCategory();
    const categories = [];
    response.data.map((service) => {
      let exists = categories.filter(
        (category) => category.id === service.ServiceCategory.id
      );
      if (!exists.length) {
        return categories.push(service.ServiceCategory);
      }
      return false;
    });
    const serviceCategories = categories.map((category) => {
      const services = response.data.filter(
        (service) => service.ServiceCategoryId === category.id
      );
      return { category, services };
    });
    this.setState({ serviceCategories });
    this.setState(this.setSelectedServices(this.props.appointment.services));
  }

  onValuesChange = (changedValues, allValues) => {
    const serviceId = Object.keys(changedValues)[0];
    const selected = changedValues[serviceId];
    if (selected) {
      this.state.selectedServices.add(serviceId);
      this.setState(this.setSelectedServices([...this.state.selectedServices]));
    } else {
      this.state.selectedServices.delete(serviceId);
      this.setState(this.setSelectedServices([...this.state.selectedServices]))
    }
    this.props.appointment.services = [...this.state.selectedServices];
  }

  setSelectedServices = services =>
    (previousState, currentProps) => {
      return {...previousState, selectedServices: new Set(services)};
    }

  render() {
    return (
      <Fragment>
        <div className="card-body">
          <h6 className="pb-2">
            <span className="text-primary">Select</span> from services:
          </h6>
          <Form onValuesChange={this.onValuesChange}>
            <Collapse accordion>
              {this.state.serviceCategories.map((serviceCategory) => {
                return (
                  <Panel
                    header={serviceCategory.category.name}
                    key={serviceCategory.category.id}
                  >
                    {serviceCategory.services.map((service) => {
                      return (
                        <Form.Item
                          valuePropName="checked"
                          name={service.id}
                          key={service.id}
                          initialValue={this.props.appointment.services.includes(service.id.toString())}
                        >
                          <Checkbox>{service.name}</Checkbox>
                        </Form.Item>
                      )
                    })}
                  </Panel>
                );
              })}
            </Collapse>
          </Form>
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="col-8 offset-2">
              <LinkButton
                label="Home"
                redirectTo="/"
                buttonClass="btn-secondary float-left"
              />
              <LinkButton
                label="Calendar"
                redirectTo="/schedule/calendar"
                buttonClass="btn-primary float-right"
                onClick={() => this.setState({modalShow: true})}
                allowRedirect={this.state.selectedServices.size !== 0}
              />
            </div>
          </div>
        </div>
        <OkModal
          show={this.state.modalShow}
          onHide={() => this.setState({modalShow: false})}
        >
          <p>Select a service</p>
        </OkModal>
      </Fragment>
    );
  }
}

export default Services;
