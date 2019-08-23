const request = require('request');

const forecast = (latitude,longitude,callback) => {

    const url = 'https://api.darksky.net/forecast/ff08cdbb71f4ff699948f55ad6c934f6/'+latitude+','+longitude+'?units=si'
   // request({url: url, json: true},(error,response)=>{ --> shorthand syntax used below
                                        // instead of using response, we use body (response.body) so destructure it -->
    request({url, json: true},(error, { body })=>{

        if(error)
        {
            callback('Unable to connect to the weather API');
        }
        else if(body.error)
        {
            callback('Unable to find location!', undefined);
        }
        else
        {
            callback(undefined, body.daily.data[0].summary+" It is "+body.currently.temperature+"C and the precipitation probability is "+body.currently.precipProbability+"%");
        }
    
    
    });
  
}

module.exports = forecast;
