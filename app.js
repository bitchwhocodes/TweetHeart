var http = require("http");
var Twit = require('twit')
var Spark = require("spark");
var dotenv = require('dotenv');
dotenv.load();


Spark.login({ username: process.env.USER_NAME, password: process.env.PASS_WORD }, function(err, body) {
      console.log('API call login completed on callback:', body);
      console.log(process.env.USER_NAME);
      console.log(process.env.SPARK_ID);
         Spark.callFunction(process.env.SPARK_ID,'setMode','2',function(err,data){
    console.log("spark setmode");
    console.log(err);
    console.log(data);

  });
  });

  
//var server = http.createServer(function(request, response) {
 var T = new Twit({
    consumer_key:         'i0NubUf7qsAWxB9HyDHGtiiGx'
  , consumer_secret:      'Bse9W8QUcrcJnPjYFxJGhoWdr2U548s00leL67CttEoZpY6xiF'
  , access_token:         '1325411-MsJvEsENFabz36hTwbqH69fwlC96eKcSJqTnvKLwuC'
  , access_token_secret:  'le17c2cAXbND3aUNkWBrtYfDcQatLrBM21WJx1BTkmiVc'
})
 console.log(T);
var stream = T.stream('user')
stream.on('connect',function(){
  console.log("connected");
})

stream.on('disconnect',function(){
  console.log('disconnected');
})
stream.on('favorite', function (tweet) {
  console.log("SOMTHING HAS BEEN FAVORITED",tweet);
  Spark.callFunction(process.env.SPARK_ID,'setMode','3',function(err,data){
    console.log("has been completed");

  });

})

stream.on('follow', function (tweet) {
  console.log('HAS BEEN FOLLOWED',tweet)
  if(tweet['target']['screen_name'] == "bitchwhocodes"){
    console.log("I HAVE BEEN FOLLOWED");
    Spark.callFunction(process.env.SPARK_ID,'setMode','4',function(err,data){
    console.log("favorited to tjhe spark");

  });
  }
})

stream.on('unfollow', function (tweet) {
  console.log('HAS BEEN FOLLOWED',tweet)
  if(tweet['target']['screen_name'] == "bitchwhocodes"){
    console.log("I HAVE BEEN FOLLOWED");
    Spark.callFunction(process.env.SPARK_ID,'setMode','5',function(err,data){
    console.log("favorited to tjhe spark");

  });
  }
})

stream.on('list_member_added', function (tweet) {
  console.log('HAS BEEN ADDED TO LIST',tweet)
  Spark.callFunction(process.env.SPARK_ID,'setMode','6',function(err,data){
   console.log('added to a list');

  });
})


stream.on('tweet', function (tweet) {

     Spark.callFunction(process.env.SPARK_ID,'setMode','6',function(err,data){
    console.log("spark tweet");
   
    console.log(data);

  });
  if(tweet['retweeted_status']!=null)
  {
    console.log('RETWEET',tweet);
    Spark.callFunction(process.env.SPARK_ID,'setMode','7',function(err,data){
    console.log("spark retweet");

  });
  }
  
  
})

//});
 
//server.listen(3000);








