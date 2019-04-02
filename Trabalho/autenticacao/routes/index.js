var express = require('express')
var router = express.Router()
var axios = require('axios')
var passport = require('passport')
var jwt = require('jsonwebtoken')
var User = require('../controllers/user')


/* renderização da página index */
router.get('/', (req,res) => {
  res.render('index')
})


/* Onde faz o login e onde o token é gerado conforme o utilizador */
/* Caso se verifiquem as credenciais é feito o redirect para a página de envio do email */
router.post('/', async (req,res,next) => {
  passport.authenticate('login', async (err,user,info)=> {
      try {
          if(err || !user){
              const error = new Error('An Error Occured')
              return next(error);
          }
          req.login(user, {session: false}, async (error) => {
              if(error) return next(error)
              const myuser = {_id: user._id} 
              const token = jwt.sign({user: myuser}, 'vr2019')
              User.atualiza(req.body,token)
                  .then(dados => {
                    console.log('Dados -> '+dados)
                    res.redirect('http://localhost:9000/mail/'+dados.email+'?token=' + token)
                  })
                  .catch(erro => res.status(500).send('Erro a enviar dados de utilizador ' + erro))
          })
      } catch (error) {
          return next(error)
      }
  }) (req,res,next)
})

/* Renderização da página registarUser */
router.get('/registar',(req, res) => {
  res.render('registarUser')
})

/* Inserção dos dados de utilizador na base de dados, através da query "inserir" */
router.post('/users/registar',(req, res) => {
  User.inserir(req.body)
      .then(dados => res.redirect('http://localhost:4000/'))
      .catch(erro => res.status(500).send('Erro na inserção do Utilizador: ' + erro))
})


/* Validação interna do token gerado por determinado utilizador */
/* Faz-se a comparação de o token na bases de dados, caso exista, verifica-se (query: "comparaToken") */
router.post("/mail/validate", function (req, res) {
  var received = req.body.token;
  console.log("Received Connection from MAIL SERVICE");
  User.comparaToken(received)
          .then(() => console.log('TOKEN VÁLIDO!!!'))
          .catch(erro => res.send('TOKEN NAO É VALIDO' +erro))
})


/* É realizado o logout quando o utilizador clica em logout ou altera algum parametro no token no Url ou na caixa de texto */
/* O token do utilizador é modificado para string vazia (query: "removeToken") e é feito logout */
router.get('/logout/:mail',(req,res) => {
  User.removeToken(req.params.mail)
    .then(dados => {
      console.log(dados)
      req.session.destroy
      req.logout()
      res.redirect('http://localhost:9000/')})
    .catch(erro => res.status(500).send('Erro na remoçao do token: ' + erro))
})



module.exports = router;
