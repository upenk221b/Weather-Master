const express = require('express');
const router = express.Router();
const SlackApiCall = require('../services/slack_api_calls');
const EventEmmiter = require('events');
const {getWeather} = require('../utils/weather');
const Users = require('../models/Users');
//get Event emmiter for handling events
const emitter = new EventEmmiter();

//Main event subscription payload comes here
router.post('/',async (req, res)=>{
    //handle url verification
    if(req.body.challenge){
        return res.json({challenge : req.body.challenge});
    }

    //handle events which are subscribed.
    //get the user first and pass on
    try {
        let user = await Users.findOne({id: req.body.event.user , team_id: req.body.event.team });

        const data ={
            event : req.body.event,
            user
        }
        switch(req.body.event.type){
            case 'message':
                emitter.emit('message',(data));
                break;
            default :
                console.log("Don't care this !!")
        }
    } catch (error) {
        console.log(error);
    }
    
    res.end();
});

emitter.on('message',(data)=>{
    const {event, user} = data;
    const {channel, text} = event;
    if(/weather in/.test(text)){
        arr = text.split("weather in");
        city = arr[1];
        city = city.trim();

        getWeather(city,channel,user);
    }
    
});

module.exports = router;

// REQ.BODY {
//     2021-03-31T15:02:42.494122+00:00 app[web.1]: token: 'XioLsNmB0c86pWpZYrZtGJ10',
//     2021-03-31T15:02:42.494124+00:00 app[web.1]: team_id: 'T01PD6AG9AR',
//     2021-03-31T15:02:42.494124+00:00 app[web.1]: api_app_id: 'A01T42L5L5S',
//     2021-03-31T15:02:42.494125+00:00 app[web.1]: event: {
//     2021-03-31T15:02:42.494126+00:00 app[web.1]: client_msg_id: 'd05159be-8368-4822-96d0-cbdf1c8d3ba3',
//     2021-03-31T15:02:42.494127+00:00 app[web.1]: type: 'message',
//     2021-03-31T15:02:42.494127+00:00 app[web.1]: text: 'heyy',
//     2021-03-31T15:02:42.494127+00:00 app[web.1]: user: 'U01Q63SCB9N',
//     2021-03-31T15:02:42.494128+00:00 app[web.1]: ts: '1617202961.001100',
//     2021-03-31T15:02:42.494128+00:00 app[web.1]: team: 'T01PD6AG9AR',
//     2021-03-31T15:02:42.494129+00:00 app[web.1]: blocks: [ [Object] ],
//     2021-03-31T15:02:42.494129+00:00 app[web.1]: channel: 'C01PGF2LE4B',
//     2021-03-31T15:02:42.494129+00:00 app[web.1]: event_ts: '1617202961.001100',
//     2021-03-31T15:02:42.494130+00:00 app[web.1]: channel_type: 'channel'
//     2021-03-31T15:02:42.494130+00:00 app[web.1]: },
//     2021-03-31T15:02:42.494131+00:00 app[web.1]: type: 'event_callback',
//     2021-03-31T15:02:42.494131+00:00 app[web.1]: event_id: 'Ev01SYGVMLAE',
//     2021-03-31T15:02:42.494132+00:00 app[web.1]: event_time: 1617202961,
//     2021-03-31T15:02:42.494132+00:00 app[web.1]: authorizations: [
//     2021-03-31T15:02:42.494132+00:00 app[web.1]: {
//     2021-03-31T15:02:42.494133+00:00 app[web.1]: enterprise_id: null,
//     2021-03-31T15:02:42.494133+00:00 app[web.1]: team_id: 'T01PD6AG9AR',
//     2021-03-31T15:02:42.494133+00:00 app[web.1]: user_id: 'U01TMNP3HEU',
//     2021-03-31T15:02:42.494134+00:00 app[web.1]: is_bot: true,
//     2021-03-31T15:02:42.494134+00:00 app[web.1]: is_enterprise_install: false
//     2021-03-31T15:02:42.494135+00:00 app[web.1]: }
//     2021-03-31T15:02:42.494135+00:00 app[web.1]: ],
//     2021-03-31T15:02:42.494135+00:00 app[web.1]: is_ext_shared_channel: false,
//     2021-03-31T15:02:42.494136+00:00 app[web.1]: event_context: '1-message-T01PD6AG9AR-C01PGF2LE4B'
//     2021-03-31T15:02:42.494136+00:00 app[web.1]: }