const twit = require('twit');
const config = require('./config.js');
const bot = new twit(config);
const queries = require('./addons/searchQueries.json')
const facts = require('./addons/facts.json')
const followBotModule = require('node-twitter-bot');
const followBot = new followBotModule({
    consumerKey : config.consumer_key,
    consumerSecret : config.consumer_secret,
    accessToken : config.access_token,
    accessTokenSecret : config.access_token_secret
});

var randomProperty = function (obj) {
    let keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};

var tweetThis = function(message){
    bot.post('statuses/update', { status: message }, function(err, data) {
        console.log(data)
    })
}



var retweet = function() {

    bot.get('search/tweets', queries.params, function(err, data) {
        // if there no errors
        if (!err) {
            // grab ID of tweet to retweet
            var retweetId = data.statuses[0].id_str;
            // Tell TWITTER to retweet
            bot.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if (response) {
                    console.log('Retweeted!!!');
                }
                // if there was an error while tweeting
                if (err) {
                    console.log('Something went wrong while RETWEETING... Duplication maybe...');
                }
            });
        }
        // if unable to Search a tweet
        else {
            console.log('Something went wrong while SEARCHING...');
        }
    });
}

//follow worm
var followWorm = function () {
    var phrase = "#VapeNation";
    var options = {
        result_type: 'recent',
        count: 1,
    }
    followBot.followByTweets(phrase,options)
}


//function to tweet a random tweet from facts.json
var  randTweet = function () {
    //message content selected using rng from a JSON
    var tweetBody = randomProperty(facts);
    //post content to twitter API
    tweetThis(tweetBody)

}



followWorm();
setInterval(followWorm,3000000);
// grab & retweet as soon as program is running...
retweet();
//retweet at an interval
setInterval(retweet, 300000);

//Start with random tweet
randTweet();
// tweet another random tweet at an interval
setInterval(randTweet,30000000);