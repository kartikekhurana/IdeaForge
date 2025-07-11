import nodemailer from "nodemailer";

const sendEmail = async (to, subject, html) => {
  //create transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  const mailOptions = {
    from: '"ideaForge Support" <no-reply@ideaforge.com>',
    to,
    subject,
    html,
  };
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
