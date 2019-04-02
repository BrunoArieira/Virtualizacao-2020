var nodemailer = require("nodemailer");


module.exports.sendEmail = async (struct) => {
    console.log(struct)
    var transport = nodemailer.createTransport({
    host: "smtp",
    port: 25,
    ignoreTLS: true
    });
    console.log('Aquiiiiiiiiii')
    let mailOptions = {
      from: struct.remetente,
      to: struct.destinatario,
      text: struct.corpo_mensagem
    }
  
    let info = await transport.sendMail(mailOptions);
  }


//   module.exports.sendEmail = async (struct) => {
//     try{
//         console.log('Está a entrar')
//         let s = new SMTPClient ({
//             host: '3.gcom.di.uminho.pt',
//             port: 25
//             })
    
    
//         await s.connect();
//                 await s.greet({hostname: '3.gcom.di.uminho.pt'})
//                 await s.mail({from: struct.remetente})
//                 await s.rcpt({to: struct.destinatario})
//                 await s.data(struct.corpo_mensagem)
//                 await s.quit()
//   }catch(erro){
//       return console.log('Não está a enviar')
//   }
// }


