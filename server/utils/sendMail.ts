import nodemailer from 'nodemailer';

async function sendMail(
  from: string,
  to: string,
  subject: string,
  html: string
) {
  const testAccount = await nodemailer.createTestAccount();
  console.log(testAccount);

  const transport = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transport.sendMail({ from, to, subject, html });
  console.log('Message sent%', info.messageId);
  console.log('Preview URL %', nodemailer.getTestMessageUrl(info));
}

export default sendMail;
