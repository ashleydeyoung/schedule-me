import axios from 'axios';


export default {
    feedback: function (email, text) {
        return axios.post("/mail/feedback", {email, text});
    }
}