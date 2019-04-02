var express = require('express');
var router = express.Router();
const nodeMailer = require('nodemailer');
var request = require('request');
var mail;
var Mail = require('../controllers/mail')
var tokenOriginal = "";


/* Vai para a página index */
router.get('/', function(req, res, next) {
  res.render('index');
});


/* Depois de clicar no botão, vai para a página do login (app autenticação) */
router.get('/toLogin',(req,res) =>{
  res.redirect('http://localhost:4000/')
});


/* Recebe o mail e o token pelo URL da primeira aplicação e faz a verificação dos tokens:
  -> Logout: Sai para pág inicial
  -> Alteração do token no url ou na caixa de texto: Sai para pág inicial
  -> Faz refresh á pag: continua */
router.get('/mail/:mail',(req, res) => {
  
  //VERIFICAÇÃO INTERNA DO TOKEN
  var ttoken = req.query.token;
  var verifyTokenRequest = {
    url: "http://localhost:4000/mail/validate",
    method: "POST",
    form: { token: ttoken }
  }
        request(verifyTokenRequest, function (err, res2, body) {
            if (err) {
                 console.log("Á espera de token válido");
              }
            else {
                console.log("EMAIL SENT");
            }
        });
  //VERIFICACÃOs EXTERNA (POR VARIAVEL GLOBAL)     
  console.log('Utilizador -> ' +req.params.mail)
  console.log('Token -> ' + req.query.token)    
  if(tokenOriginal == ""){
    mail = req.params.mail
    tokenOriginal = req.query.token
    res.render('mail',{
      mail:req.params.mail, 
      token:req.query.token
    }) 
  }else{
    if(tokenOriginal != req.query.token){
      tokenOriginal = ""
      console.log("2ªVerificação->token : " + tokenOriginal)
      //para "resetar" o token caso nao se verifique a comparação
      res.redirect('http://localhost:4000/logout/'+mail)
    }
  }
})


/*Faz "reset" ao token e redireciona para a app de autenticação */
router.get('/logout',(req,res) => {
  tokenOriginal = ""
  res.redirect('http://localhost:4000/logout/'+mail)
})

// configuration =================
var sendmail = require('sendmail')({
  logger: {
      debug: console.log,
      info: console.info,
      warn: console.warn,
      error: console.error
  },
  silent: false,
  /*dkim: { // Default: False
      privateKey: fs.readFileSync('./dkim-private.pem', 'utf8'),
      keySelector: 'mydomainkey'
  },*/
  smtpPort: 25, // Default: 25
  smtpHost: 'smtp' // Default: -1 - extra smtp host after resolveMX
});



router.post('/enviaMail', function(req, res, next) {


  var remetenteValue = req.body.remetente
  var destinatarioValue = req.body.destinatario
  var assuntoValue = req.body.assunto
  var corpo_mensagemValue = req.body.corpo_mensagem

  var struct = {remetente: remetenteValue, destinatario: destinatarioValue, assunto: assuntoValue, corpo_mensagem: corpo_mensagemValue}
  //process.stdout.write(struct);
  console.log(struct)
  sendmail({
    from: 'no-reply@vrg3.gcom.di.uminho.pt',
    to: 'brunobarieira.95@hotmail.com',
    subject: 'test sendmail',
    html: 'Mail of test sendmail ',
  });
  res.render('index')
});
  



module.exports = router;
