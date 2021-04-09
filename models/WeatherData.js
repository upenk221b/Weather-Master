const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const weatherSchema = new Schema ({
    city: {type: String , required:true},
    max_temp : {type: String , required:true},
    min_temp: {type: String , required:true},
    pressure: {type: String , required:true},
    humidity : {type: String , required:true},
    date : {type : Date, default: Date.now()},
    created_by : {type: String , required:true}
})

module.exports= Weather = mongoose.model('weather', weatherSchema);