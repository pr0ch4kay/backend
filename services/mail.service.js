
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

const sendCode = async (email, code) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Verification Code",
    text: `Code: ${code}`
  });
};

module.exports = { sendCode };
