const express = require('express');
const router = express.Router();
const {getWeather} = require('../utils/weather');
const Users = require('../models/Users');
const SlackApiCall = require('../services/slack_api_calls');


router.post('/',async (req, res)=>{

   try {
      res.end();

      let {channel_id , text, user_id , team_id , trigger_id , response_url} = req.body

      let user = await Users.findOne({id: user_id , team_id });

      text = text.trim();
      if(text===""){
         // const default_city = //get default city with user_id
         try {
            if(user.default_city){
               getWeather(user.default_city,channel_id,user,response_url);
            }else{
               //Send message saying add default city 
               const replyObj = {
                  "attachments" : [{"pretext": "*Add Default City First*",
             "text": "Use _/w configure_ to set default city for weather\nUse _/w_ to get weather report of default city\n Use _/w <city>_ for any other city"}] ,
            

            "blocks" : [
                        {
                           "type": "divider"
                        },
                        {
                           "type": "actions",
                           "elements": [
                                 {
                                    "type": "button",
                                    "text": {
                                       "type": "plain_text",
                                       "text": "Reports",
                                       "emoji": true
                                    },
                                    "value": "click_me_123",
                                    "url": "https://desolate-bayou-39962.herokuapp.com",
                                    "action_id": "goto-web"
                                 }
                           ]
                        }
                     ]

}
               SlackApiCall.webhookReply(replyObj,response_url);

            }
            
         } catch (error) {
            console.log(error)
            // SlackApiCall.sendMessage({channel_id, text:"Set default city fist with /w configure"},user);
         }
      }else if(text==="configure"){
         //open modal to change default city
         const data ={
            trigger_id,
            token:user.bot_token,
            view : {
               "title": {
                  "type": "plain_text",
                  "text": "Change Default City"
               },
               "submit": {
                  "type": "plain_text",
                  "text": "Submit"
               },
               "blocks": [
                  {
                     "type": "input",
                     "block_id": "city",
                     "label": {
                        "type": "plain_text",
                        "text": "City"
                     },
                     "element": {
                        "type": "plain_text_input",
                        "action_id": "title",
                        "placeholder": {
                           "type": "plain_text",
                           "text": "ex :Mumbai"
                        }
                     }
                     
                  }
               ],
               "type": "modal"
            }
         }
         SlackApiCall.openmodal(data);
         
      }else{
         getWeather(text,channel_id,user,response_url)
      }
   } catch (error) {
      console.log(error);
   }
  
   
});


module.exports = router;

// {
//     2021-03-31T17:21:57.660739+00:00 app[web.1]: token: 'XioLsNmB0c86pWpZYrZtGJ10',
//     2021-03-31T17:21:57.660740+00:00 app[web.1]: team_id: 'T01PD6AG9AR',
//     2021-03-31T17:21:57.660740+00:00 app[web.1]: team_domain: 'upendraglobal',
//     2021-03-31T17:21:57.660740+00:00 app[web.1]: channel_id: 'C01PGEVA7CK',
//     2021-03-31T17:21:57.660741+00:00 app[web.1]: channel_name: 'random',
//     2021-03-31T17:21:57.660741+00:00 app[web.1]: user_id: 'U01Q63SCB9N',
//     2021-03-31T17:21:57.660741+00:00 app[web.1]: user_name: 'upendra1999kadre',
//     2021-03-31T17:21:57.660742+00:00 app[web.1]: command: '/w',
//     2021-03-31T17:21:57.660742+00:00 app[web.1]: text: '',
//     2021-03-31T17:21:57.660743+00:00 app[web.1]: api_app_id: 'A01T42L5L5S',
//     2021-03-31T17:21:57.660743+00:00 app[web.1]: is_enterprise_install: 'false',
//     2021-03-31T17:21:57.660744+00:00 app[web.1]: response_url: 'https://hooks.slack.com/commands/T01PD6AG9AR/1941006340368/8gUsKnekOlxZALGnGI56tiZS',  
//     2021-03-31T17:21:57.660748+00:00 app[web.1]: trigger_id: '1910425837574.1795214553365.f104d2c012deaac7bd36a744a7d2a157'
//     2021-03-31T17:21:57.660748+00:00 app[web.1]: }


// modal blocks
