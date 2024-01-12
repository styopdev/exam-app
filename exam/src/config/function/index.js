const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

const saveAnswerAndSendEmail = functions.https.onCall(async (data, context) => {

  const { question, answer } = data;

  const transporter = nodemailer.createTransport({
  
  });

  const mailOptions = {
    from: 'your-email@example.com',
    to: 'anahit.asastryan.1995@gmail.com',
    subject: 'New Answer Submitted',
    text: `Question: ${question}\nAnswer: ${answer}`,
  };

  await transporter.sendMail(mailOptions);

  return { success: true };
});

module.exports = {
  saveAnswerAndSendEmail,
 
};
