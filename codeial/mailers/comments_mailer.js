// const nodeMailer = require('../config/nodemailer');

// this is another way of exporting a method
// exports.newComment = (comment) => {
//     let htmlString = nodeMailer.renderTemplate({
//         comment:comment
//     }, '/comments/new_comment.ejs');
//   const mailOptions = {
//     from: 'pranjalsinha1965@gmail.com',
//     to: comment.user.email,
//     subject: "New Comment Published",
//     html: `<h1>Yup, your comment is now published!</h1>
//            <p>Thank you for engaging in our platform.</p>`
//   };

//   nodeMailer.transporter.sendMail({
//     from: 'pranjalsinha1965@gmail.com',
//     to: comment.user.email,
//     subject: "New Comment Published",
//     html: `<h1>Yup, your comment is now published!</h1>
//            <p>Thank you for engaging in our platform.</p>`
//   }, (err, info) => {
//     if(err){
//       console.error("Error in sending mail:", err);
//       return;
//     }
//     console.log('Message sent:', info.response);
//     return;
//   });
// };

const nodeMailer = require('../config/nodemailer');
exports.newComment = (comment) => {
let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');
nodeMailer.transporter.sendMail({
  from: "pranjalsinha1965@gmail.com", 
  to: comment.user.email, 
  subject: "New Comment Published !!", 
  html: htmlString 
}, (err, info) => {
  if(err){
    console.log('Error in sedning mail', err);
    return;
  }
  return;
});
}