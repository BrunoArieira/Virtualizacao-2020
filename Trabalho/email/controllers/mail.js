var nodemailer = require("nodemailer");

//modulo, onde são inseridos os parametros do email, como a respetiva porta e host
module.exports.sendEmail = async (dadosMailSend) => {
    console.log(dadosMailSend)
    var transport = nodemailer.createTransport({
    host: "smtp",
    port: 25,
    ignoreTLS: true
    //name: "3.gcom.di.uminho.pt"
    });
    let mailOptions = {
      from: dadosMailSend.sender,
      to: dadosMailSend.receiver,
      text: dadosMailSend.message
    }
  
    let info = await transport.sendMail(mailOptions);
  }



