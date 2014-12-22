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
  
})

stream.on('disconnect',function(){
  
})
stream.on('favorite', function (tweet) {
  
  Spark.callFunction(process.env.SPARK_ID,'setMode','3',function(err,data){
    

  });

})

stream.on('follow', function (tweet) {
  console.log('HAS BEEN FOLLOWED',tweet)
  if(tweet['target']['screen_name'] == "bitchwhocodes"){
    
    Spark.callFunction(process.env.SPARK_ID,'setMode','4',function(err,data){
    

  });
  }
})

stream.on('unfollow', function (tweet) {
  console.log('HAS BEEN FOLLOWED',tweet)
  if(tweet['target']['screen_name'] == "bitchwhocodes"){
    
    Spark.callFunction(process.env.SPARK_ID,'setMode','5',function(err,data){
    

  });
  }
})

stream.on('list_member_added', function (tweet) {
  
  Spark.callFunction(process.env.SPARK_ID,'setMode','6',function(err,data){
   

  });
})


stream.on('tweet', function (tweet) {

     Spark.callFunction(process.env.SPARK_ID,'setMode','6',function(err,data){

  });
  if(tweet['retweeted_status']!=null)
  {
    
    Spark.callFunction(process.env.SPARK_ID,'setMode','7',function(err,data){
    

  });
  }
  
  
})

//});
 
//server.listen(3000);








