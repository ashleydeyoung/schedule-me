import axios from 'axios';

export default {
  Users: {
    login: function (email, password) {
      return axios.post('/api/users/login', { email, password });
    },

    create: function (email, password, firstName, lastName, preferredName) {
      return axios.post('/api/users', { email, password, firstName, lastName, preferredName });
    },

    getMe: function (authToken) {
      return axios.get('/api/users/me', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
    }
  },

  Services: {
    getServicesWithCategory: function () {
      return axios.get('/api/services', {
        params: {
          withCategory: true
        }
      })
    }
  }
}
