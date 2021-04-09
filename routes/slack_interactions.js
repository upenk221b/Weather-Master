const express = require('express');
const router = express.Router();
const Users = require('../models/Users')

router.post('/',async (req, res)=>{
    res.end();
    try {
        const payload = JSON.parse(req.body.payload);
        if(payload.type === "view_submission"){
            console.log("state ::::: ",payload.view.state.values.city.title.value)
            const city = payload.view.state.values.city.title.value;
            const user_info = payload.user;

            //get user from database
            let user = await Users.findOne({id: user_info.id , team_id : user_info.team_id });
            //set default city here
            user.default_city = city;
            user.save().then(console.log("SAVED the CITY!!!"));
        }
        
    } catch (error) {
        console.log(error)
    }
    
})




module.exports = router;
// payload: '{
//     "type":"view_submission",
//     "team":{"id":"T01PD6AG9AR","domain":"upendraglobal"},
//     "user":{"id":"U01Q63SCB9N","username":"upendra1999kadre","name":"upendra1999kadre","team_id":"T01PD6AG9AR"},
//     "api_app_id":"A01T42L5L5S",
//     "token":"XioLsNmB0c86pWpZYrZtGJ10",
//     "trigger_id":"1923516215650.1795214553365.be1bfbdcd36f77783676efc18b43c20b",
//     "view":{"id":"V01T5F5SNJE","team_id":"T01PD6AG9AR","type":"modal",
//     "blocks":[{"type":"input","block_id":"qup","label":{"type":"plain_text","text":"City","emoji":true},"optional":false,"dispatch_action":false,"element":{"type":"plain_text_input","action_id":"title","placeholder":{"type":"plain_text","text":"ex :Mumbai","emoji":true},"dispatch_action_config":{"trigger_actions_on":["on_enter_pressed"]}}}],
//     "private_metadata":"","callback_id":"",
    
    
//     //imp
//     "state":{"values":{"qup":{"title":{"type":"plain_text_input","value":"Pune"}}}},
//     //imp payload.view.state.values.qup.title.value = "pune" 
    
    
//     "hash":"1617364151.GeM41vof",
//     "title":{"type":"plain_text","text":"Change Default City","emoji":true},
//     "clear_on_close":false,"notify_on_close":false,"close":null,
//     "submit":{"type":"plain_text","text":"Submit","emoji":true},
//     "previous_view_id":null,"root_view_id":"V01T5F5SNJE","app_id":"A01T42L5L5S","external_id":"","app_installed_team_id":"T01PD6AG9AR","bot_id":"B01SXUJQK7C"},
    
    
    
//     "response_urls":[],"is_enterprise_install":false,"enterprise":null}
