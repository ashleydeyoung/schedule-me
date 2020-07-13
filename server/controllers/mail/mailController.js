const mailController = require("express").Router();
const sgMail = require("@sendgrid/mail");

mailController.post("/feedback", async (req, res) => {
  sgMail.setApiKey(process.env.SEND_GRID_KEY);
  console.log(process.env.SEND_GRID_KEY);
  const mail = {
    from: "info.scheduleme@gmail.com",
    to: "info.scheduleme@gmail.com",
    subject: "Schedule-me Feedback Form",
    html: `<p>Email: ${req.body.email}</p><p>Feedback: ${req.body.text}</p>`,
  };
  try {
    await sgMail.send(mail);
    res.sendStatus(200);
  } catch (e) {
    console.log(e.response.body.errors);
    res.sendStatus(500);
  }
});

module.exports = mailController;
