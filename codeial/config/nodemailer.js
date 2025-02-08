// const nodemailer = require("nodemailer");
// const ejs = require('ejs');
// const path = require('path');

// let transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: "pranjalsinha1965@gmail.com",
//     pass: "k`Fw_y`af4\>(fJ"
//   }, 
//   tls: {
//     rejectUnauthorized: false // Allow self-signed certificates
//   }
// });

// let renderTemplate = async (data, relativePath) => {
//   try {
//     const template = await ejs.renderFile(
//       path.join(__dirname, '../views/mailers', relativePath),
//       data
//     );
//     return template;
//   } catch (err) {
//     console.error("Error in rendering template:", err);
//     return '';
//   }
// };

// module.exports = {
//   transporter,
//   renderTemplate
// };

const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "pranjalsinha1965@gmail.com",
    pass: "k`Fw_y`af4\>(fJ" // Replace with the generated App Password
  }, 
  tls: {
    rejectUnauthorized: false // Allow self-signed certificates
  }
});

let renderTemplate = async (data, relativePath) => {
  try {
    const template = await ejs.renderFile(
      path.join(__dirname, '../views/mailers', relativePath),
      data
    );
    return template;
  } catch (err) {
    console.error("Error in rendering template:", err);
    return '';
  }
};

module.exports = {
  transporter,
  renderTemplate
};
