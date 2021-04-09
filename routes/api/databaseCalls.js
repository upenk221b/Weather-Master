const express = require('express');
const router = express.Router();
const WeatherData = require('../../models/WeatherData');
const User = require('../../models/Users')
router.get('/reports',(req, res)=>{
    console.log("You will get the reports ..Wait.");
    WeatherData.find()
    .then(reports => res.json(reports));
})
router.get('/user',(req,res)=>{
    //need user id and team_id
    let id = req.query.user_id;
    let team_id = req.query.team_id;
    console.log(id ," adgagag", team_id)
    User.findOne({id , team_id})
    .then(user=> res.json(user));
})
module.exports = router;
