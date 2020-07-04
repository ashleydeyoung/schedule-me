import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import Options from '../../components/Options/Options';

class HomePage extends Component {
  render() {
    return (
      <div className='Home'>
        <div className='row'>
          <div className='col'>
            <h1>Hair-Did Stylists</h1>
            <p style={{ fontStyle: "italic" }}>Keepin' you styled!!!</p>
            <div className="card text-center">
              <div className="card-header">
                <h4>Welcome {`userName`}</h4>
              </div>
              <Switch>
                <PrivateRoute exact path='/options' component={Options} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
