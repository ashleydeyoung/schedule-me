import React, { Component, Fragment } from "react";
import LinkButton from "../Button/LinkButton";
import { Collapse, Checkbox } from "antd";
import "antd/dist/antd.css"
import API from "../../lib/API"

const { Panel } = Collapse;

class Services extends Component {
  state = {
    serviceCategories: []
  }

  async componentDidMount() {
    const response = await API.Services.getServicesWithCategory();
    const categories =[];
    response.data.map(service => {
      let exists = categories.filter(category => category.id === service.ServiceCategory.id)
      if (!exists.length) {
        return categories.push(service.ServiceCategory);
      }
      return false;
    })
    const serviceCategories = categories.map(category => {
      const services = response.data.filter(service => service.ServiceCategoryId === category.id)
      return {category, services}
    })
    this.setState({ serviceCategories });
  }
   
  render() {
    return (
      <Fragment>
        <div className="card-body">
          <h6 className="pb-2">
            <span className="text-primary">Select</span> from services:
          </h6>
          <Collapse accordion>
            {/* <Panel header="This is panel header 1" key="1">
              <p>{this.text}</p>
              <Checkbox >Checkbox</Checkbox>
            </Panel> */}
            {this.state.serviceCategories.map(serviceCategory => {
              return (<Panel header= {serviceCategory.category.name} key={serviceCategory.category.id}>
                {serviceCategory.services.map(service => (<Checkbox key={service.id}>{service.name}</Checkbox>))}
              </Panel>)
            })}
          </Collapse>
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="col-8 offset-2">
              <LinkButton
                label="Home"
                redirectTo="/"
                buttonStyle="btn-secondary float-left"
              />
              <LinkButton
                label="Calendar"
                redirectTo="/schedule/calendar"
                buttonStyle="btn-primary float-right"
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Services;
