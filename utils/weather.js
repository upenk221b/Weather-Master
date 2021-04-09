const SlackApiCall = require('../services/slack_api_calls');
const Weather = require('../models/WeatherData')
const https = require('https');
const request = require("request");

const getWeather = (city,channel,user,res_url)=>{
    const options = {
        hostname: 'api.openweathermap.org',
        port: 443,
        path: `/data/2.5/weather?q=${city}&units=metric&appid=1c88928bd887b683e4d3066758caac4d`,
        method: 'GET',
        Accept: 'application/json'
      };

        https.get(options,(res)=>{
            res.on('data', d => {

                data = JSON.parse(d);
                if(data && data.main){
                    temp = data.main.temp;
                max_temp = data.main.temp_max;
                min_temp = data.main.temp_min;
                humidity = data.main.humidity;
                pressure = data.main.pressure;

                main = data.weather.main || '';
                const message = `Main weather report for ${city}: ${main}\ncurrently pressure ${pressure} hPa, ${humidity} % humid , Temp ${max_temp}\u2103  \u2191 ${min_temp} \u2103 \u2193`; 
                //save to the database 
                const newItem = new Weather({
                    city,
                    max_temp,
                    min_temp,
                    humidity,
                    pressure,
                    created_by : user.id
                });
                newItem.save();
                //send msg using response url doesn't need channel
                console.log("Before the shit!!")
                if(res_url){
                    const replyObj= {
                        text : message
                    }
                    console.log("hostname :", res_url);
                    SlackApiCall.webhookReply(replyObj,res_url);
                    
                }else{
                    //send message to slack using channel
                    const replyObj= {
                        channel,
                        text : message
                    }
                    SlackApiCall.sendMessage(replyObj,user);
                }
                

                }
                
            })

        });
}
exports.getWeather=getWeather;