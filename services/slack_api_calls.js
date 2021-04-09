const { WebClient } = require("@slack/web-api");
const request = require("request");

const sendMessage = async (replyObj,user)=>{

    const client = new WebClient(user.bot_token);
    try{
       await client.chat.postMessage(replyObj);

    }catch(e){
        console.log(e);
    }
}
exports.sendMessage = sendMessage; 

const getToken = (code)=>{
    let  ouathUrl="https://slack.com/api/oauth.v2.access"
    const {client_id , client_secret } = require('../config/keys');
    var options = {
      uri:
      ouathUrl + "?code=" +
        code +
        "&client_id=" +
        client_id +
        "&client_secret=" +
        client_secret ,
      method: "GET"
    };

    return new Promise(function(resolve, reject) {
        request(options, (error, response, body) => {
          if (error) {
            reject(err);
          } else {
            var token_obj = JSON.parse(body);
            if (token_obj.ok) {
              resolve(token_obj);
            } else {
              console.error(token_obj);
              reject(token_obj);
            }
          }
        });
      });

}
exports.getToken = getToken;

const getUserinfo = async (token)=>{
    const client = new WebClient(token);
    try{
       return await client.users.identity({token});
 
     }catch(e){
         console.log(e);
     }
}
exports.getUserinfo = getUserinfo;

const openmodal = async (data)=>{
    const client = new WebClient(data.token);
    try{
       return await client.views.open(data);
     }catch(e){
         console.log(e);
     }
}
exports.openmodal = openmodal;

const uninstallApp = async (data)=>{//recquires bot_token , client_id and secret
  const client = new WebClient(data.token);
  try{
     return await client.apps.uninstall(data)
   }catch(e){
       console.log(e);
   }
}
exports.uninstallApp = uninstallApp;

const openConversation = async (data)=>{//recquires bot_token , client_id and secret
  const client = new WebClient(data.token);
  try{
     return await client.conversations.open(data)
   }catch(e){
       console.log(e);
   }
}
exports.openConversation = openConversation;

const sendephemeral = async (replyObj , user)=>{//recquires bot_token , client_id and secret
  const client = new WebClient(user.bot_token);
  try{
    await client.chat.postEphemeral(replyObj);
   }catch(e){
       console.log(e);
   }
}
exports.sendephemeral = sendephemeral;

const webhookReply = async (replyObj , res_url)=>{//recquires bot_token , client_id and secret
  var options = {
    'method': 'POST',
    'url': res_url,
    'headers': {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(replyObj)
  
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
}
exports.webhookReply = webhookReply;