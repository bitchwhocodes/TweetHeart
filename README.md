TweetHeart
==========
TweetHeat is a heart shaped light created with Adafruit's NeoPixels that reacts to various events on the Twitter Streaming API. 
It has a few moving parts. 
1. Hardware : Laser cut box and acrylic to house NeoPixels organized in a heart shape. A SparkCore device is used to power the
lights, run the animations and capture input from an external source.
2. Software : A Node script that connects to the Twitter Streaming API and looks for certain events such as retweets, unfollows etc - 
and then uses the Spark node module to notify the Spark Core Device that it needs to change its animation based on the event identified. 

By default the heart will cycle through a few color gradient animations. If it's 'mode' is changed, it will do the appropriate animation including a 
heart beat, a heart drain ( sad face ) etc. 

Requirements:
SparkCore Device
NeoPixels
Node.js 
