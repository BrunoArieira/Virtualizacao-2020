var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');

router.post('/register', function(req,res,next){
  var user = new User({
    email: req.body.email,
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    creation_dt: Date.now()
});

  //Guarda o utilizado
  let promise = user.save();

  promise.then(function(doc){
    return res.status(201).json(doc);
  })

  promise.catch(function(err){
    return res.status(501).json({message: 'Erro ao registar utilizador.'})
  })
})

router.post('/login', function(req,res,next){
  let promise = User.findOne({username:req.body.username}).exec();

  promise.then(function(doc){
   if(doc) {
     if(doc.isValid(req.body.password)){
         // generate token
         let token = jwt.sign({username:doc.username},'secret', {expiresIn : '3h'});

         return res.status(200).json(token);

     } else {
       return res.status(501).json({message:'Credenciais Inválidas'});
     }
   }
   else {
     return res.status(501).json({message:'User não está registado.'})
   }
  });
});



router.get('/username', verifyToken, function(req,res,next){
  return res.status(200).json(decodedToken.username);
})

var decodedToken='';
function verifyToken(req,res,next){
  let token = req.query.token;

  jwt.verify(token,'secret', function(err, tokendata){
    if(err){
      return res.status(400).json({message:'Pedido não autorizado'});
    }
    if(tokendata){
      decodedToken = tokendata;
      next();
    }
  })
}

module.exports = router;
