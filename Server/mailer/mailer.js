const nodemailer = require("nodemailer")




async function mailer(otp,subject) {



  let transporter = nodemailer.createTransport({
    service:"gmail",
    secure: false,
    auth: {
      user: 'gamegramsocial@gmail.com',
      pass: "xmxfiydzvjgwiqpi",
    },
  });


  let info = await transporter.sendMail({
    from: 'ajithBOoooo@gmail.com', // sender address
    to: "aji001ajith@gmail.com", // list of receivers
    subject: "iam here", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}


module.exports = {mailer}