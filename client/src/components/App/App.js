import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import API from '../../lib/API';
import TokenStore from '../../lib/TokenStore';
import AuthContext from '../../contexts/AuthContext';
import Navigation from '../../components/Navigation/Navigation';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import Base from '../../components/Base/Base';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import NotFound from '../../pages/NotFound/NotFound';

import './App.css';
import Options from '../Options/Options';
import TimeSlotWrapper from '../TimeSlot/TimeslotWrapper';
import Footer from '../Footer/Footer';
import Schedule from '../Schedule/Schedule';
import Appointments from '../Appointments/Appointments'
import Services from '../Services/Services';
import Update from '../Update/Update';
import Admin from '../Admin/Admin';
import Feedback from '../Feedback/Feedback';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = (user, authToken) => {
      TokenStore.setToken(authToken);
      this.setState(prevState => ({
        auth: { ...prevState.auth, user, authToken },
        newAppointment: { ...prevState.newAppointment, clientID: user.id }
      }));
    };

    this.handleLogout = () => {
      TokenStore.clearToken();
      this.setState(prevState => ({
        auth: { ...prevState.auth, user: undefined, authToken: undefined },
        newAppointment: { ...prevState.newAppointment, clientID: undefined }
      }));
    }

    this.state = {
      auth: {
        user: undefined,
        authToken: TokenStore.getToken(),
        onLogin: this.handleLogin,
        onLogout: this.handleLogout
      },
      newAppointment: {
        startDate: null,
        services: [],
        startTime: null,
        clientID: null
      }
    }
  }

  componentDidMount() {
    const { authToken } = this.state.auth;
    if (!authToken) return;

    API.Users.getMe(authToken)
      .then(response => response.data)
      .then(user => {
        this.setState(prevState => ({
          auth: { ...prevState.auth, user },
          newAppointment: { ...prevState.newAppointment, clientID: user.id }
        }))
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <AuthContext.Provider value={this.state.auth}>
        <div className='App'>
          <Navigation />
          <div className='container'>
            <Switch>
              <PrivateRoute exact path='/' page={Options} component={Base} />
              <PrivateRoute exact path='/appointments' page={Appointments} component={Base} />
              <PrivateRoute exact path='/schedule/timeslots' pageProps={{ appointment: this.state.newAppointment }} page={TimeSlotWrapper} component={Base} />
              <PrivateRoute exact path='/schedule/calendar' pageProps={{ appointment: this.state.newAppointment }} page={Schedule} component={Base} />
              <PrivateRoute exact path='/schedule/services' pageProps={{ appointment: this.state.newAppointment }} page={Services} component={Base} />
              <PrivateRoute exact path='/update' pageProps={{ authToken: this.state.auth.authToken, handleLogin: this.handleLogin }} page={Update} component={Base} />
              <PrivateRoute exact path='/admin' page={Admin} authorizedRole='admin' component={Base} />
              <PrivateRoute exact path='/feedback' page={Feedback} component={Base} />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
        <Footer />
      </AuthContext.Provider>
    );
  }
}

export default App;
