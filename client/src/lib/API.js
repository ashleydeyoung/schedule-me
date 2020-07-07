import axios from "axios";

export default {
  Users: {
    login: function (email, password) {
      return axios.post("/api/users/login", { email, password });
    },

    create: function (email, password, firstName, lastName, preferredName) {
      return axios.post("/api/users", {
        email,
        password,
        firstName,
        lastName,
        preferredName,
      });
    },

    getMe: function (authToken) {
      return axios.get("/api/users/me", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    },
  },

  Appointments: {
    getByClientId: function (clientID) {
      return axios.get("/api/appointments", { params: { clientID } });
    },

    Services: {
      getServicesWithCategory: function () {
        return axios.get("/api/services", {
          params: {
            withCategory: true,
          },
        });
      },
    },
  },
};
