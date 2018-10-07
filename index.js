
const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const schema = require('./app/example');
const mongoose = require('mongoose');
const NewsFeed = require('./models/NewsFeed');

mongoose.connect('mongodb://cindy:Password1@ds243812.mlab.com:43812/mangodb1');

mongoose.connection.once('open', () => {
    console.log('connected to database');
});

const init = async() => {

    app.use('/example',graphqlHTTP({
        schema,
        graphiql:true
    }));

    app.get('/', function (req, res) {
        res.send("<h1>My first api</h1>")
    });

    app.get('/api/v1/news', function (req, res) {
        res.jsonp(
          NewsFeed.find()
        );
    });

    app.post('/api/v1/news', function (req, res) {
        const {title,text} = req.payload;
        const newsFeed = new NewsFeed({
            //date:new Date(),
            title,
            text
        });
        return newsFeed.save();
    });

    await app.listen(4000);

    console.log('Listening...');
};

init();

