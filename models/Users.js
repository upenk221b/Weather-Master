const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema ({
    id : {type: String , required:true},
    name: {type: String , required:true},
    email: {type: String , required:true},
    team_id : {type: String , required:true},
    bot_token :{type: String , required:true},
    user_token: {type: String , required:true},
    default_city: {type: String},
    workspace_name :{type: String , required:true}

})

module.exports= User = mongoose.model('user', userSchema);