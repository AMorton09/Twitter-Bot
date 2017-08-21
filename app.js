const twit = require("twit");
const config = require('./config.js');
const bot = new twit(config);
const facts = require('./addons/facts.json')

var randomProperty = function (obj) {
    let keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};

var retweet = function() {
    var params = {
        q: '#VapeNation',
        result_type: 'recent',
        lang: 'en'
    }
    bot.get('search/tweets', params, function(err, data) {
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


var  randTweet = function () {
    var tweetBody = randomProperty(facts)
    bot.post('statuses/update', { status: tweetBody }, function(err, data, response) {
        console.log(data)
    })

}





// grab & retweet as soon as program is running...
retweet();
// retweet in every 50 minutes
setInterval(retweet, 300000);

randTweet();
setInterval(randTweet,300000);