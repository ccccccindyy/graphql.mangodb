const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsFeedSchema = new Schema({
    title: String,
    text: String
});

module.exports = mongoose.model('NewsFeed',NewsFeedSchema);