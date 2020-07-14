import axios from 'axios';
import moment from 'moment';

export default {
  Users: {
    login: function (email, password) {
      return axios.post("/api/users/login", { email, password });
    },

    setRoles: function (user, roles) {
      return axios.put(`/api/users/${user.id}/roles`, roles);
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

    update: function (user, authToken) {
      return axios.put(`/api/users/${user.id}`, user, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
    },

    getAll: function() {
      return axios.get('/api/users');
    }
  },

  Appointments: {
    toDoubleDigits: (time) => time < 10 ? `0${time}` : time,
    getAvailability: async function (day) {
      const hours = (await axios.get('/api/businesssettings/hours')).data;
      const openTimeStringParts = hours.filter(hour => hour.name === "OpenTime")[0].value.split(':');
      const closeTimeStringParts = hours.filter(hour => hour.name === "CloseTime")[0].value.split(':');
      const open = Number(openTimeStringParts[0]) + Number(openTimeStringParts[1])/60;
      const close = Number(closeTimeStringParts[0]) + Number(closeTimeStringParts[1])/60;
      const timeSlotInterval = 30;
      const timeSlots = [];

      // Generate timeslots from open to close
      for (let i = open; i < close; i = i + (timeSlotInterval / 60)) {
        let hour = this.toDoubleDigits(Math.trunc(i));
        let minutes = this.toDoubleDigits((i % 1) * 60);
        timeSlots.push({ time: `${hour}:${minutes}`, isAvailable: true });
      }

      let response = await axios.get('/api/appointments', { params: { day } });
      let appointments = response.data;

      let filledSlots = 0;
      timeSlots.forEach((timeSlot, index) => {

        // If we have slots waiting to be filled, use those
        if (filledSlots > 0) {
          // If there's less than 1 slot left, set it to 0
          Math.floor(filledSlots) === 0 ? filledSlots = 0 : filledSlots--;
          timeSlot.isAvailable = false;
          return;
        }

        // Determine if there are any appointments that line up with this slot
        let blockers = appointments.filter((appointment) => {
          const numberOfSlots = appointment.length / timeSlotInterval;
          const startTime = moment(appointment.startTime);
          const timeString = `${this.toDoubleDigits(startTime.hour())}:${this.toDoubleDigits(startTime.minutes())}`;

          // Check if the time string is between this timeslot and the next.
          // If so, determine if we need to fill any additional timeslots
          if (timeString >= timeSlot.time
            && timeString < timeSlots[index + 1]?.time) {
            filledSlots = Math.floor(numberOfSlots) === 0 ? 0 : numberOfSlots - 1;

            return true;
          }
          return false;
        });

        if (blockers.length > 0) {
          timeSlot.isAvailable = false;
        }
      });

      return {timeSlots, timeSlotInterval};
    },
    create: (appointment) => axios.post('/api/appointments', appointment),
    getByClientId: function (clientID) {
      return axios.get("/api/appointments", { params: { clientID } });
    },
    cancel: function (id) {
      return axios.delete(`/api/appointments/${id}`);
    }
  },

  Services: {
    getServicesWithCategory: function () {
      return axios.get("/api/services", {
        params: {
          withCategory: true,
        },
      });
    },

    createService: function (service) {
      return axios.post(`/api/services/`, service);
    },

    removeService: function (service) {
      return axios.delete(`/api/services/${service.id}`);
    }
  },

  Roles: {
    getAll: function() {
      return axios.get('/api/roles');
    }
  },

  BusinessSettings: {
    getHours: async function() {
      return (await axios.get('/api/businesssettings/hours')).data;
    },

    updateSetting: async function(setting) {
      return (await axios.put(`/api/businesssettings/${setting.id}`, setting)).data;
    }
  }
};
