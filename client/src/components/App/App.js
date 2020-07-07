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
import Services from '../Services/Services';


class App extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = (user, authToken) => {
      TokenStore.setToken(authToken);
      this.setState(prevState => ({ auth: { ...prevState.auth, user, authToken } }));
    };

    this.handleLogout = () => {
      TokenStore.clearToken();
      this.setState(prevState => ({ auth: { ...prevState.auth, user: undefined, authToken: undefined } }));
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
      }
    }
  }

  componentDidMount() {
    const { authToken } = this.state.auth;
    if (!authToken) return;

    API.Users.getMe(authToken)
      .then(response => response.data)
      .then(user => this.setState(prevState => ({ auth: { ...prevState.auth, user } })))
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
              <PrivateRoute exact path='/schedule/timeslots' page={TimeSlotWrapper} pageProps={{appointment: this.state.newAppointment}} component={Base} />
              <PrivateRoute exact path='/schedule/calendar' pageProps={{appointment: this.state.newAppointment}} page={Schedule} component={Base} />
              <PrivateRoute exact path='/schedule/services' pageProps={{appointment: this.state.newAppointment}} page={Services} component={Base} />
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
