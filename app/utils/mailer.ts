import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "bloggieapp@gmail.com",
    pass: "fthqtorropvylczy",
  },
});

export const sendEmailService = async (to: string[], subject: string, text: string) => {
  const mailOptions = {
    subject,
    html: text,
  };

  const sendToRecipient = async (email: string) => {
    await transporter.sendMail({ ...mailOptions, to: email });
  };

  await Promise.all(to.map(sendToRecipient));
};
