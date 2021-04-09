const express = require('express');
const mongoose = require('mongoose');
const SlackApiCall = require('./services/slack_api_calls')
const Oauth = require('./routes/OAuth');
//instantiate express
const app = express();
const path = require('path');
//use middlewares to parse jason
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/slack/events', require('./routes/events'));
app.use('/slack/command',require('./routes/commands'));
app.use('/slack/oauth',Oauth.addUserToSlack);
app.use('/slack/uninstall',Oauth.uninstall);
app.use('/slack/interactions',require('./routes/slack_interactions'));
app.use('/api/database',require('./routes/api/databaseCalls'))

//connect to mongoDb
const db = require('./config/keys').mongoURI;

mongoose
    .connect(db)
    .then(()=>console.log("Succesfully connected to MongoDB"))
    .catch((err)=> console.log(err));


//Serve Static Assets when in production

// "heroku-postbuild" : "NPM_CONFIG_PRODUCTION=false npm install --prefix webapp && npm run build --prefix webapp"

if(process.env.NODE_ENV === 'production'){
    //set Static folder
    app.use(express.static('webapp/build'));

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'webapp','build' , 'index.html'));
    });
}
//connect to the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server started on ${PORT}`));
