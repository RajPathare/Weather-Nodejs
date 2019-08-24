const request = require('request');

const forecast = (latitude,longitude,callback) => {

    const url = 'https://api.darksky.net/forecast/ff08cdbb71f4ff699948f55ad6c934f6/'+latitude+','+longitude+'?units=si'
   // request({url: url, json: true},(error,response)=>{ --> shorthand syntax used below
                                        // instead of using response, we use body (response.body) so destructure it -->
    request({url, json: true},(error, { body }, tom = {})=>{

        if(error)
        {
            callback('Unable to connect to the weather API');
        }
        else if(body.error)
        {
            callback('Unable to find location!', undefined, undefined);
        }
        else
        {
            const tom = [
                body.daily.data[1].summary + " Lowest temperature: " + body.daily.data[1].temperatureLow + "°C Highest temperature: " + body.daily.data[1].temperatureHigh + "°C" ,
                body.daily.data[2].summary + " Lowest temperature: " + body.daily.data[2].temperatureLow + "°C Highest temperature: " + body.daily.data[2].temperatureHigh + "°C" ,
                body.daily.data[3].summary + " Lowest temperature: " + body.daily.data[3].temperatureLow + "°C Highest temperature: " + body.daily.data[3].temperatureHigh + "°C" ,
                body.daily.data[4].summary + " Lowest temperature: " + body.daily.data[4].temperatureLow + "°C Highest temperature: " + body.daily.data[4].temperatureHigh + "°C" ,
                body.daily.data[5].summary + " Lowest temperature: " + body.daily.data[5].temperatureLow + "°C Highest temperature: " + body.daily.data[5].temperatureHigh + "°C",
                body.daily.data[6].summary + " Lowest temperature: " + body.daily.data[6].temperatureLow + "°C Highest temperature: " + body.daily.data[6].temperatureHigh + "°C"
            ]
            //console.log(tom);
            callback(undefined,"Today - "+ body.daily.data[0].summary+" It is "+body.currently.temperature+"°C . The high today is "+ body.daily.data[0].temperatureHigh +"°C with a low of "+ body.daily.data[0].temperatureLow +"°C. The precipitation probability is "+body.currently.precipProbability,tom);
        }
    
    
    });
  
}

module.exports = forecast;
