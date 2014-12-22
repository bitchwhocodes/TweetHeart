var http = require("http");
var Twit = require('twit')
var Spark = require("spark");
var dotenv = require('dotenv');
dotenv.load();


Spark.login({ username: process.env.USER_NAME, password: process.env.PASS_WORD }, function(err, body) {
      //to handle 
  });

  
//var server = http.createServer(function(request, response) {
 var T = new Twit({
    consumer_key:         process.env.CONSUMER_KEY
  , consumer_secret:      process.env.CONSUMER_SECRET
  , access_token:         process.env.ACCESS_TOKEN
  , access_token_secret:  process.env.ACCESS_TOKEN_SECRET
})

var stream = T.stream('user')
stream.on('connect',function(){
  console.log("connected");
})

stream.on('disconnect',function(){
  console.log("disconnected");
})
stream.on('favorite', function (tweet) {
  Spark.callFunction(process.env.SPARK_ID,'setMode','3',function(err,data){
    console.log("favorite called?");
  });

})

stream.on('follow', function (tweet) {
  console.log('HAS BEEN FOLLOWED',tweet)
  if(tweet['target']['screen_name'] == "bitchwhocodes"){
    Spark.callFunction(process.env.SPARK_ID,'setMode','4',function(err,data){
      console.log("followed");
  });
  }
})

stream.on('unfollow', function (tweet) {
 
  if(tweet['target']['screen_name'] == "bitchwhocodes"){
    Spark.callFunction(process.env.SPARK_ID,'setMode','5',function(err,data){
      console.log("unfollowed");
  });
  }
})

stream.on('list_member_added', function (tweet) {
  Spark.callFunction(process.env.SPARK_ID,'setMode','6',function(err,data){
    console.log("added to a list");
  });
})


stream.on('tweet', function (tweet) {

  if(tweet['retweeted_status']!=null){
    Spark.callFunction(process.env.SPARK_ID,'setMode','7',function(err,data){
  });
  }
})









