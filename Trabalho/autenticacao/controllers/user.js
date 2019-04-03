var User = require('../models/user')
const Users = module.exports


// Query para inserir um utilizador
Users.inserir = async u => {
    var user = new User({
        _id: u.username,
        password: u.password,
        email: u.email,
        token: ' '
    })
    return User.create(user)
}


//Query que atualiza o token de um utilizador que se autentica
Users.atualiza = async (user,token) =>{
    return User.findOneAndUpdate({_id:user.username},{$set:{token:token}},{new: true},(erro,doc)=>{
        if(!erro){
        }
        else{
            console.log('Não conseguiu atualizar o token do utilizador')
        }   
        
    })
}


//Query que remove o token de um utilizador
Users.removeToken = async (mail,token) =>{
    return User.findOneAndUpdate({email:mail},{$set:{token:''}},{new: true},(erro,doc)=>{
        if(!erro){
        }
        else{
            console.log('Não conseguiu remover o token do utilizador')
        }   
        
    })
}


//Query que verifica se o token existe
Users.comparaToken = async (token) =>{
    return User.findOne({token:token},{new: true},(erro,doc)=>{
        if(!erro){
        }
        else{
            console.log('Não encontrou o token')
        }      
    })
}

