import React, { Fragment, Component } from 'react';
import OkModal from '../Modal/OkModal';
import { AutoComplete, Input } from 'antd';
import API from '../../lib/API';

class ServiceManagement extends Component {
    state = {
        showModal: false,
        services: null,
        newService: null,
        duration: null,
        selectedService: null,
        selectedCategory: null,
        serviceOptions: null,
        categoryOptions: null
    };

    async componentDidMount(){
        const response =  await API.Services.getServicesWithCategory();
        const services = response.data;
        const serviceOptions = services.map(service => {
            return {id: service.id, value: service.name};
        })
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
        const categoryOptions = categories.map(category => {
            return {id: category.id, value: category.name};
        })
        this.setState({services, serviceOptions, categoryOptions})
    }
    
    setService = (newService) => {
        this.setState({newService})
    }

    setDuration = (duration) => {
        this.setState({duration})
    }


    setSelectedCategory = (value, selectedCategory) => {
        this.setState({selectedCategory})
    }

    setSelectedService = (value, selectedService) => {
        this.setState({selectedService})
    }

    addService = async () => {
        const service = {service: {name: this.state.newService, time: this.state.duration}, categoryId: this.state.selectedCategory.id};
        await API.Services.createService(service);
        this.setState({showModal: true});
    }

    removeService = async () => {
        await API.Services.removeService(this.state.selectedService);
        this.setState({showModal: true});
    }

    render() {
        return (
            <Fragment>
                <div className='card-body'>
                    <h6 className="mb-3"><span className="text-primary">Manage</span> Services</h6> 
                    <h6><span className="text-success">Add</span> a service</h6>
                    <Input className="mb-2" type="text" name="service"
                        style={{ width: '50%' }} 
                        placeholder=" Add a Service" 
                        onChange={e => this.setService(e.target.value)} 
                    /><br />
                    <Input className="mb-2" type="number" name="duration"
                        style={{ width: '50%' }}
                        placeholder=" Task time in minutes" 
                        onChange={e => this.setDuration(e.target.value)} 
                    /><br />
                    <AutoComplete className="mb-3" placeholder='Select category'
                        style={{ width: '50%' }}
                        options={this.state.categoryOptions}
                        onSelect={this.setSelectedCategory}
                    />
                    <br />
                    <button className="btn btn-default btn-success" onClick={this.addService}>Add</button>
                    <hr />
                    <h6><span className="text-danger">Remove</span> a service</h6>

                    <AutoComplete className="mb-3" placeholder='Select service'
                        style={{ width: '50%' }}
                        options={this.state.serviceOptions}
                        onSelect={this.setSelectedService}
                    />
                    <br />
                    <button className="btn btn-default btn-danger" onClick={this.removeService}>Remove</button>
                </div>
                <div className='card-footer'>
                    &nbsp;
                </div>
                <OkModal show={this.state.showModal} onHide={() => {
                    this.setState({showModal: false});
                    window.location='/';
                }}>
                    <p>Service updated!</p>    
                </OkModal>
            </Fragment>
        );
    } 
}

export default ServiceManagement;