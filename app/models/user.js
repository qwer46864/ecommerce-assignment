var mongoose = require('./db')

var userSchema = new mongoose.Schema(
    {
     firstname:String,
     lastname:String,
     email:String, 
     password:String    

    },
     {
            versionKey: false 
    });



userSchema.statics.findUser = function(email,password,callback){
    return this.find({'email':email,'password':password})
            .exec(callback)
}

userSchema.statics.findUserByEmail = function(email,callback){
    return this.find({'email':email})
            .exec(callback)
}

var User = mongoose.model('User', userSchema, 'userlist')

module.exports = User