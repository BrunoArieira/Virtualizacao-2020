var mongoose = require('mongoose')
var Schema = mongoose.Schema


//Cria a estrutura para cada utilizador
var UserSchema = new Schema (
    {
        _id: {type: String,required: true},
        password: {type: String, required: true},
        email: {type: String, required: true,unique: true},
        token: {type: String, required: true}
    }
)

//Verifica se uma password é válida conforme o utilizador
UserSchema.methods.isValidPassword = async function(password){
    var user = this
    var compare = false
        if(password == user.password) compare = true
        else compare = false;

    return compare
}




module.exports = mongoose.model('User',UserSchema,'users')