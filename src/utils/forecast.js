const request = require('request')

const forecast = (address, callback) => {
    //const url = 'http://api.weatherstack.com/current?access_key=1e1b6b8db8911f3f80b28c606d0335a8&query='+17.3850+','+78.4867
    const url = 'http://api.weatherstack.com/current?access_key=1e1b6b8db8911f3f80b28c606d0335a8&query=' + address
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Cannot connect to weather service', undefined);
        } else if (response.body.current) {
            callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' out there');
        } else {
            callback('Cannot fetch weather for given location!!', undefined);
        } 
    })
}

module.exports = forecast
