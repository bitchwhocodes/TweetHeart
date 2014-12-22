// This #include statement was automatically added by the Spark IDE.
#include "neopixel/neopixel.h"


#define GRADIENT_SIZE 6
#define HEART_BEAT_COUNT 10


// IMPORTANT: Set pixel COUNT, PIN and TYPE
#define PIXEL_COUNT 93
#define PIXEL_PIN D2
#define PIXEL_TYPE WS2812B


unsigned long interval=50;  // the time we need to wait
unsigned long previousMillis=0;

int setMode(String newMode);

uint32_t currentColor;// current Color in case we need it

uint16_t currentPixel = 0;// what pixel are we operating on
uint8_t count = 0; // loop or process counter
uint8_t heartBeatCounter =0; // used for heartbeat animation
uint8_t mode = 0; // mode determines what animation we are running
uint8_t growCount = 0; // to be used



// Parameter 1 = number of pixels in strip
// Parameter 2 = pin number (most are valid)
//               note: if not specified, D2 is selected for you.
// Parameter 3 = pixel type [ WS2812, WS2812B, WS2811, TM1803 ]
//               note: if not specified, WS2812B is selected for you.
//               note: RGB order is automatically applied to WS2811,
//                     WS2812/WS2812B/TM1803 is GRB order.
//
// 800 KHz bitstream 800 KHz bitstream (most NeoPixel products ...
//                         ... WS2812 (6-pin part)/WS2812B (4-pin part) )
//
// 400 KHz bitstream (classic 'v1' (not v2) FLORA pixels, WS2811 drivers)
//                   (Radio Shack Tri-Color LED Strip - TM1803 driver
//                    NOTE: RS Tri-Color LED's are grouped in sets of 3)

Adafruit_NeoPixel strip = Adafruit_NeoPixel(PIXEL_COUNT, PIXEL_PIN, PIXEL_TYPE);



uint32_t hotSequence[GRADIENT_SIZE] = {
strip.Color(255,0,0),
strip.Color(20,255,230),
strip.Color(255,199,0),
strip.Color(255, 48, 48),
strip.Color(255, 102, 0),
strip.Color(100,100,155)};
uint32_t restingSequence[GRADIENT_SIZE] = {
strip.Color(255,20,180),
strip.Color(255,0,0),
strip.Color(255,102,0),
strip.Color(32,178,170),
strip.Color(138,43,226),
strip.Color(0,255,255)};

uint32_t pink = strip.Color(217,2,208);
uint32_t red = strip.Color(255,0,0);

uint8_t outline[]={0,1,2,6,7,13,14,22,23,34,35,48,49,62,63,76,77,81,82,86,87,88,89,90,91,92};
uint8_t second_outline[]={3,5,8,12,15,21,24,33,36,47,50,61,64,69,70,75,78,80,83,85};


int setMode(String newMode){
   mode = newMode.toInt();
   
   return 1;
}

void setup() {
  Spark.function("setMode",setMode);
  
  currentColor = red;
  currentPixel = 0;
  // set red to the strip to start with
  strip.begin();

  uint8_t i;
  for(i=0;i<PIXEL_COUNT;i++) {
    strip.setPixelColor(i,currentColor);
  }
  strip.show(); // Initialize all pixels to 'off'
}


void loop(){
if ((unsigned long)(millis() - previousMillis) >= interval) {
  previousMillis = millis();

   switch(mode){
     case 0:
        restingWipe();
        break;
     case 1:
        heartDrain();
        break;
     case 2:
         heartBeat();
         break;
    case 3:
        growHeart();
        break;
   }
 }
}

// grows out pink - gradient
void growHeart(){
    interval = 200;
    uint8_t i;
    if(growCount<3){
    if(growCount == 0){
        for(i=0;i<PIXEL_COUNT;i++){
          strip.setPixelColor(i,pink);
        }
        
         for( i=0;i<20;i++){
          strip.setPixelColor(second_outline[i],red);  
        }
        
        for(i=0;i<26;i++){
          strip.setPixelColor(outline[i],red); 
        }
    }
    
    if(growCount == 1){

        for( i=0;i<20;i++){
          strip.setPixelColor(second_outline[i],pink);
        }
        
        for(i=0;i<26;i++){
          strip.setPixelColor(outline[i],red); 
        }
    }
    
    if(growCount == 2){
        for(i=0;i<26;i++){
          strip.setPixelColor(outline[i],pink); 
        }
        
        for( i=0;i<20;i++){
          strip.setPixelColor(second_outline[i],pink);
        }
    }
    growCount++;
    strip.show();
  }else{
   // mode = 0;
    growCount = 0;
  }
    
}


// This is good. Heart Drain
void heartDrain(){
  interval=30;
 
  strip.setPixelColor(PIXEL_COUNT-currentPixel,strip.Color(0,0,0));
  strip.show();
  currentPixel++;
  uint8_t i;
  if(currentPixel == PIXEL_COUNT){
    currentPixel = 0;
     for(i=0;i<PIXEL_COUNT;i++) {
      strip.setPixelColor(i,currentColor);
    }
    count++;
    if(count>6){
      
      mode = 0;
      count = 0;
     
    }
    //currentColor = restingSequence[count];
  }
}
  
// THIS IS GOOD
void heartBeat(){
   uint8_t i;
   if(count < HEART_BEAT_COUNT ) {
    if(heartBeatCounter<30){
    
    for(i=0;i<PIXEL_COUNT;i++) {
      currentColor = Wheel((60+heartBeatCounter+i) & 255);
      strip.setPixelColor(i,currentColor);
    }
    strip.show();
    heartBeatCounter++;
    
  }else{
    interval = 1;
    currentColor = strip.Color(255, 48, 48);
    
    if(currentPixel == PIXEL_COUNT){
      currentPixel = 0;
    }
    
   strip.setPixelColor(currentPixel,currentColor);
   strip.show();
   currentPixel++;
   if(currentPixel == PIXEL_COUNT){
     currentPixel = 0;
     heartBeatCounter = 0;
     interval = 50;
     count++;
   } 
  }
}else{
  interval = 50;
  mode = 0;
  count = 0;
 }
}


void restingWipe(){
  
  strip.setPixelColor(currentPixel,currentColor);
  strip.show();
  currentPixel++;
  
  if(currentPixel == PIXEL_COUNT){
    currentPixel = 0;
   
    if(count<GRADIENT_SIZE){
      count++;
    }else{
        count = 0;
    }
    
    currentColor = restingSequence[count];
   
  }
}

uint32_t Wheel(byte WheelPos) {
  if(WheelPos < 85) {
   return strip.Color(WheelPos * 3, 255 - WheelPos * 3, 0);
  } else if(WheelPos < 170) {
   WheelPos -= 85;
   return strip.Color(255 - WheelPos * 3, 0, WheelPos * 3);
  } else {
   WheelPos -= 170;
   return strip.Color(0, WheelPos * 3, 255 - WheelPos * 3);
  }
}



